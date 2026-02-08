# 第47章：タイマーとリトライ（遅くしない工夫）⏱️🔁

![ストップウォッチの調整[(./picture/tdd_ts_study_047_stopwatch.png)

テストで `setTimeout(1000)` を“本当に1秒待つ”の、めちゃくちゃ損です😭
**速いテスト＝毎回回せる＝TDDが続く**ので、ここはちゃんとズルします😆✨

---

## 🎯 目的

* “待ち時間がある処理（リトライ/タイマー）”を、**一瞬でテスト**できるようになる⏩💨
* **リトライの仕様**（何回？どの間隔？いつ諦める？）をテストで固定できるようになる🧪📌
* Vitestの**フェイクタイマー**を使って、時間を自由に進められるようになる🕰️✨ ([vitest.dev][1])

---

## 📚 学ぶこと（この章のコア）🧠✨

### 1) 「時間」は依存（＝テストの敵）👾

* `setTimeout` / `setInterval` / “待つ” は、テストを遅くして不安定にします😵‍💫
* だから **時間をコントロール**する（＝フェイクにする）！([vitest.dev][1])

### 2) フェイクタイマーの基本（Vitest）🧪

* `vi.useFakeTimers()` を呼ぶと、以降のタイマー系がフェイクになります（`setTimeout`/`setInterval`/`Date` など）([vitest.dev][1])
* 時間を進める：`vi.advanceTimersByTime(ms)` / `vi.advanceTimersByTimeAsync(ms)`([vitest.dev][1])
* まとめて実行：`vi.runAllTimersAsync()` / `vi.runOnlyPendingTimersAsync()`（非同期タイマーもOK）([vitest.dev][1])
* 終わったら `vi.useRealTimers()`（※フェイク中に予約されたタイマーは破棄されます）([vitest.dev][1])

### 3) リトライ設計の “守るべき常識” 🧯

* だいたいの公式ガイドは **指数バックオフ＋ジッター**（混雑時の雪崩を防ぐ）を推します🌩️➡️🌤️ ([Google Cloud Documentation][2])
* **最初の1回目は遅らせない**（遅らせるのはリトライだけ）という流儀も一般的です👌 ([AWS ドキュメント][3])
* そして **回数上限**（or 合計時間上限）を付けないと事故ります🚨 ([AWS ドキュメント][4])
* さらに「何でもリトライ」はダメ🙅‍♀️：**一時的エラー**＆**安全に再実行できる操作（冪等性）**が前提になりがちです ([Google Cloud Documentation][2])

---

## 🧪 手を動かす（TDDで“リトライ”を作る）🔨✨

ここでは、次の2つを作ります🎁

1. `sleep(ms)`：待つだけ（テストでは待たない）😴➡️😆
2. `retry(op, options)`：失敗したら待って再試行🔁

---

## 0. まず“ダメな例”を見てイライラする😇（大事）

こういうテスト、書きたくなるけど…

```ts
it('1秒後に何かが起きる', async () => {
  await new Promise(r => setTimeout(r, 1000)) // ← これが地獄の入口😇
  expect(true).toBe(true)
})
```

これが100本あったら…テスト100秒🥹💔
なので次へ！

---

## 1. sleep を作る（まずはテスト）🧪

## ✅ 1-1. テストを書く（フェイクタイマーで“一瞬”にする）⏱️💨

```ts
// tests/sleep.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sleep, AbortError } from '../src/sleep'

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('指定ms後にresolveする（待たない）', async () => {
    const p = sleep(1000)

    await vi.advanceTimersByTimeAsync(999)
    let done = false
    p.then(() => { done = true })
    await Promise.resolve()
    expect(done).toBe(false)

    await vi.advanceTimersByTimeAsync(1)
    await expect(p).resolves.toBeUndefined()
  })

  it('AbortSignalで中断できる', async () => {
    const ac = new AbortController()
    const p = sleep(1000, ac.signal)

    ac.abort()

    await expect(p).rejects.toMatchObject({ name: 'AbortError' })
  })
})
```

ポイント👇

* `vi.useFakeTimers()` でタイマーをフェイクにして、`advanceTimersByTimeAsync` で時間だけ進めます([vitest.dev][1])
* だから**本当に待たない**のに、時間依存の挙動を確認できます😆✨

## ✅ 1-2. 実装（最小でOK）🧸

```ts
// src/sleep.ts
export class AbortError extends Error {
  override name = 'AbortError'
  constructor(message = 'Aborted') {
    super(message)
  }
}

export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new AbortError())
      return
    }

    const id = setTimeout(() => {
      cleanup()
      resolve()
    }, ms)

    const onAbort = () => {
      clearTimeout(id)
      cleanup()
      reject(new AbortError())
    }

    const cleanup = () => {
      signal?.removeEventListener('abort', onAbort)
    }

    signal?.addEventListener('abort', onAbort, { once: true })
  })
}
```

---

## 2. retry をTDDで作る（本題）🔁🔥

## ✅ 2-1. 仕様（この章の“約束”）📌

* まず `op()` を1回やる（最初は待たない）([AWS ドキュメント][3])
* 失敗したら **最大N回まで**リトライする（上限）([AWS ドキュメント][4])
* 待ち時間は **指数バックオフ**（例：100ms, 200ms, 400ms…）＋必要ならジッター ([Google Cloud Documentation][2])
* リトライするかどうかは `shouldRetry(err)` で決められる（全部はリトライしない）([Google Cloud Documentation][2])

---

## ✅ 2-2. まず「時間なし」でロジックをテストする（最強）💪✨

ここ、超大事！
**リトライの核（待ち時間計算/回数/判定）**は、フェイクタイマーすら不要にできます😳

### テスト（sleepをスタブにして “待ち時間” を記録する）📝

```ts
// tests/retry.core.test.ts
import { describe, it, expect, vi } from 'vitest'
import { retry } from '../src/retry'

describe('retry (core)', () => {
  it('失敗が続くと指数バックオフで待つ（sleepに渡るmsを検証）', async () => {
    const op = vi.fn()
      .mockRejectedValueOnce(new Error('tmp1'))
      .mockRejectedValueOnce(new Error('tmp2'))
      .mockResolvedValueOnce('ok')

    const delays: number[] = []
    const sleep = vi.fn(async (ms: number) => {
      delays.push(ms)
    })

    const result = await retry(op, {
      maxAttempts: 3,
      baseDelayMs: 100,
      maxDelayMs: 10_000,
      jitter: 'none',
      shouldRetry: () => true,
    }, { sleep, random: () => 0.5 })

    expect(result).toBe('ok')
    expect(op).toHaveBeenCalledTimes(3)
    expect(delays).toEqual([100, 200])
  })
})
```

このやり方の良さ👇

* **タイマー関係ゼロ**で一瞬で終わる💨
* 「遅延の計算」っていう**仕様のど真ん中**を直接固定できる📌✨

---

## ✅ 2-3. 次に「本当にタイマーを使う形」も1本だけ確認（統合寄り）⏱️

“sleepが setTimeout を使っても”ちゃんと動く？を1本だけテストします🧪

```ts
// tests/retry.integration.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { retry } from '../src/retry'
import { sleep } from '../src/sleep'

describe('retry (integration with fake timers)', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('2回失敗→3回目成功（待たずに進む）', async () => {
    const op = vi.fn()
      .mockRejectedValueOnce(new Error('tmp1'))
      .mockRejectedValueOnce(new Error('tmp2'))
      .mockResolvedValueOnce('ok')

    const p = retry(op, {
      maxAttempts: 3,
      baseDelayMs: 100,
      maxDelayMs: 10_000,
      jitter: 'none',
      shouldRetry: () => true,
    }, { sleep, random: () => 0.5 })

    expect(op).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(100)
    expect(op).toHaveBeenCalledTimes(2)

    await vi.advanceTimersByTimeAsync(200)
    expect(op).toHaveBeenCalledTimes(3)

    await expect(p).resolves.toBe('ok')
  })
})
```

ここで使ってる `advanceTimersByTimeAsync` は、フェイク時間を進めるための手段です([vitest.dev][1])
だから**待ちゼロ**で、リトライの時間依存を検証できます😆✨

---

## ✅ 2-4. 実装（retry本体）🧩

```ts
// src/retry.ts
export type RetryOptions = {
  maxAttempts: number
  baseDelayMs: number
  maxDelayMs: number
  jitter: 'none' | 'full'
  shouldRetry?: (err: unknown) => boolean
  signal?: AbortSignal
}

type Deps = {
  sleep?: (ms: number, signal?: AbortSignal) => Promise<void>
  random?: () => number
}

export async function retry<T>(
  op: (attempt: number) => Promise<T>,
  opts: RetryOptions,
  deps: Deps = {},
): Promise<T> {
  const shouldRetry = opts.shouldRetry ?? (() => true)
  const sleep = deps.sleep ?? (async () => {})
  const random = deps.random ?? Math.random

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    if (opts.signal?.aborted) {
      throw Object.assign(new Error('Aborted'), { name: 'AbortError' })
    }

    try {
      // 1回目は待たずに実行（retryだけ遅らせる）💨
      return await op(attempt)
    } catch (err) {
      const isLast = attempt === opts.maxAttempts
      if (isLast || !shouldRetry(err)) throw err

      const exp = opts.baseDelayMs * Math.pow(2, attempt - 1)
      const capped = Math.min(exp, opts.maxDelayMs)
      const delay = opts.jitter === 'full' ? Math.floor(random() * capped) : capped

      await sleep(delay, opts.signal)
    }
  }

  // ここには普通来ないけど保険🧸
  throw new Error('retry: unreachable')
}
```

---

## 🤖 AIの使い方（この章での“勝ちパ”）🧠🤖✨

AIにはこう頼むと強いです👇

* 「この `retry` の仕様、Given/When/Thenでテストケース10個出して。**“リトライすべきでない例”も入れて**」
* 「ジッターを入れたときに、テストが不安定にならない設計案を3つ出して」
* 「`shouldRetry` の典型（ネットワーク・タイムアウト・バリデーション失敗など）を分類して」

ただし最後は必ず自分で「それ、仕様として採用する？」を決めてね😌🧪

---

## ✅ チェック（できたら合格）🎉

* [ ] テストが **待ち時間ゼロ**で終わる（sleepしない）⏱️💨
* [ ] リトライ回数、待ち時間（100→200→…）が **テストで固定**されてる📌
* [ ] `shouldRetry` で「リトライしない」ケースが書けてる🙅‍♀️
* [ ] フェイクタイマーを使った統合テストが **1本だけ**ある🧪
* [ ] `vi.useRealTimers()` で後片付けしてる🧹 ([vitest.dev][1])

---

## ⚠️ よくある落とし穴（先に潰す）💣

* `vi.useFakeTimers()` 中は `Date` も影響するので、日付依存が混ざると想定外が起きることがあります（必要なら `vi.setSystemTime`）([vitest.dev][1])
* `process.nextTick` / `queueMicrotask` は自動ではフェイクにならないので、必要なら `toFake` を指定します([vitest.dev][1])
* `--pool=forks`（child_process）では `nextTick` のモックが非推奨でハング要因になり得ます（threadsならOK）([vitest.dev][1])
* `vi.waitFor` はフェイクタイマー使用時、毎回 `advanceTimersByTime(interval)` を自動で進めます（便利だけど、意図を分かって使う）([vitest.dev][1])

---

## 🌟 追加課題（余裕があったら）🎀

* `maxTotalDelayMs`（合計待ち時間の上限）を追加して、長すぎるリトライを止める🛑 ([Amazon Web Services, Inc.][5])
* ジッターを `full` だけじゃなく `equal` / `decorrelated` みたいに増やして比較する（設計の練習）📐 ([Amazon Web Services, Inc.][6])
* `shouldRetry` を「エラー型で分類」して、リトライ対象を明確化（事故減る）🧯 ([Google Cloud Documentation][2])

---

次の章（第48章：乱数の固定🎲🚫）に行くと、**ジッターやランダム要素を“安定テスト”に落とす技**がさらに効いてきますよ〜😆✨

[1]: https://vitest.dev/api/vi.html "Vi | Vitest"
[2]: https://docs.cloud.google.com/storage/docs/retry-strategy?utm_source=chatgpt.com "Retry strategy | Cloud Storage"
[3]: https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html?utm_source=chatgpt.com "Retry behavior - AWS SDKs and Tools"
[4]: https://docs.aws.amazon.com/ja_jp/wellarchitected/latest/reliability-pillar/rel_mitigate_interaction_failure_limit_retries.html?utm_source=chatgpt.com "REL05-BP03 再試行呼び出しを制御および制限する"
[5]: https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/?utm_source=chatgpt.com "Timeouts, retries and backoff with jitter"
[6]: https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/?utm_source=chatgpt.com "Exponential Backoff And Jitter | AWS Architecture Blog"
