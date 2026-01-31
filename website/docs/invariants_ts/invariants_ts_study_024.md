# 第24章　境界での変換：エラーを「層に合わせて」変える🔄🧭

![第24章　境界での変換：エラーを「層に合わせて」変える🔄🧭](./picture/invariants_ts_study_024_error_mapping.png)

この章では、**ドメインで起きたエラーを「外に出す用のエラー表現」に変換**して、API/UIに“やさしく・安全に”返すやり方を身につけます😊✨
ポイントは **「中の事情は外に漏らさない」**＋**「外は一貫した形で返す」** です🔒🫶

---

## 1) まずはゴール🎯✨

* ドメイン層（不変条件の世界）で起きた失敗を、**HTTPエラー**に変換できる🙂
* ユーザーに返す文言は親切に、でも **内部情報（DB名/スタックトレース等）は隠す**🔐
* エラー形式を統一して、フロントもデバッグも楽にする😆📦

---

## 2) 「層に合わせて変える」ってどういうこと？🏰➡️🌍

同じ“失敗”でも、層によって役割が違うよね、という話です🙂

* **ドメイン層**：不変条件（例：メール形式、金額はマイナス不可）を守る🛡️💎
  → “なにが”ダメかは分かるけど、**HTTPとかUIの都合は知らない**
* **境界層（API/Controller）**：外の世界（HTTP/JSON）に合わせて返す📡
  → “どう返すとユーザーが直せるか” を設計する🧭✨

```mermaid
flowchart LR
    subgraph Inside [ドメイン層 (内側)]
        Invariants[不変条件 / DomainError]
    end
    Inside -- 変換 --> Boundary[境界層 (API)]
    Boundary -- RFC 9457 --> Outside [外部の世界 (API利用者)]
    
    style Inside fill:#e6f7ff,stroke:#91d5ff
    style Outside fill:#f6ffed,stroke:#b7eb8f
```

そして重要なのがこれ👇
**Problem Details（RFC 9457）**は「HTTP APIのエラー返し方」を標準化した形式だよ📄✨ ([RFCエディタ][1])

---

## 3) ありがちな事故😱💥（だから変換が必要）

* ドメインエラーをそのまま `throw new Error("DB constraint fail: users_email_key")` で返す
  → **内部情報だだ漏れ**で危ない🔓😵
* 画面/フロントが、エラーの形がバラバラで処理できない
  → `message` があったりなかったりで地獄🌀
* 何でも `500` にしてしまう
  → ユーザー側が直せるエラーなのに、直しようがない🙃

RFC 9457でも「Problem Detailsはデバッグ用のダンプじゃないよ」「実装内部を漏らすと危険だよ」って強めに注意されています⚠️🔒 ([RFCエディタ][1])

---

## 4) 返す形は「Problem Details」に寄せる📦✨

### Problem Details（JSON）の基本形🧩

* `type`: エラー種類のURI（ドキュメントのURLにするのが定番）
* `title`: 短いタイトル
* `status`: HTTPステータス
* `detail`: 人間向け説明（外に出してOKな範囲で）
* `instance`: その発生を識別するID（requestIdとか）

IANAの `application/problem+json` も RFC 9457 が参照になるよう更新されています📌 ([RFCエディタ][1])

---

## 5) ステータスコードの“最小ルール”🧠✨

迷ったら、まずこのルールで十分だよ🙂

* **400 Bad Request**：JSONが壊れてる、必須がない、型が違う…など「リクエスト自体が変」([RFCエディタ][2])
* **422 Unprocessable Content**：形式はOKだけど「意味がダメ」（不変条件違反っぽい）([RFCエディタ][2])
* **409 Conflict**：重複などの競合（例：メールアドレスが既に使われてる）([RFCエディタ][2])
* **401/403**：認証・権限系([RFCエディタ][2])
* **500**：想定外（バグ/障害）。外には雑に、内側ログは濃く🧯🛠️

> 422は昔から「Unprocessable Entity」と呼ばれがちだけど、HTTP Semantics（RFC 9110）では「Unprocessable Content」として定義されてます📘 ([RFCエディタ][2])

---

## 6) 実装パターン：3種類の失敗を分ける🚦🙂

境界では、失敗を大きく3つに分けるとスッキリします✨

