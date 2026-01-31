# 第25章：APIレスポンス契約（Problem Detailsで返す）🧾🌐✨

この章では、「サーバ側で正規化したエラー（Domain / Infra / Bug）」を **クライアントが機械的に扱える“失敗の共通フォーマット”** に落とします😊
その定番が **Problem Details**（RFC 9457）です📜✨（RFC 7807の後継だよ！）([IETF Datatracker][1])

---

## 1) Problem Detailsってなに？なんで嬉しいの？🤝🎯

### ✅ 目的

APIが失敗したとき、毎回バラバラなJSON（`{ message: "..." }` とか）を返すと…

* クライアントが分岐地獄になる😵‍💫
* 文言変更で壊れる（人間向けメッセージは不安定）💥
* どの失敗が「入力ミス」なのか「通信事故」なのか判別しづらい🌀

そこで **「失敗の形」を標準化** するのが Problem Details🧾✨
JSONとして返すときのContent-Typeは **`application/problem+json`** が標準だよ📮([RFCエディタ][2])

---

## 2) Problem Detailsの“基本5点セット”🧾🖐️

![エラーダッシュボード：問題を構造化して表示[(./picture/err_model_ts_study_025_error_dashboard.png)

Problem Detailsは「JSONオブジェクト」で、代表的なメンバーがこの5つ👇([IETF Datatracker][1])

* **type**: 問題タイプを識別するURI（これが“種類ID”の本体）

  * 省略すると **`about:blank`** 扱いになるよ([IETF Datatracker][1])
  * クライアントは **typeを主要識別子として使う** のが推奨！([IETF Datatracker][1])
* **title**: 人間が読む短い概要（例：`Invalid input`）
* **status**: HTTPステータスコード（例：400, 404, 503…）
* **detail**: 人間向けの具体説明（ただし“デバッグ情報”は避ける）

  * そして超重要👉 **detailを解析して分岐しない**（機械分岐は拡張フィールドで！）([IETF Datatracker][1])
* **instance**: その問題の発生箇所（個別IDっぽいURI、ログ追跡に便利）([IETF Datatracker][1])

---

## 3) まず決めるのは「type（問題タイプURI）」🏷️🔗

### 🎯 コツ：typeは“安定した契約”にする

* 例：`https://api.example.com/problems/validation-error`
* 例：`https://api.example.com/problems/out-of-stock`

そして **typeのURIに、人間が読める説明ページ** を置けると最高✨
（運用チームもクライアント開発も助かる〜！）

> なお type がない場合は `about:blank`（≒“一般的なHTTPエラー”）として扱われます([IETF Datatracker][1])

---

## 4) 「拡張フィールド」を設計しよう🧩✨（ここが実戦！）

Problem Detailsは **自由にメンバーを足してOK**（拡張）です💪
そしてクライアントは **知らない拡張が来ても無視できる** 設計が前提だよ😊([RFCエディタ][3])

### よく使う拡張（おすすめ）🌟

* **code**: アプリ内の安定ID（例：`BUDGET_EXCEEDED`）
  → クライアント分岐は基本これで👌
* **errors**: バリデーションの詳細（配列 or `{ field: [msg...] }`）
  → フォームの項目別エラーに直結📝
* **requestId / traceId**: ログ追跡用🧵🔎（第28章にもつながる！）
* **retryable**: リトライして良い？🔁（インフラ系に便利）

### ⚠️ detailに“内部事情”を入れすぎない

RFC 9457では、detailは「クライアントが直せるように」が主眼で、デバッグ情報の出しすぎは避ける方針だよ🧯([IETF Datatracker][1])
（内部例外メッセージ・SQL・秘密情報はログへ🙈）

---

## 5) ステータス割り当ての“ざっくり地図”🗺️🚦

あなたの分類（Domain / Infra / Bug）に合わせて、まずはこの感覚でOK😊

### ✅ Domain（想定内の失敗）

* **400**: 形式が変（JSON壊れてる・必須欠落）
* **422**: 入力はJSONとして正しいけど業務的にNG（値の妥当性）
* **404**: 対象がない
* **409**: 競合（在庫競合・楽観ロック・二重登録）
* **401/403**: 認証/権限
* **429**: レート制限

### 🌩️ Infra（外部/通信/一時障害）

* **503**: 依存サービス落ち・メンテ・混雑
* **504**: タイムアウト
* **502**: ゲートウェイ/プロキシが変な応答

### 💥 Bug（不変条件違反・想定外）

* **500**: 原則ここ（中身は出しすぎない）

---

## 6) TypeScriptでの型（契約）を作る🎁🧠

### Problem Details型（基本＋拡張）✍️

```ts
export type ProblemDetails = {
  type?: string;      // URI
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;

  // --- extensions ---
  code?: string;                      // 安定ID（推奨）
  requestId?: string;                 // 追跡用
  errors?: Record<string, string[]>;  // フォーム項目別など
  retryable?: boolean;                // リトライ可否
};
```

### 内部エラー（例：正規化済みAppError）🧼

```ts
type DomainError =
  | { kind: "Domain"; code: "OUT_OF_STOCK"; itemId: string }
  | { kind: "Domain"; code: "BUDGET_EXCEEDED"; limit: number };

type InfraError =
  | { kind: "Infra"; code: "PAYMENT_TIMEOUT" }
  | { kind: "Infra"; code: "UPSTREAM_UNAVAILABLE" };

type BugError =
  | { kind: "Bug"; code: "INVARIANT_BROKEN" };

export type AppError = DomainError | InfraError | BugError;
```

---

## 7) Error/Result → Problem Details 変換（対応表の“実装版”）🧾➡️🧾

ここがこの章のキモだよ〜！💖
**「内部分類」と「HTTP契約」を接続**します🔌✨

```ts
const PROBLEM_BASE = "https://api.example.com/problems";

function toProblemDetails(err: AppError, ctx: { requestId: string; instance: string }): ProblemDetails {
  switch (err.kind) {
    case "Domain":
      switch (err.code) {
        case "OUT_OF_STOCK":
          return {
            type: `${PROBLEM_BASE}/out-of-stock`,
            title: "Out of stock",
            status: 409,
            detail: "在庫が足りません。数量を減らして再試行してください。",
            instance: ctx.instance,
            code: err.code,
            requestId: ctx.requestId,
          };
        case "BUDGET_EXCEEDED":
          return {
            type: `${PROBLEM_BASE}/budget-exceeded`,
            title: "Budget exceeded",
            status: 422,
            detail: `予算上限（${err.limit}）を超えています。`,
            instance: ctx.instance,
            code: err.code,
            requestId: ctx.requestId,
          };
      }

    case "Infra":
      switch (err.code) {
        case "PAYMENT_TIMEOUT":
          return {
            type: `${PROBLEM_BASE}/payment-timeout`,
            title: "Payment timeout",
            status: 504,
            detail: "決済サービスの応答が遅れています。時間をおいて再試行してください。",
            instance: ctx.instance,
            code: err.code,
            requestId: ctx.requestId,
            retryable: true,
          };
        case "UPSTREAM_UNAVAILABLE":
          return {
            type: `${PROBLEM_BASE}/upstream-unavailable`,
            title: "Service unavailable",
            status: 503,
            detail: "外部サービスが利用できません。しばらくしてからお試しください。",
            instance: ctx.instance,
            code: err.code,
            requestId: ctx.requestId,
            retryable: true,
          };
      }

    case "Bug":
      return {
        type: "about:blank",
        title: "Internal Server Error",
        status: 500,
        detail: "サーバ側で問題が発生しました。時間をおいて再試行してください。",
        instance: ctx.instance,
        code: err.code,
        requestId: ctx.requestId,
      };
  }
}
```

### ✅ ここでの設計ポイント

* 機械分岐は **code / type** に寄せる（detail解析は禁止）([IETF Datatracker][1])
* `application/problem+json` を返す（契約！）([IANA][4])
* typeはURIで“種類”を識別（クライアントはtypeを主IDとして扱う）([IETF Datatracker][1])

---

## 8) サーバ実装（ルート最終catch → Problem Details）🧱🚪

Express風に「最後にここで統一」する例だよ👇
（第24章の“例外境界”の実装イメージ！）

```ts
import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export function problemDetailsMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const requestId = req.header("x-request-id") ?? randomUUID();
  const instance = `/requests/${requestId}`;

  const appErr: AppError = normalizeUnknownToAppError(err); // 第15章の正規化を想定
  const pd = toProblemDetails(appErr, { requestId, instance });

  res.setHeader("Content-Type", "application/problem+json");
  res.setHeader("x-request-id", requestId);

  res.status(pd.status ?? 500).json(pd);
}
```

---

## 9) クライアント側：Problem Detailsを“安全に”読む🧁📱

`fetch` のラッパで「失敗はProblemDetailsとして返す」形にするとスッキリ✨

```ts
export type ApiResult<T> =
  | { ok: true; value: T }
  | { ok: false; problem: ProblemDetails };

export async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<ApiResult<T>> {
  const res = await fetch(input, init);

  if (res.ok) {
    return { ok: true, value: await res.json() as T };
  }

  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("application/problem+json")) {
    const problem = await res.json() as ProblemDetails;
    return { ok: false, problem };
  }

  // それ以外は “不明な失敗” として丸める（保険）🛡️
  return {
    ok: false,
    problem: {
      type: "about:blank",
      title: "Unexpected error format",
      status: res.status,
      detail: "エラー形式が想定外でした。",
    },
  };
}
```

---

## 10) OpenAPIにも載せよう（契約が“見える化”）📘✨

OpenAPI 3.0+ なら `application/problem+json` のレスポンスを定義できるよ🧾
ProblemDetailsスキーマ例もよく紹介されています([Qiita][5])

```yaml
components:
  schemas:
    ProblemDetails:
      type: object
      properties:
        type: { type: string, format: uri }
        title: { type: string }
        status: { type: integer }
        detail: { type: string }
        instance: { type: string, format: uri }
        code: { type: string }
        requestId: { type: string }
        errors:
          type: object
          additionalProperties:
            type: array
            items: { type: string }
```

---

## 11) ミニ演習📝：Error/Result → ProblemDetails 対応表を作る📋✨

### 🎯 お題

第16章のエラーカタログから **10件選んで**、こう変換してみてね👇

1. エラーcode（内部）
2. 分類（Domain/Infra/Bug）
3. HTTP status
4. type（URI）
5. title（短い英語or日本語）
6. detail（ユーザーが直せる説明）
7. extensions（code/requestId/errors/retryable など）

### 例（1件だけ）🌟

* code: `OUT_OF_STOCK`
* kind: Domain
* status: 409
* type: `.../out-of-stock`
* title: `Out of stock`
* detail: `在庫が足りません。数量を減らして再試行してください。`
* ext: `{ code, requestId }`

---

## 12) AI活用プロンプト集🤖💬（この章向け）

* 「このDomainError一覧を、RFC 9457のProblem Detailsに割り当てて。status/type/title/detail/拡張codeを提案して」([IETF Datatracker][1])
* 「detailは解析しない前提で、機械分岐用の拡張フィールド設計案を3つ出して」([IETF Datatracker][1])
* 「409/422/400の使い分けがブレないように“チーム内ルール”を短くまとめて」
* 「Problem Detailsのtype URI命名ルール（粒度・安定性）を提案して」([IETF Datatracker][1])

---

## 13) ありがち事故あるある🙅‍♀️💥（先に潰そう！）

* ❌ `detail` の文言で分岐してしまう（将来確実に壊れる）
  → ✅ 分岐は `code/type` に寄せる([IETF Datatracker][1])
* ❌ 何でも500（ユーザー入力ミスなのに…）
  → ✅ Domain/Infra/Bugでstatusを分ける🚦
* ❌ 独自JSONで毎回形が違う
  → ✅ `application/problem+json` で統一([IANA][4])
* ❌ 拡張が増えたらクライアントが落ちる
  → ✅ 知らない拡張は無視できる設計にする([RFCエディタ][3])

---

次の第26章では、いま作った Problem Details を **UIにどう“同じ感じ”で見せるか**（トースト・フォーム・再試行導線）を揃えていくよ🎀🪞✨

[1]: https://datatracker.ietf.org/doc/html/rfc9457?utm_source=chatgpt.com "RFC 9457 - Problem Details for HTTP APIs"
[2]: https://www.rfc-editor.org/rfc/rfc9457.html?utm_source=chatgpt.com "RFC 9457: Problem Details for HTTP APIs"
[3]: https://www.rfc-editor.org/rfc/rfc9457.xml?utm_source=chatgpt.com "[XML] rfc9457.xml - RFC-editor.org"
[4]: https://www.iana.org/assignments/media-types/application/problem%2Bjson?utm_source=chatgpt.com "application/problem+json"
[5]: https://qiita.com/horin0211/items/38ece47b8465763c25a7?utm_source=chatgpt.com "APIエラーレスポンスを標準化する - RFC9457移行で得られる5 ..."
