# CQS TS Image Generation Plan

## Common Settings

- **Style**: Modern Flat Vector / Clean Line Art
- **Vibe**: Professional, Educational, Tech-friendly, "Absolute Promise"
- **Colors**: Trustworthy Blue, Safety Green, Warning Red, Clean White/Grey
- **Target Audience**: Japanese Developers (Learners)
- **Text Rule**: English for Code/Tech terms, Japanese for Labels/Speech
- **Aspect Ratio**: 16:9 (Landscape)

## Generation List

### Chapter 1: Introduction to CQS
* **File**: `cqs_ts_study_001_concept.png`
* **Section**: ## 3. いちばん大事：CQSの一文ルール📝💖
* **Prompt**: A conceptual illustration of CQS Separation. Left side: A blue box labeled "Query" with a magnifying glass icon, emitting soft light, labeled "読むだけ" (Read Only). Right side: A red/orange box labeled "Command" with a wrench or gear icon, showing action lines, labeled "変える" (Change). The two boxes are clearly distinct and not touching. Style: Modern flat vector, clean line art, educational.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_001_trap.png`
* **Section**: ## 3. ありがちな “ひっかけポイント”
* **Prompt**: A conceptual illustration of a "Side Effect Trap". A person peacefully reading a book (Reading = Query) triggers a hidden trap (a net falls or a bell rings). The book is connected by a tripwire to the trap. Label "読むだけのはずが..." (Supposed to just read...). Style: Modern flat vector, warning/caution theme.
* **Status**: [ ] Unprocessed

### Chapter 2: The Accident of Mixed Functions
* **File**: `cqs_ts_study_002_mixed_chaos.png`
* **Section**: ## 3. 事故①：表示したいだけなのに…増える😱🪄
* **Prompt**: A chaotic illustration of a "Mixed Function". A user presses a simple button labeled "Show List", but this action triggers multiple unexpected explosions: "Save to DB", "Send Log", "Update Counter". A developer character looks shocked. Wires are tangled. Style: Modern flat vector, warning colors (red/yellow), dynamic and chaotic.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_002_hairsalon_accident.png`
* **Section**: ## 3. 事故①：表示したいだけなのに…増える😱🪄
* **Prompt**: A humorous illustration of a hair salon. A customer asks "Just a trim, please" (Query). The barber (Command) cuts the hair but also dyes it green and gives a perm without asking. The customer looks horrified. Label "余計なことをする" (Doing too much). Style: Modern flat vector, funny but educational.
* **Status**: [ ] Unprocessed

### Chapter 3: Basic CQS Rules
* **File**: `cqs_ts_study_003_separation.png`
* **Section**: ## 4. 正しい分け方：Command と Query を分離する✂️✨
* **Prompt**: An illustration of separation. A large pair of scissors cutting a tangled knot labeled "Mixed" into two neat threads. Top thread is blue, straight, labeled "Query". Bottom thread is orange, straight, labeled "Command". The background changes from messy grey to clean white. Style: Modern flat vector, clean lines, metaphor of organization.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_003_three_rules_checklist.png`
* **Section**: ## 2. 超初心者向けCQSルールは「3行」でOK📝✨
* **Prompt**: A clipboard with a checklist of 3 big items. Item 1: "Command or Query" (Select one). Item 2: "No Side Effects in Query" (Clean). Item 3: "Check State Change" (Decision). A big green pencil is checking them off. Style: Modern flat vector, clean and educational.
* **Status**: [ ] Unprocessed

### Chapter 4: TypeScript Return Types
* **File**: `cqs_ts_study_004_return_types.png`
* **Section**: ## 1) まず結論：戻り値はこう決める！🎯✨
* **Prompt**: A 2x2 grid guide for TypeScript return types. Top row "Sync", Bottom row "Async". Left column "Query" (Blue, Magnifying Glass) shows returns "T" and "Promise<T>". Right column "Command" (Orange, Wrench) shows returns "void" and "Promise<void>". Icons represent the types (Box for T, Empty circle for void). Style: Modern flat vector, infographic chart, clean typography.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_004_void_trap.png`
* **Section**: ## 4) 超だいじ：`void` の“挙動”の落とし穴👀💣
* **Prompt**: A visual metaphor of a "Black Hole" or "Trash Can" labeled "Void Context". A function is handing over a "Return Value" (a gift box), but it falls into the void/trash and disappears. The caller ignores it completely. Label "返しても無視される" (Returned but ignored). Style: Modern flat vector, abstract concept.
* **Status**: [ ] Unprocessed

