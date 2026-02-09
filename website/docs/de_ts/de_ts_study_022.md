# 第22章：エラー分類（ドメイン vs インフラ）🚧🌐

## この章のゴール🎯✨

* 失敗を「種類」で分けて整理できるようになる🧠🗂️
* どこで投げて、どこで受け止めて、どこで“言い換える”かが分かる🔁💬
* ドメインイベント設計で「壊れにくい失敗の扱い」を作れるようになる🛡️📣

---

## 1. まず結論：失敗は“2種類＋α”に分けるのがラク😺🍀

![失敗の種類を「ドメイン」「インフラ」「未知」に分類する](./picture/de_ts_study_022_error_sorting.png)


### ✅ ドメインエラー（Domain Error）🧱🔒

**業務ルール違反**・**状態が許されない**が原因。
例：

* すでに支払い済みなのに、もう一回支払おうとした💳❌
* 在庫が0なのに注文しようとした📦❌
* クーポン期限切れなのに適用しようとした🎫⏰❌

👉 **ユーザーに説明できる**（そしてユーザーの行動で回避できる）ことが多いよ✨

### ✅ インフラエラー（Infrastructure Error）🌐🧯

**通信・DB・外部サービス**など “環境” が原因。
例：

* DBに接続できない🗄️🔌❌
* メール送信APIがタイムアウトした📩⏳❌
* 決済サービスが一時的に落ちてる💳⚡❌

👉 **ユーザーが頑張っても直らない**ことが多いよ😵‍💫

### ✅ そして“α”：未知のエラー（Bug/Unknown）🐛❓

* ぬるぽ、型ミス、想定外のデータ形式…など
  👉 これは「分類できない」じゃなくて、**まずバグとして扱う**のが安全🙆‍♀️

---

## 2. なんで分類が必要なの？（超だいじ）💡💖

分類できると、判断が一気にラクになるよ✨

* **ドメインエラー**：

  * 画面に出す文言を用意しやすい🪧
  * リトライしても意味がない（ルール違反は直らない）🔁❌
* **インフラエラー**：

  * リトライ対象になりやすい（次章で深掘り🔁🧯）
  * ログ・監視・運用の対象になる👀📈
* **未知のエラー**：

  * まずアラート＆調査🔔🕵️‍♀️

---

## 3. 3秒で分類するコツ⏱️🧠✨

迷ったらこの質問👇

### Q1：これは「業務ルールの話」？🧾

* YES 👉 ドメインエラー🧱
* NO 👉 次へ

### Q2：これは「外部・環境の話」？（DB/通信/依存サービス）🌐

* YES 👉 インフラエラー🌐
* NO 👉 次へ

### Q3：それ以外（想定外）？🐛

* YES 👉 未知のエラー（バグ扱い）🐛

---

## 4. “境界で変換する”ってどういうこと？🔁🚪

ざっくり図にするとこう👇

* **ドメイン層**：ルール違反ならドメインエラーを出す🧱
* **インフラ層**：通信やDB失敗ならインフラエラーとして包む🌐
* **アプリ/UI層（境界）**：受け取ったエラーを「画面・HTTP・ログ向け」に言い換える💬🗂️

---

## 5. TypeScriptの“今どき”ポイント（最新寄り）🧷✨

### 5.1 `catch (err)` の `err` は `unknown` が基本ムード🙋‍♀️

TypeScriptには `useUnknownInCatchVariables` というフラグがあり、`catch` 変数を `unknown` として扱う方針が用意されてるよ（狙いは「安全に絞り込め！」ってこと）🛡️✨ ([TypeScript][1])

だから、**catchした瞬間に `err.message` を触るのはNG**になりがち😿
→ ちゃんと絞り込み（narrowing）しようね！

### 5.2 “原因を持たせる” `Error.cause` が超便利🧠🔗

エラーを「包み直す」ときに、元エラーを `cause` に残せるよ✨

* ブラウザでも広く使える仕様になってる🌍 ([MDN Web Docs][2])
* Node.jsでも `error.cause` があり、`new Error(message, { cause })` で扱える（Nodeでは v16.9.0 追加）📌 ([Node.js][3])