1. **入力の形がダメ**（スキーマ検証エラー）🧱❌ → 400
2. **ドメインのルールがダメ**（不変条件）💎❌ → 422 / 409 など
3. **想定外**（例外）💥 → 500（詳細は隠す）

```mermaid
flowchart TD
    Req[HTTPリクエスト] --> Schema{1. スキーマ検証<br/>(Zod)}
    Schema -- 失敗 --> Result400[400 Bad Request<br/>zodToProblem]
    Schema -- 成功 --> Domain{2. ドメインロジック<br/>(Email.create等)}
    Domain -- 失敗 --> Result422[422 / 409 Conflict<br/>domainToProblem]
    Domain -- 成功 --> Unexpected{3. 実行時エラー?}
    Unexpected -- はい --> Result500[500 Internal Error<br/>unknownToProblem]
    Unexpected -- いいえ --> Success[201 Created / 200 OK]

    style Result400 fill:#fff1f0,stroke:#ffa39e
    style Result422 fill:#fff1f0,stroke:#ffa39e
    style Result500 fill:#fff1f0,stroke:#ffa39e
    style Success fill:#f6ffed,stroke:#b7eb8f
```

ここでは実行時バリデーションに **Zod v4（安定版）** を使う例でいきます🙂
2026-01-31時点で Zod の最新版は **4.3.6** です📌 ([npmjs.com][3])
（TypeScript は 2026-01-31時点で npm の最新版が **5.9.3**） ([npmjs.com][4])

---

## 7) 例：会員登録APIで「エラー変換」してみる🧑‍💻🌸

### 7-1. まずは共通の Result 型（超シンプル）📦

```ts
export type Ok<T> = { ok: true; value: T };
export type Err<E> = { ok: false; error: E };
export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });
export const err = <E>(error: E): Err<E> => ({ ok: false, error });
```

### 7-2. ドメインエラー（外に出す前提じゃない）💎

```ts
export type DomainError =
  | { _tag: "EmailInvalid"; reason: "format" | "tooLong" }
  | { _tag: "PasswordWeak"; reason: "tooShort" | "noNumber" }
  | { _tag: "EmailAlreadyUsed" };
```

### 7-3. 値オブジェクト Email（不変条件を中に閉じ込める）📩🔒

```ts
type Brand<K, T> = K & { __brand: T };
export type Email = Brand<string, "Email">;

export const Email = {
  create(raw: string): Result<Email, DomainError> {
    const v = raw.trim().toLowerCase();

    if (v.length > 254) return err({ _tag: "EmailInvalid", reason: "tooLong" });
    // ここは「例」として超ざっくり（本番ではもっと厳密でもOK）
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (!looksLikeEmail) return err({ _tag: "EmailInvalid", reason: "format" });

    return ok(v as Email);
  },
} as const;
```

### 7-4. 境界の入力スキーマ（unknown→検証）🕵️‍♀️✅

```ts
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(8),
});
type RegisterDTO = z.infer<typeof registerSchema>;
```

### 7-5. Problem Details の型（返却専用）📦✨

```ts
export type ProblemDetails = {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  errors?: Array<{ path: string; message: string }>;
};
```

### 7-6. 変換：Zodエラー → Problem Details（400）🧱❌

```ts
import { ZodError } from "zod";

function zodToProblem(e: ZodError, instance: string): ProblemDetails {
  return {
    type: "https://example.com/problems/invalid-request",
    title: "入力が正しくありません",
    status: 400,
    detail: "入力内容を確認して、もう一度送ってね🙏",
    instance,
    errors: e.issues.map((iss) => ({
      path: "/" + iss.path.join("/"),
      message: iss.message,
    })),
  };
}
```

### 7-7. 変換：ドメインエラー → Problem Details（422/409）💎❌

```ts
function domainToProblem(e: DomainError, instance: string): ProblemDetails {
  switch (e._tag) {
    case "EmailInvalid":
      return {
        type: "https://example.com/problems/email-invalid",
        title: "メールアドレスが不正です",
        status: 422,
        detail:
          e.reason === "tooLong"
            ? "メールが長すぎるみたい…🙇‍♀️"
            : "メール形式を確認してね📩",
        instance,
      };

    case "PasswordWeak":
      return {
        type: "https://example.com/problems/password-weak",
        title: "パスワードが弱いです",
        status: 422,
        detail: "8文字以上で、もう少し強めにしてね🔐✨",
        instance,
      };

    case "EmailAlreadyUsed":
      return {
        type: "https://example.com/problems/email-already-used",
        title: "そのメールアドレスは使用済みです",
        status: 409,
        detail: "ログインするか、別のメールで試してね🙂",
        instance,
      };
  }
}
```