### Chapter 5: Spaghetti Code Example
* **File**: `cqs_ts_study_005_spaghetti_monster.png`
* **Section**: ## 5-6. この章で“わざと混ぜた”ポイント（CQS的にツラいやつ😇💥）
* **Prompt**: A illustration of a "Spaghetti Code Monster". A blob-like creature made of tangled wires labeled "UI", "Logic", "DB", "Log". It is holding a sign "addTodoAndRenderHtml". It looks heavy and confusing. A developer is trying to unravel one wire but pulling it tightens the others. Style: Modern flat vector, slightly humorous but warning vibe.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_005_bad_mix.png`
* **Section**: ## 5-6. この章で“わざと混ぜた”ポイント（CQS的にツラいやつ😇💥）
* **Prompt**: A "Bad Chemistry" experiment illustration. A beaker labeled "UI Logic" is poured into a beaker labeled "Business Logic", causing a messy explosion or murky color. Key labels: "Rendering", "Saving", "Computing" all swirling together. Label "混ぜるな危険" (Danger: Do not mix). Style: Modern flat vector, science warning theme.
* **Status**: [ ] Unprocessed

### Chapter 6: Classification Game
* **File**: `cqs_ts_study_006_judgment_scale.png`
* **Section**: ## 2. 迷わないためのミニ基準（3秒チェック）⏱️🧠
* **Prompt**: A balance scale illustrating the judgment criteria. On the left scale "Command" (Heavy), items like "DB Save", "Log", "UI Update" are piled up. On the right scale "Query" (Light), items like "Read", "Calc", "Validate" are floating. The scale tips towards Command if any side effect is present. Label "副作用＝重い" (Side effects are heavy). Style: Modern flat vector, clean geometric shapes.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_006_wolf_in_sheep.png`
* **Section**: ## 3. ありがちな“ひっかけポイント”3つ🧨😵‍💫
* **Prompt**: A classic metaphor of "Wolf in Sheep's Clothing". A scary wolf (Command/Side Effect) is wearing a fluffy sheep costume (Query/Read Only). The wolf's tail or claws are poking out. Label "QueryのふりをしたCommand" (Command pretending to be Query). Style: Modern flat vector, metaphor.
* **Status**: [ ] Unprocessed

### Chapter 7: Refactoring Step 1
* **File**: `cqs_ts_study_007_refactoring_flow.png`
* **Section**: ## 3) 分け方のコツは“3色ペン”🖍️✨
* **Prompt**: A process illustration of sorting. A messy pile of colored blocks is being sorted into three distinct bins. Bin 1: "Command" (Orange/Red, Wrench). Bin 2: "Query" (Blue, Book). Bin 3: "UI" (Green, Screen). A hand holding a 3-color pen is ticking off items. Style: Modern flat vector, organizational theme.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_007_relay_race.png`
* **Section**: ## 5) UI側は「CommandしてからQueryする」だけにする🔁💕
* **Prompt**: A relay race box diagram. First runner "Button" passes baton to "Command". "Command" runs, then passes baton to "Query". "Query" runs to the finish line "Render". It is a clear sequential flow, not a tangled mess. Label "Command → Queryリレー" (Command to Query Relay). Style: Modern flat vector, flow diagram.
* **Status**: [ ] Unprocessed

### Chapter 8: Boundaries (UI vs Logic)
* **File**: `cqs_ts_study_008_boundary_wall.png`
* **Section**: ## 4) “境界”の合言葉：依存の向きは一方通行➡️🧭
* **Prompt**: An architectural illustration of a boundary wall. On the left "UI Layer" (chaotic, colorful), on the right "Core Layer" (clean, white/blue). A strong wall separates them. Arrows pass through specific "Ports" (Doors) from UI to Core only. NO arrows go from Core to UI. Core looks protected and pure. Style: Modern flat vector, system architecture diagram.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_008_one_way_street.png`
* **Section**: ## 9) “境界”ができたかチェックするコツ👀✅
* **Prompt**: A road traffic illustration. A wide road goes from "UI City" to "Logic Town". A big "One Way" arrow points to Logic. A "Do Not Enter" sign blocks traffic trying to go back from Logic to UI. Style: Modern flat vector, traffic signs metaphor.
* **Status**: [ ] Unprocessed

