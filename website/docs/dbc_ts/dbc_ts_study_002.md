# 第2章　超ミニ体験：契約あり／なしで読みやすさが激変🧪✨

## この章でできるようになること🎯

* 「契約なし」の関数が、どう“静かに壊れる”か体感する😵‍💫
* 「契約あり」にすると、**失敗の仕方がキレイ**になってデバッグが楽になる🔦✨
* TypeScriptの型だけでは守れない部分を、**実行時チェック**で補う感覚をつかむ🛡️

---

## まずは最新版メモ🆕✨（2026年1月時点）

* TypeScript の npm 最新は **5.9.3**（学習はこれ基準でOK）📦 ([npm][1])
* サクッとTSを実行するなら `tsx` が便利（npmで継続更新）⚡ ([npm][2])
* Node.js は **v24 が Active LTS**（安定重視の人はここを選びがち）🟩 ([Node.js][3])
* VS Code は定期的に更新されるので、困ったら公式アップデート情報が早い🧭 ([Visual Studio Code][4])
* TypeScript は次の大きな変化（7系）に向けた動きも進行中（知っておくと不安が減る）🚀 ([Microsoft for Developers][5])

---

## 超ミニ体験の題材：`divide(a, b)` 🍰➗

「割り算」って簡単そうだけど、**壊れ方**がいろいろあるんだよね👇

* `b = 0` → `Infinity`（無限）になったり…♾️
* `a` や `b` が `NaN` → ぜんぶ `NaN` になったり…😇
* しかも TypeScript の型は `number` だから、型だけだと止められない⚡

---

## 手を動かす準備（最小セット）🛠️✨

VS Code のターミナルで、下を順に実行するよ〜💻💕

```bash
mkdir dbc-ch2
cd dbc-ch2
npm init -y
npm i -D typescript tsx
npm pkg set scripts.dev="tsx src/main.ts"
```

> `tsx` は「TypeScriptをそのまま実行」できて、ミニ実験に超便利⚡ ([npm][2])

---

## 2.1 「防御的プログラミング」との違い🛡️🤔

![電卓の比較：防御的 vs 契約](./picture/dbc_ts_study_002_calc_comparison.png)

よく似た言葉に「防御的プログラミング（Defensive Programming）」があります。

## ① 契約なし版：静かに壊れて“あとで泣く”😭

`src/divide.ts` を作って👇

```ts
// src/divide.ts
export function divide(a: number, b: number): number {
  // 契約なし：そのまま割るだけ
  return a / b;
}
```

`src/main.ts` も作って👇

```ts
// src/main.ts
import { divide } from "./divide";

const cases: Array<[number, number]> = [
  [10, 2],
  [10, 0],
  [0, 0],
  [Number.NaN, 2],
];

for (const [a, b] of cases) {
  const result = divide(a, b);
  console.log(`divide(${a}, ${b}) =>`, result);
}
```

実行っ💨

```bash
npm run dev
```

### 何がイヤかポイント😵‍💫

* `10 / 0` が **Infinity** で返ってくる → その場では止まらない😇
* `0 / 0` が **NaN** → それも止まらない🫠
* つまり「どこで壊れたか」が**すぐ分からない**（あとでログ地獄🔥）

---

## ② 契約あり版：入口で止めて、失敗を読みやすくする🤝🛑

ここからがDbCの“気持ちよさ”だよ〜✨
**「この関数はこういう入力じゃないと受け付けないよ」**を、コードで宣言する📜✅

### 契約用エラーを作る（読みやすさUP）🧾✨

`src/contract.ts` を作って👇

```ts
// src/contract.ts
export class ContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContractError";
  }
}

export function requireCondition(condition: boolean, message: string): asserts condition {
  if (!condition) throw new ContractError(message);
}
```

### `divide` を「契約あり」に変える🪄

`src/divide.ts` を差し替え👇

```ts
// src/divide.ts
import { requireCondition } from "./contract";

export function divide(a: number, b: number): number {
  // ✅ Precondition（事前条件）：入力の約束
  requireCondition(Number.isFinite(a), `divide: a must be a finite number. got ${a}`);
  requireCondition(Number.isFinite(b), `divide: b must be a finite number. got ${b}`);
  requireCondition(b !== 0, `divide: b must be non-zero. got ${b}`);

  const result = a / b;

  // ✅ Postcondition（事後条件）：結果の約束（今回はデモとして）
  requireCondition(Number.isFinite(result), `divide: result must be finite. got ${result}`);

  return result;
}
```