### 7-8. 変換：想定外 → Problem Details（500）🧯

```ts
function unknownToProblem(instance: string): ProblemDetails {
  return {
    type: "about:blank",
    title: "サーバーで問題が発生しました",
    status: 500,
    detail: "時間をおいてもう一度試してね🙏",
    instance,
  };
}
```

### 7-9. 境界ハンドラ（例：Request/Responseスタイル）🚪✨

```ts
import { z } from "zod";

export async function POST(req: Request): Promise<Response> {
  const requestId = crypto.randomUUID();

  try {
    const body: unknown = await req.json();

    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const problem = zodToProblem(parsed.error, requestId);
      return Response.json(problem, {
        status: problem.status,
        headers: {
          "Content-Type": "application/problem+json",
          "X-Request-Id": requestId,
        },
      });
    }

    const dto: RegisterDTO = parsed.data;

    const emailR = Email.create(dto.email);
    if (!emailR.ok) {
      const problem = domainToProblem(emailR.error, requestId);
      return Response.json(problem, {
        status: problem.status,
        headers: {
          "Content-Type": "application/problem+json",
          "X-Request-Id": requestId,
        },
      });
    }

    // ここでドメインサービスへ（例：重複なら EmailAlreadyUsed を返す）
    // const result = await register({ email: emailR.value, password: dto.password })
    // if (!result.ok) ...

    return Response.json(
      { ok: true },
      { status: 201, headers: { "X-Request-Id": requestId } }
    );
  } catch (e) {
    // ⚠️ ログには e をしっかり残す（外には出さない）
    console.error("requestId=", requestId, e);

    const problem = unknownToProblem(requestId);
    return Response.json(problem, {
      status: problem.status,
      headers: {
        "Content-Type": "application/problem+json",
        "X-Request-Id": requestId,
      },
    });
  }
}
```

> `application/problem+json` は RFC 9457 の “Problem Details” のメディアタイプとして扱われます📦 ([RFCエディタ][1])
> そして「実装内部（スタック等）をHTTPで見せないでね」はセキュリティ観点でも明確に注意されています🔒 ([RFCエディタ][1])

---

## 8) 境界で変換すると、何がうれしい？😍✨

* **フロントが楽**：`status` と `type` で機械的に分岐できる🎮
* **UXが良い**：`errors` を出せばフォームにピンポイント表示できる📝
* **セキュア**：内部実装を漏らさない🔐
* **運用が楽**：`X-Request-Id` と `instance` で問い合わせ対応が速い📞⚡

---

## 9) AI活用プロンプト（この章向け）🤖✨

* 「このAPIのエラーを Problem Details に統一したい。`type/title/status/detail` の候補を10個出して」🧠
* 「DomainError（タグ付きユニオン）からHTTPステータスへのマッピング案を表にして」🗺️
* 「入力エラー（400）と不変条件違反（422/409）を分けるテストケースを列挙して」🧪
* 「外に出してはいけない情報の例を列挙して、危険度も付けて」🔒

---

## 10) ミニ課題📝✨

### 課題1：マッピング表を作る🗺️

あなたの題材で、不変条件エラーを3つ以上考えて👇に落としてみてね🙂

* `DomainError` の `_tag`
* `HTTP status`（400/409/422あたり）
* `problem type`（URL）
* `title` / `detail`

### 課題2：境界の変換関数を実装する🔧

* `domainToProblem()` を追加して、**必ず switch を網羅**する🏷️✅
* `unknownToProblem()` は **外に詳細を出さない**（ログだけ濃く）🧯

### 課題3：フロント表示の想像をする👀✨

* `errors: [{path, message}]` を使って、フォームのどこに表示するか考える📩🔐

---

[1]: https://www.rfc-editor.org/rfc/rfc9457.html "RFC 9457: Problem Details for HTTP APIs"
[2]: https://www.rfc-editor.org/rfc/rfc9110.html "RFC 9110: HTTP Semantics"
[3]: https://www.npmjs.com/package/zod?utm_source=chatgpt.com "zod"
[4]: https://www.npmjs.com/package/typescript?utm_source=chatgpt.com "TypeScript"