これがあると「表のメッセージは分かりやすく、でも原因は失わない」ができる😻

---

## 6. 実装してみよう：エラー型を2系統に分ける🧩🧱🌐

ここでは **“例外（throw）で表現する版”** を作るよ（まずはシンプル優先）✨

### 6.1 ドメインエラー基底クラス🧱

```ts
// domain/errors/DomainError.ts
export abstract class DomainError extends Error {
  readonly category = "domain" as const;

  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = new.target.name;
  }
}
```

例：支払い済みなのに支払い、を禁止💳❌

```ts
// domain/errors/OrderAlreadyPaidError.ts
import { DomainError } from "./DomainError";

export class OrderAlreadyPaidError extends DomainError {
  constructor(orderId: string) {
    super(`注文(${orderId})はすでに支払い済みだよ💳✅（二重払い防止）`);
  }
}
```

---

### 6.2 インフラエラー基底クラス🌐🧯（cause で原因を保持）

```ts
// infrastructure/errors/InfrastructureError.ts
export abstract class InfrastructureError extends Error {
  readonly category = "infrastructure" as const;

  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = new.target.name;
  }
}
```

例：決済API呼び出し失敗を “文脈つき” で包む💳🌩️

```ts
// infrastructure/errors/PaymentGatewayError.ts
import { InfrastructureError } from "./InfrastructureError";

export class PaymentGatewayError extends InfrastructureError {
  constructor(orderId: string, options?: { cause?: unknown }) {
    super(`決済処理に失敗したよ💳⚠️ orderId=${orderId}`, options);
  }
}
```

> `cause` を使うと、表のメッセージを変えても「元の失敗（タイムアウト等）」を失わないよ🔗✨ ([MDN Web Docs][2])

---

## 7. どこで投げる？どこで変換する？（ミニECで流れを作る）🛒🧩

### 7.1 ドメイン（集約）では「ルール違反だけ」を投げる🧱

```ts
// domain/order/Order.ts
import { OrderAlreadyPaidError } from "../errors/OrderAlreadyPaidError";

type OrderStatus = "pending" | "paid";

export class Order {
  private status: OrderStatus = "pending";
  private domainEvents: Array<{ type: string; payload: unknown }> = [];

  constructor(private readonly id: string) {}

  pay(paymentId: string) {
    if (this.status === "paid") {
      throw new OrderAlreadyPaidError(this.id);
    }

    this.status = "paid";

    // ドメインイベントは「起きた事実」📣
    this.domainEvents.push({
      type: "OrderPaid",
      payload: { orderId: this.id, paymentId },
    });
  }

  pullDomainEvents() {
    const events = this.domainEvents;
    this.domainEvents = [];
    return events;
  }
}
```

ポイント💡

* ドメインは **通信/DBを知らない** 🙅‍♀️
* だから、ここで出るのは **ドメインエラー中心** 🧱✨

---

### 7.2 インフラ（外部I/O）では「失敗を包んで投げる」🌐

```ts
// infrastructure/payment/PaymentGateway.ts
import { PaymentGatewayError } from "../errors/PaymentGatewayError";

export class PaymentGateway {
  async charge(orderId: string, amount: number) {
    try {
      // ここで外部API呼び出しをする想定
      // await fetch(...)

      // わざと失敗例：
      throw new Error("timeout");
    } catch (err) {
      // err は unknown になりがちなので絞り込みが大事🛡️ :contentReference[oaicite:4]{index=4}
      throw new PaymentGatewayError(orderId, { cause: err });
    }
  }
}
```

---

### 7.3 境界（アプリ層）で “言い換え” する🔁💬

ここが第22章の本体✨
「受け取ったエラー」を、**呼び出し元が扱いやすい形**に変換するよ！

#### まず “アプリ向けエラー” を定義🧾

```ts
// application/errors/AppError.ts
export type AppError =
  | { kind: "validation"; message: string }   // ユーザーに説明しやすい
  | { kind: "temporary"; message: string }    // 一時的（リトライ候補）
  | { kind: "unexpected"; message: string };  // バグ/想定外
```