もう一回実行っ💨

```bash
npm run dev
```

### 「失敗の仕方」が変わるのが勝ち✨🔦

* ダメな入力で、**その場で止まる**🛑
* エラー文に「何がダメで、何が来たか」が出る📌
* `ContractError` って名前も付くから、ログで探しやすい🔎💕

---

## “読みやすさが激変”する理由🧠✨

### 契約なし🙅‍♀️

* 関数の本音（前提）がコードに書かれてない
* 失敗が遅れてやってくる（バグが遠くで爆発）💣

### 契約あり🙆‍♀️

* 関数の前提が、**冒頭にまとまって見える**👀✨
* 変な入力は入口で止まる🚪🛑
* エラーが「原因の近く」で起きるから、修正が速い🏃‍♀️💨

```mermaid
flowchart TD
    subgraph NoContract ["契約なし🙅‍♀️"]
        A[Infinity/NaN が発生] --> B[そのまま計算が続く]
        B --> C[ずっと後でエラー/誤データ]
        C --> D["原因特定が困難 🔥"]
    end
    subgraph WithContract ["契約あり🙆‍♀️"]
        E[ダメな値を検知] --> F["その場で ContractError 🛑"]
        F --> G["原因のすぐ近くで止まる✨"]
        G --> H["デバッグが速い！🏃‍♀️"]
    end
```

---

## 演習①：エラーメッセージを“直し方が分かる”感じにしてみよう📝💕

次のメッセージ、どっちが親切かな？🙂

* ❌ `invalid input`（なにが？どう直すの？😢）
* ✅ `divide: b must be non-zero. got 0`（bを0以外にしてね！って分かる✨）

👉 自分の言葉で、もっと親切にしてみてね💡
例：`divide: 分母bが0だと割れないよ！bに1以上を入れてね（got 0）` みたいに🙌💕

---

## 演習②：テスト用ケースを増やして“止まる安心”を体感しよう🧪✨

`src/main.ts` の `cases` に追加してみて👇

* `[1, -1]`（負数はOK？OKなら通る☺️）
* `[Number.POSITIVE_INFINITY, 2]`（弾かれる🛑）
* `[1, Number.NaN]`（弾かれる🛑）

「どれが通って、どれが止まるか」予想してから実行すると楽しいよ🎯💕

---

## AI活用ミニ（Copilot / Codex）🤖✨

契約チェックを増やすとき、AIにこう頼むと速いよ⚡

* 「`requireCondition` を使って `divide` の事前条件を追加して。メッセージは got 値つきで」🪄
* 「`ContractError` を作って、例外名でログ検索しやすくして」🔎
* 「`main.ts` にいろんなテストケースを追加して、期待結果もコメントして」🧪

⚠️ ただし、**“どこまでを契約にするか”**は人間の判断が大事だよ〜🧠✨（AIは相談役🤝）

---

## 安全メモ（ちょい大事）🔐⚠️

知らないリポジトリを VS Code で開くときは、Workspace Trust（信頼）を軽く押さないでね🙏
最近も「悪意あるリポジトリを開かせる」手口が報告されてるよ🕵️‍♀️ ([TechRadar][6])

---

## 章末チェックリスト✅✨

* [ ] 契約なしの `divide` で、`Infinity / NaN` が“静かに返る”のを見た👀
* [ ] 契約ありにして、ダメ入力で“その場で止まる”のを見た🛑
* [ ] エラーメッセージを「直し方が分かる形」にできた📝💕
* [ ] 「型だけじゃ守れない部分」があるのを体感できた🧷🛡️

[1]: https://www.npmjs.com/package/typescript?utm_source=chatgpt.com "TypeScript"
[2]: https://www.npmjs.com/package/tsx?utm_source=chatgpt.com "tsx"
[3]: https://nodejs.org/en/about/previous-releases?utm_source=chatgpt.com "Node.js Releases"
[4]: https://code.visualstudio.com/updates/v1_109?utm_source=chatgpt.com "January 2026 Insiders (version 1.109)"
[5]: https://devblogs.microsoft.com/typescript/progress-on-typescript-7-december-2025/?utm_source=chatgpt.com "Progress on TypeScript 7 - December 2025"
[6]: https://www.techradar.com/pro/security/north-korean-hackers-target-microsoft-virtual-studio-code?utm_source=chatgpt.com "North Korean hackers target Microsoft Virtual Studio Code"