### Chapter 9: Query Side Effects
* **File**: `cqs_ts_study_009_hidden_traps.png`
* **Section**: ## 2. 隠れ副作用チェックリスト👀🧾✨
* **Prompt**: A detective inspection illustration. A magnifying glass examines a seemingly clean blue box labeled "Query". Inside the lens, hidden red bugs are revealed: "Date.now()", "Math.random()", "sort()". The detective looks cautious. Label "隠れ副作用" (Hidden Side Effects). Style: Modern flat vector, investigation theme.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_009_injecting_time.png`
* **Section**: ## 3. 「副作用ゼロQuery」を作る3つの型🧩✨
* **Prompt**: An illustration of Dependency Injection logic. A syringe labeled "Date.now()" is injecting a timestamp into a function bubble from the OUTSIDE. The function bubble is clean and transparent. Inside, the function uses the injected time. Label "時間を注入" (Injecting Time). Style: Modern flat vector, medical/science metaphor.
* **Status**: [ ] Unprocessed

### Chapter 10: Command Return Values
* **File**: `cqs_ts_study_010_receipt_return.png`
* **Section**: ## 5) 「Commandは何を返してもいい？」の答え🎁✨
* **Prompt**: A metaphor of a store Checkout. A customer (Caller) gives an order (Command). THe clerk (Function) hands back a very small slip of paper (Receipt) labeled "ID: 123" or "OK". The clerk does NOT hand back the entire product inventory. Label "レシートだけ返す" (Return only receipt). Style: Modern flat vector, retail metaphor.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_010_dangerous_return.png`
* **Section**: ## 3) Commandが「返すと危険」なもの🐘⚠️（返しすぎあるある）
* **Prompt**: A delivery truck (Command) overloaded with unnecessary items: "Entire List", "Formatted HTML", "User History". The truck is tipping over or struggling to move. Label "返しすぎCommand" (Overloaded Command). Style: Modern flat vector, humorous transportation metaphor.
* **Status**: [ ] Unprocessed

### Chapter 11: Async CQS Loop
* **File**: `cqs_ts_study_011_gatekeeper.png`
* **Section**: ## 11-3. fetch の最小セット（これだけ覚えよ）🧩✨
* **Prompt**: An illustration of a security checkpoint. A data packet arrives at a gate. A guard labeled "res.ok" checks its ID. If valid (Green tick), it passes to the "JSON" conversion room. If invalid (Red cross), it is rejected immediately. Style: Modern flat vector, security/process metaphor.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_011_async_loop.png`
* **Section**: ## 11-5. UIから呼ぶときの「CQS黄金パターン」🏆✨
* **Prompt**: A cyclical flow diagram. Step 1: "Command" (Orange arrow) goes to Server. Step 2: "Wait" (Hourglass). Step 3: "Query" (Blue arrow) requests fresh data. Step 4: "Update UI" (Green screen). The cycle is smooth and continuous. Label "黄金パターン" (Golden Pattern). Style: Modern flat vector, flow chart.
* **Status**: [ ] Unprocessed

### Chapter 12: Caching Query
* **File**: `cqs_ts_study_012_cache_jar.png`
* **Section**: ## 12-1. キャッシュってなに？🍯（ふわっとでOK）
* **Prompt**: An illustration of a "Cache Jar". A transparent glass jar labeled "Cache" is filled with golden "Result" coins. A hand takes a coin from the jar instantly without waiting for the factory (Server) in the background. The factory is far away. Style: Modern flat vector, efficiency metaphor.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_012_fire_sprinkler.png`
* **Section**: ## 12-7. Command が走ったら、キャッシュはどうするの？🔁⚠️
* **Prompt**: A dynamic illustration of a fire sprinkler system. A sensor labeled "Command" detects heat/smoke (Change). It triggers the sprinkler labeled "Invalidate" to spray water, washing away the old data on the floor. Label "Commandでキャッシュを洗い流す" (Wash away cache with Command). Style: Modern flat vector, action oriented.
* **Status**: [ ] Unprocessed