#### 変換関数（ここが境界での翻訳機）🗣️🔁

```ts
// application/errors/toAppError.ts
import { DomainError } from "../../domain/errors/DomainError";
import { InfrastructureError } from "../../infrastructure/errors/InfrastructureError";
import { AppError } from "./AppError";

export function toAppError(err: unknown): AppError {
  if (err instanceof DomainError) {
    return { kind: "validation", message: err.message };
  }

  if (err instanceof InfrastructureError) {
    // ユーザーにそのまま出すのは危険なことが多いので、文言は控えめに✨
    return { kind: "temporary", message: "ただいま混み合ってるみたい…💦 もう一度ためしてね🙏" };
  }

  if (err instanceof Error) {
    return { kind: "unexpected", message: "想定外のエラーが起きたよ😵‍💫（運営に連絡してね）" };
  }

  return { kind: "unexpected", message: "想定外のエラーが起きたよ😵‍💫" };
}
```

---

## 8. ドメインイベント的に、分類が効く場面📣🧩

### ✅ ドメインエラーが起きたら

* 状態変更できない
* 当然イベントも出ない（“起きてない”から）📣❌

### ✅ インフラエラーが起きたら（保存・送信・外部連携）

* “起きた事実” はあるのに、外へ届けられないことがある😿
* だから Outbox（第20〜21章）や、失敗時方針（第23章）に繋がる🔗✨

この章ではまず **「それはどっちの失敗？」** をブレずに言えるようにしようね🎯

---

## 9. やってみよう演習📝💖

### 演習1：分類ゲーム（5問）🧠🎮

次を **domain / infrastructure / unknown** に分けてみてね👇

1. `注文合計が0円` の注文を作ろうとした🧾
2. `DB接続` が切れて保存できない🗄️
3. `メール送信API` が 503 を返した📩
4. `すでに発送済み` なのにキャンセルしようとした📦
5. `JSON.parse` が落ちた（想定外形式が来た）🧩💥

---

### 演習2：境界で変換して返す🔁💬

`toAppError()` を使って、ユースケースから戻す形を作ってみよう✨

```ts
// application/usecases/payOrder.ts
import { toAppError } from "../errors/toAppError";
import { AppError } from "../errors/AppError";

export async function payOrder(): Promise<{ ok: true } | { ok: false; error: AppError }> {
  try {
    // ここで、ドメイン更新 → 保存 → イベント配送…という流れを呼ぶ想定
    // 例：order.pay(); repo.save(order); dispatcher.dispatch(order.pullDomainEvents());

    return { ok: true };
  } catch (err) {
    return { ok: false, error: toAppError(err) };
  }
}
```

---

## 10. AI活用（コピペで使える）🤖✨💬

* 「ミニECで起こりうるドメインエラーを10個、イベント名も添えて出して」🧾📣
* 「この失敗ケース一覧を domain / infrastructure / unknown に分類して、理由も一言で」🧠🗂️
* 「InfrastructureError に包むときの message のテンプレを3案（ログ向け/運用向け/画面向け）で」🌐🧯
* 「toAppError の分岐、漏れてるケースある？追加するなら何？」🔍✅

---

## 11. まとめチェックリスト✅🧡

* ドメイン層で投げるのは **業務ルール違反** だけ🧱
* 通信/DB/外部APIの失敗は **インフラエラー** として包む🌐
* `catch` は `unknown` 前提で **絞り込み**する🛡️ ([TypeScript][1])
* `Error.cause` で **原因を保持**して、調査力を上げる🔗✨ ([MDN Web Docs][2])
* 境界（アプリ層）で “言い換え” して、呼び出し元に返す🔁💬

---

[1]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html?utm_source=chatgpt.com "Documentation - TypeScript 4.4"
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause?utm_source=chatgpt.com "Error: cause - JavaScript - MDN Web Docs"
[3]: https://nodejs.org/api/errors.html?utm_source=chatgpt.com "Errors | Node.js v25.4.0 Documentation"
