# 第5章：Windows＋VS Codeの最小セットを整える🪟🛠️✨

この章は「SoCを学ぶための“土台づくり”」だよ〜！🎀
ここで整えるのは **“迷わず動かせる実行コマンド”** と **“自動で守ってくれる安全柵”**（Lint/Format/Test）です✅
SoCって「分ける」話なんだけど、実は **環境にもSoCがある**んだよね☺️
（型チェック＝型の関心、Lint＝品質の関心、Format＝見た目の関心、Test＝動作の関心）🧠🧩

---

## 5.1 まずは完成イメージ（この章のゴール）🎯✨

この章が終わったら、最低限これができる状態にするよ！

* VS Codeでプロジェクトを開ける📂
* ターミナルで `node -v` / `npm -v` が通る🏃‍♀️
* これらを **同じ手順** で実行できる👇✨

  * `npm run typecheck`（型だけ見る）🧠
  * `npm run lint`（危ない書き方を止める）🚨
  * `npm run format`（見た目を揃える）🎀
  * `npm test`（動作を守る）🧪

Node.jsは **Active LTS** を使うのが安心（本番向き）で、公式も「ProductionはActive/Maintenance LTSを推奨」って言ってるよ📌 ([Node.js][1])

---

## 5.2 Node.js（Active LTS）を入れる🍀

### ✅ いまのおすすめ（2026/01時点）

Node.jsの公式リリース一覧では **v24（Krypton）が Active LTS** になってるよ（v25はCurrent）📌 ([Node.js][1])
さらに、Node.js 24.11.0 のリリースで「24.xがLTSに入った＆2028年4月末まで更新が続く」って明記されてるよ📌 ([Node.js][2])

> つまり：迷ったら **v24系（Active LTS）** を選べばOK！😊✨

### 手順（ざっくりでOK）🪜

1. Node.js公式サイトから **LTS（v24系）** を入れる
2. VS Codeを開いて、ターミナル（PowerShell）で確認👇

```txt
node -v
npm -v
```

#### うまくいかない時あるある😇

* `node` が見つからない
  → VS Code / ターミナルを一回閉じて開き直す（PATH反映）🔁
* “Current（v25）入れちゃったかも”
  → 公式表で v25 は Current、v24 が Active LTS だから、学習・運用は v24が安心だよ🧸 ([Node.js][1])

---

## 5.3 VS Codeに入れる拡張（最小セット）🧰✨

ここは「迷ったらこの4つ」だけでOK！💕

### ① ESLint（エディタで危険を早めに検知）🚨

拡張：**ESLint（dbaeumer.vscode-eslint）**
この拡張は「プロジェクト内に入ってるESLint（ローカル）を使う」って書いてあるよ📌 ([Visual Studio Marketplace][3])

### ② Prettier（自動整形）🎀

今ちょっと大事な注意があるよ⚠️

* いま広く使われてるのは `esbenp.prettier-vscode`（インストール数も多い）📌 ([Visual Studio Marketplace][4])
* でも、拡張が **`prettier.prettier-vscode` に移行中** で、**v12+は新しい方にしか出てない＆“まだ安定じゃないので注意”** ってMarketplace本文に書いてあるの🥺📌 ([Visual Studio Marketplace][5])

さらにさらに、**Prettierに似せた偽拡張が出た**みたいなセキュリティ注意喚起もあるから、検索で適当に入れない方が安全だよ…！😱🔒 ([ロケットボーイズ セキュリティニュース][6])

👉 最初はこれでいこう（安全＆迷わない）

* 拡張IDを指定して入れる（検索しない）✅
* “安定優先なら `esbenp.prettier-vscode`”
* “移行を試すなら `prettier.prettier-vscode`（ただしv12は注意）” ([Visual Studio Marketplace][5])

### ③ GitHub Copilot（AI補助）🤖✨

Copilot拡張は Marketplace に「モデル選択・カスタム指示・エージェントモード」などが書かれてるよ📌 ([Visual Studio Marketplace][7])

### ④ GitHub Copilot Chat（AIと会話で設計相談）💬✨

Copilotを入れると “Copilot本体＋Copilot Chat” の2つがセット、ってMarketplaceにも書いてあるよ📌 ([Visual Studio Marketplace][7])

---

## 5.4 新規プロジェクトを作って“動く場所”を確保しよう📁🏗️

### 1) フォルダ作成＆VS Codeで開く📂

例：`soc-practice` みたいに作って開く（名前は何でもOK）✨

### 2) npm初期化（最短）⚡

```sh
npm init -y
```

---

## 5.5 TypeScript（最新版）をプロジェクトに入れる🟦✨

TypeScript公式は「npmでプロジェクトに入れて、`npx tsc` で動かす」流れを案内してるよ📌 ([typescriptlang.org][8])
そして “最新は 5.9” って明記されてる（2026/01時点）📌 ([typescriptlang.org][8])

```sh
npm i -D typescript
npx tsc --init
```

---

## 5.6 Lint/Format/Test を入れて「自動で守る」状態にする🛡️🧪🎀

![Safety Net](./picture/soc_ts_study_005_safety_net.png)

### 5.6.1 ESLint（ローカルに入れる）🚨

ESLint拡張の説明でも「ローカルインストール推奨」って書いてあるよ📌 ([Visual Studio Marketplace][3])

```sh
npm i -D eslint
```

しかも最近のESLintは、v9以降（またはv8.57+）だと設定ファイルは `eslint.config.*` が基本、って拡張ページにも載ってるよ📌 ([Visual Studio Marketplace][3])