### Chapter 13: Query Testing
* **File**: `cqs_ts_study_013_test_bench.png`
* **Section**: ## 2) なんでQueryはテストが簡単なの？🧠💡
* **Prompt**: A simple, clean laboratory test bench. On the left, "Input" (Ingredients). In the middle, "Query" (Transparent mixing bowl). On the right, "Output" (Cake). No external pipes or wires connected to the bowl. It looks isolated and pure. Label "入力と出力だけ" (Input and Output only). Style: Modern flat vector, science/lab theme.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_013_testing_accidents.png`
* **Section**: ## 7) よくある “Queryのつもり副作用” 事故🚨😱（テストで見抜こう）
* **Prompt**: A lineup of three "Wanted" villains. Villain 1: "Date.now()" (Clock face). Villain 2: "Math.random()" (Dice). Villain 3: "Side Effect" (Bomb). They are holding "Guilty" signs. A detective passes by. Label "テストの敵" (Enemies of Testing). Style: Modern flat vector, wanted poster theme.
* **Status**: [ ] Unprocessed

### Chapter 14: Command Testing (Mocking)
* **File**: `cqs_ts_study_014_mock_injection.png`
* **Section**: ## 3) 作戦：副作用を外へ追い出す3ステップ🚚✨
* **Prompt**: An illustration of dependency injection. A robot (Command) has a slot for a battery. A hand inserts a "Fake Battery" (Mock) for testing. The real "Heavy Battery" (DB/Network) is set aside. The robot works perfectly with the fake battery. Label "依存を差し替える" (Swap dependencies). Style: Modern flat vector, robotics/engineering theme.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_014_plug_socket.png`
* **Section**: ## 6) 依存関係ルール（Dependency Rule）を超ざっくり🍩✨
* **Prompt**: A detailed close-up of a plug and socket. The Wall Socket is labeled "Port (Interface)". The Plug is labeled "Infrastructure (DB/API)". The Plug fits perfectly into the Socket. Arrows show the dependency direction: Plug depends on Socket. Style: Modern flat vector, technical illustration.
* **Status**: [ ] Unprocessed

### Chapter 15: CQS Summary Map
* **File**: `cqs_ts_study_015_summary_map.png`
* **Section**: ## 15-1. まずは“完成形の型”を1枚で🧩✨（迷子防止）
* **Prompt**: A comprehensive map of CQS Architecture. Center: "Core/Domain" (Pure Logic). Surrounding it: "Application Services" (Command/Query split). Outer ring: "UI/Infrastructure" (Web, DB). Arrows flow INWARDS. Clear distinction between Blue (Query side) and Orange (Command side). Style: Modern flat vector, roadmap/overview map.
* **Status**: [ ] Unprocessed

* **File**: `cqs_ts_study_015_three_failures.png`
* **Section**: ## 15-2. 失敗トップ3😱（症状→原因→直し方）
* **Prompt**: A "Podium of Shame" (1st, 2nd, 3rd place). 1st Place: "Query Updates State" (A book writing in itself). 2nd Place: "Command Returns All" (An overloaded truck). 3rd Place: "Confusing Names" (A question mark). The atmosphere is "Don't do this". Style: Modern flat vector, ranking theme.
* **Status**: [ ] Unprocessed