まずはここまででOK！
（設定の中身は後の章で“SoCっぽく”キレイにしていくと気持ちいいよ😊）

### 5.6.2 Prettier（プロジェクトにも入れる）🎀

拡張だけでも動くけど、**プロジェクト側に入れる**と「チームやPCが変わっても同じ結果」になりやすいの🧁✨

```sh
npm i -D prettier
```

### 5.6.3 Test（最小の考え方：2択）🧪

```mermaid
flowchart LR
    Start([Write Code]) --> TS[Type Check]
    TS --> Lint[ESLint]
    Lint --> Fmt[Prettier]
    Fmt --> Test[Vitest]
    Test --> Goal([Safe Commit! 🏆])
    
    style TS fill:#e1f5fe
    style Lint fill:#fff9c4
    style Fmt fill:#f3e5f5
    style Test fill:#e8f5e9
```

ここは“軽さ優先”で選べるよ〜！

#### A) Node標準テスト（依存を増やしたくない人向け）🍃

Nodeの `node:test` は安定（Stable）ってドキュメントに書いてあるよ📌 ([Node.js][9])
ただしTypeScriptで気軽に回すには工夫がいるので、学習ではBが楽なこと多いかも🥺

#### B) Vitest（TypeScriptでテスト回しやすい）🌸

Vitestは公式ガイドがあって、今も普通に使われてるよ📌 ([Vitest][10])

```sh
npm i -D vitest
```

---

## 5.7 “迷わない実行”を npm scripts で固定する🏃‍♀️💨

`package.json` の `"scripts"` にこれを入れると、**毎回コマンドに迷わない**よ✨
（SoC的にも「実行の関心」をここに集める感じ！🧠🧩）

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "format": "prettier . --write",
    "test": "vitest",
    "test:run": "vitest run",
    "check": "npm run typecheck && npm run lint && npm run test:run"
  }
}
```

おすすめ運用はこれ👇💖

* 普段：`npm test`（監視で回す）🧪
* 提出前：`npm run check`（全部まとめて確認）✅✨

---

## 5.8 VS Codeを“保存したら勝手に整う”状態にする💾✨

プロジェクト直下に `.vscode/settings.json` を作って、こうするのが楽だよ〜！🎀

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

> Prettierを新ID（`prettier.prettier-vscode`）にするなら、`editor.defaultFormatter` もそれに合わせてね（Marketplaceにも例があるよ）📌 ([Visual Studio Marketplace][5])

---

## 5.9 詰まりポイント回避メモ（Windowsあるある）😇📝

* **PATH反映されない**：VS Code/ターミナル再起動🔁
* **改行が崩れる**：フォーマッタ（Prettier）＋Git設定で安定しやすい🧁
* **拡張が多すぎて混乱**：この章は「最小4つ」だけで十分🧰✨
* **Prettier偽物こわい**：拡張IDを直接指定して入れるのが安全寄り🔒😱 ([ロケットボーイズ セキュリティニュース][6])

---

## 5.10 AI（Copilot/Codex）で“初期設定”を一瞬で終わらせる🤖⚡

ここ、めちゃ便利だから最初から使っちゃお〜！💕

### 使えるお願いテンプレ（コピペOK）🎁

* 「`package.json` の scripts を、typecheck/lint/format/test/check で作って。Vitest前提で」🧪
* 「ESLint v9 の flat config（eslint.config.*）をTypeScript向けに最小で作って」📌（ESLint拡張もv9以降は `eslint.config.*` が基本って書いてるよ） ([Visual Studio Marketplace][3])
* 「`.vscode/settings.json` を保存時フォーマット＆ESLint自動修正で作って」💾✨

### AIの出力をチェックするコツ🔍

* scriptsが **役割ごとに分かれてる？**（typecheck / lint / format / test）🧩
* `check` が **まとめ実行** になってる？✅
* “よく分からないオプション盛り盛り”になってたら、**一回やめて削る**（KISS〜！🍰）

---

## ミニ課題（3分）🎮✨

次の4つが全部通ったら、この章クリア！🏆💕

```sh
npm run typecheck
npm run lint
npm run format
npm test
```

---

次の第6章で、いよいよ **「最小フォルダ設計（サイトの骨格）」** に入って、SoCっぽさが一気に出てくるよ〜！📁🏗️✨

[1]: https://nodejs.org/en/about/previous-releases "Node.js — Node.js Releases"
[2]: https://nodejs.org/en/blog/release/v24.11.0 "Node.js — Node.js 24.11.0 (LTS)"
[3]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint "
        ESLint - Visual Studio Marketplace
    "
[4]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode "
        Prettier - Code formatter - Visual Studio Marketplace
    "
[5]: https://marketplace.visualstudio.com/items?itemName=Prettier.prettier-vscode "
        Prettier - Code formatter - Visual Studio Marketplace
    "
[6]: https://rocket-boys.co.jp/security-measures-lab/fake-vscode-extension-prettier-vscode-plus-disguised-as-prettier-formatter/?utm_source=chatgpt.com "VSCodeに偽の拡張機能 prettier-vscode-plus-「Prettier"
[7]: https://marketplace.visualstudio.com/items?itemName=GitHub.copilot "
        GitHub Copilot - Visual Studio Marketplace
    "
[8]: https://www.typescriptlang.org/download/ "TypeScript: How to set up TypeScript"
[9]: https://nodejs.org/api/test.html?utm_source=chatgpt.com "Test runner | Node.js v25.2.1 Documentation"
[10]: https://vitest.dev/guide/?utm_source=chatgpt.com "Getting Started | Guide"
