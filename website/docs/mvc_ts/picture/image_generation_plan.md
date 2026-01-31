# 画像生成プラン (MVC TS)

このドキュメントは、`mvc_ts` 教材向けの画像生成指示書です。
スタイルガイド (`mvc_ts/picture/style_guide.md`) に従い、各章の抽象的な概念を視覚化します。

---

## 第1章：MVCってなに？（1-3）

### `mvc_ts_study_001_initial_chaos.png`
* **Section**: 2) まず「混ぜる」と何が起きる？
* **Concept**: 全てが1つのファイルに混ざっているカオスな状態（Spaghetti code）。
* **Prompt**:
  A modern flat vector illustration of a tangled ball of yarn labeled 'Code'.
  Inside the knot, items like 'UI', 'Data', and 'Logic' are mixed together messily.
  A developer looks confused and troubled by the tangle.
  Clean lines, flat colors.
  Text labels: "UI", "Data", "Logic" (English).
  Japanese text: "ごちゃ混ぜ" (Mixed up) in a speech bubble.
* **Status**: [x] 済

### `mvc_ts_study_001_mvc_trio.png`
* **Section**: 4) 3人チームで考えると超わかりやすい
* **Concept**: MVCの3役によるチームワーク。Model（台帳係）、View（掲示板係）、Controller（交通整理係）。
* **Prompt**:
  A modern flat vector illustration of three distinct characters working together as a team.
  1. Left: A character holding a thick ledger or book, labeled 'Model'. (Serious look).
  2. Center: A character painting on a canvas or arranging a bulletin board, labeled 'View'. (Creative look).
  3. Right: A character with a whistle or traffic baton, directing flow, labeled 'Controller'. (Active look).
  Clean lines, flat colors, white background.
  Text labels: "Model", "View", "Controller" (English).
* **Status**: [x] 済

## 第2章：開発環境（2-2）

### `mvc_ts_study_002_safety_first.png`
* **Section**: 2-4. ここで“AI相棒”を入れる（使い方のルール）
* **Concept**: 開発者（ヘルメット着用＝安全第一）がロボット（AI）と一緒にコードを見ている。
* **Prompt**:
  A modern flat vector illustration of a developer wearing a safety helmet, shaking hands with a friendly robot (AI).
  Between them is a screen showing code.
  The developer holds a magnifying glass checking the code (Review).
  Clean lines, flat colors.
  Text labels: "Human", "AI" (English).
  Japanese text: "安全第一" (Safety First) on the helmet or nearby.
* **Status**: [x] 済

## 第3章：要件定義（3-3）

### `mvc_ts_study_003_mvp_scope.png`
* **Section**: 8. スコープを切ろう（やらないことリスト）
* **Concept**: たくさんのアイデアから、大事なものだけを抽出するフィルター（漏斗）。MVP（最小機能）に絞り込む様子。
* **Prompt**:
  A modern flat vector illustration of a funnel filtering ideas.
  Many colorful balls labeled 'Login', 'Tags', 'Cloud' enter the top.
  Only three specific balls labeled 'Add', 'List', 'Done' come out of the bottom into a box labeled 'MVP'.
  Clean lines, flat colors.
  Text labels: "MVP" (English).
  Japanese text: "やらないこと" (Not doing) near the filtered-out balls.
* **Status**: [x] 済

### `mvc_ts_study_003_wireframe.png`
* **Section**: 5) 画面要件を整理しよう
* **Concept**: 手描きのワイヤーフレーム。入力欄、追加ボタン、リスト、完了チェックが配置されている。
* **Prompt**:
  A modern flat vector illustration of a simple UI wireframe for a ToDo app.
  Drawn on a whiteboard or paper style.
  Features: Input box, 'Add' button, List items with Checkboxes.
  Clean lines, flat colors.
  Text labels: "Input", "Add", "List", "Done" (English).
  Japanese text: "画面設計" (Screen Design).
* **Status**: [x] 済

### `mvc_ts_study_003_requirement_translation.png`
* **Section**: 9. 要件をMVCに翻訳してみよう（要件を3つに分ける）
* **Concept**: ユーザーストーリーや画面要件を、Model / View / Controller の箱に仕分ける様子。
* **Prompt**:
  A modern flat vector illustration of sorting requirements into three boxes labeled 'Model', 'View', 'Controller'.
  Items like 'Data' and 'Rule' go to Model.
  Items like 'Screen' and 'Input' go to View.
  Items like 'Events' go to Controller.
  Clean lines, flat colors.
  Text labels: "Model", "View", "Controller" (English).
* **Status**: [x] 済

## 第4章：Model入門① Types（4-3）

### `mvc_ts_study_004_branded_types.png`
* **Section**: 4) “無効な状態”を作らないコツ（名札をつける）
* **Concept**: ただの文字列に「特別な名札」をつけて、他の文字列と区別する（Branded Types）。
* **Prompt**:
  A modern flat vector illustration of two identical-looking boxes (representing String).
  One box is plain.
  The other box has a shiny, distinct badge or tag attached to it labeled 'TodoId'.
  A shield protects the badged box.
  Clean lines, flat colors.
  Text labels: "String", "TodoId" (English).
  Japanese text: "名札" (Name tag).
* **Status**: [x] 済

## 第5章：View入門① Render（5-3）

### `mvc_ts_study_005_one_way_render.png`
* **Section**: 3) “良いView”の形：render(state)パターン
* **Concept**: 一方通行のデータフロー。Modelからデータが来て、Viewがそれを画面（DOM）にする。Viewから逆流してデータを変えるパイプはない。
* **Prompt**:
  A modern flat vector illustration of a one-way production machine.
  Input conveyor belt carries 'Data' (Todo items).
  The machine (View) processes it by painting.
  Output conveyor belt produces 'DOM' (Screen interface).
  A clear "No Entry" sign prevents flow backwards from DOM to Data.
  Clean lines, flat colors.
  Text labels: "Data", "View", "DOM" (English).
* **Status**: [x] 済

### `mvc_ts_study_005_ui_layouts.png`
* **Section**: 4) 見やすいHTML構造案 3つ
* **Concept**: 3つのレイアウト案（Simple, Card, Table）を比較する図。
* **Prompt**:
  A modern flat vector illustration comparing three UI layout options side by side.
  1. 'Simple' list style.
  2. 'Card' style with boxes.
  3. 'Table' style with grid.
  Clean lines, flat colors.
  Text labels: "Simple", "Card", "Table" (English).
* **Status**: [x] 済

### `mvc_ts_study_005_view_forbidden.png`
* **Section**: 2) Viewに入れちゃダメなものリスト
* **Concept**: Viewキャラクターが、ロジックや保存処理（Logic, Save, Rule）を「NG！」と拒否している。表示（Display）だけ受け取る。
* **Prompt**:
  A modern flat vector illustration of a 'View' character holding up a cross sign (X) to stop items labeled 'Logic', 'Save', 'Rule'.
  Only 'Display' items are accepted warmly.
  Clean lines, flat colors.
  Text labels: "View", "Logic", "Save", "Rule", "Display" (English).
* **Status**: [x] 済

## 第6章：Controller入門① Traffic（6-3）

### `mvc_ts_study_006_traffic_control.png`
* **Section**: 3) Controller：交通整理係（今日の主役）
* **Concept**: ユーザーの操作（入力）をControllerが受け取り、ModelとViewへそれぞれ指示を出す岐路。
* **Prompt**:
  A modern flat vector illustration of a traffic intersection managed by a Controller character.
  Input cars labeled 'Event' arrive from the left.
  The Controller directs some traffic to a building labeled 'Model' (Update) and other traffic to a screen labeled 'View' (Render).
  Clean lines, flat colors.
  Text labels: "Event", "Controller", "Model", "View" (English).
* **Status**: [x] 済

## 第7章：データフロー（7-3）

### `mvc_ts_study_007_mvc_cycle.png`
* **Section**: 3) 回転イメージ（これが毎回同じ形なら勝ち）
* **Concept**: MVCの循環サイクル。ユーザー→View→Controller→Model→View→ユーザーへ戻る円環。
* **Prompt**:
  A modern flat vector diagram showing a cycle flow.
  1. Top: User clicks.
  2. Right: Controller receives event.
  3. Bottom: Model updates data.
  4. Left: View refreshes display.
  Arrows connect them in a clockwise circle.
  Clean lines, flat colors, minimal style.
  Text labels: "User", "Controller", "Model", "View" (English).
* **Status**: [x] 済

### `mvc_ts_study_007_observer_bell.png`
* **Section**: 4) 実装方針：Store（Model）に subscribe を生やす
* **Concept**: Observerパターンのイメージ。Modelが更新のベル（Notify）を鳴らし、View（Listener）がそれに耳を傾けている。
* **Prompt**:
  A modern flat vector illustration of the Observer pattern.
  A central character 'Model' rings a golden bell labeled 'Notify'.
  A nearby character 'View' with big ears perks up to listen ('Subscribe').
  Connection lines show sound waves traveling from Model to View.
  Clean lines, flat colors.
  Text labels: "Model", "Notify", "View", "Subscribe" (English).
* **Status**: [x] 済

## 第8章：Controller入門② Routing（8-2）

### `mvc_ts_study_008_action_table.png`
* **Section**: 2) 解決アイデア：「操作（Action）」を“名前”で揃えて、表で捌く
* **Concept**: Controllerが「操作一覧表」を見て、どの処理をするか決めている様子。（If文の分岐ではなく、メニュー表から選ぶ感じ）。
* **Prompt**:
  A modern flat vector illustration of a Controller character checking a large menu board or list.
  The board has rows connecting 'Action Name' (like "Add", "Toggle") to 'Handler Function'.
  The character points to "Add" and directs the flow easily.
  Clean lines, flat colors.
  Text labels: "Action", "Handler" (English).
  Japanese text: "操作表" (Operation Table).
* **Status**: [x] 済

### `mvc_ts_study_008_action_cards.png`
* **Section**: 3) まずは「操作（Action）」を型で作る
* **Concept**: 文字列ではなく「型」で区別された操作カード。トランプのように明確に分かれている。
* **Prompt**:
  A modern flat vector illustration of a set of distinct playing cards.
  Each card is labeled with an action: 'Add', 'Toggle', 'Delete'.
  They share a common back pattern labeled 'Action'.
  Clean lines, flat colors.
  Text labels: "Add", "Toggle", "Delete", "Action" (English).
* **Status**: [x] 済

## 第9章：Model入門② Invariants（9-1）

### `mvc_ts_study_009_invariant_shield.png`
* **Section**: 1. 不変条件（Invariant）ってなに？
* **Concept**: Modelが盾（シールド）を持って、不正なデータ（空のタイトル、過去の日付）を弾き返している。
* **Prompt**:
  A modern flat vector illustration of a Model character holding a strong shield.
  Bad data represented as jagged arrows labeled 'Empty', 'Past' try to hit the Model but bounce off the shield.
  Good data (smooth arrows) are allowed in.
  Clean lines, flat colors.
  Text labels: "Model", "Invariant" (English).
  Japanese text: "ルール" (Rule).
* **Status**: [x] 済

### `mvc_ts_study_009_result_pattern.png`
* **Section**: 4-1. Result型（成功 or 失敗）
* **Concept**: 線路の分岐ポイント。成功（OK）ならValue駅へ、失敗（Error）ならError駅へ進むスイッチ。
* **Prompt**:
  A modern flat vector illustration of a railroad switch labeled 'Result'.
  One track leads to a green station labeled 'Success'.
  The other track leads to a red station labeled 'Failure'.
  A cargo train picks one path depending on the switch.
  Clean lines, flat colors.
  Text labels: "Result", "Success", "Failure" (English).
* **Status**: [x] 済

## 第10章：ViewModel（10-3）

### `mvc_ts_study_010_viewmodel_makeup.png`
* **Section**: 3. ViewModelってなに？（一言で）
* **Concept**: 素朴なデータ（Model）が、ドレッサー（ViewModel）を通って、着飾った状態（表示用データ）になって出てくる。
* **Prompt**:
  A modern flat vector illustration of a transformation process.
  A simple gray cube labeled 'Model' enters a room labeled 'ViewModel'.
  It exits as a colorful, decorated cube labeled 'VM', ready for the stage.
  Clean lines, flat colors.
  Text labels: "Model", "ViewModel", "View" (English).
  Japanese text: "おめかし" (Dress up).
* **Status**: [x] 済

### `mvc_ts_study_010_dirty_vs_clean.png`
* **Section**: 2) まず「やっちゃダメ」から知ろう（Model汚染）
* **Concept**: 左側はModelの中に色や文字が混ざって汚い。右側はModelはデータだけでスッキリし、ViewModelが装飾を担当している比較。
* **Prompt**:
  A modern flat vector illustration comparing two approaches.
  Left: A messy box labeled 'Dirty Model' overflowing with 'Data', 'Color', 'Text' mixed together.
  Right: A tidy box labeled 'Clean Model' holding only 'Data', linked to a separate decorative box labeled 'ViewModel' holding 'Color' and 'Text'.
  Clean lines, flat colors.
  Text labels: "Dirty Model", "Clean Model", "ViewModel" (English).
* **Status**: [x] 済

## 第11章：Validation（11-2）

### `mvc_ts_study_011_double_check.png`
* **Section**: 2) バリデーションは「2段階」が勝ち
* **Concept**: 2つのゲート。最初のゲート（View）は形だけチェック。2つ目のゲート（Model）は中身のルールを厳格にチェック。
* **Prompt**:
  A modern flat vector illustration of two security gates.
  Gate 1 (front) is labeled 'View'. It checks shape (circle vs square).
  Gate 2 (back) is labeled 'Model'. It checks detailed rules (color, weight).
  Data passes through both to be accepted.
  Clean lines, flat colors.
  Text labels: "View", "Model" (English).
  Japanese text: "2段構え" (Two stages).
* **Status**: [x] 済

### `mvc_ts_study_011_friendly_error.png`
* **Section**: 5) Viewで「やさしいエラーメッセージ」に変える
* **Concept**: 無機質なエラー表示（ロボット）と、親切な案内（サポートキャラ）の対比。
* **Prompt**:
  A modern flat vector illustration comparing error messages.
  Left: A cold, gray robot screen displaying "INVALID INPUT" (Bad UX).
  Right: A warm, friendly character holding a flower and a sign saying "Let's try again!" (Good UX).
  Clean lines, flat colors.
  Text labels: "Bad UX", "Good UX" (English).
* **Status**: [x] 済

## 第12章：Service層（12-2）

### `mvc_ts_study_012_service_chef.png`
* **Section**: 2) Service層の役割（超だいじ）
* **Concept**: レストランの厨房。Controllerはウェイター（注文受けるだけ）。Serviceはシェフ（料理の手順を知っていて作る）。Modelは食材。
* **Prompt**:
  A modern flat vector illustration of a restaurant kitchen scene.
  A waiter character labeled 'Controller' passes an order ticket to a chef character labeled 'Service'.
  The chef is cooking using ingredients labeled 'Model'.
  Clean lines, flat colors.
  Text labels: "Controller", "Service", "Model" (English).
* **Status**: [x] 済

### `mvc_ts_study_012_responsibility_sorting.png`
* **Section**: 3) どれをServiceに移す？
* **Concept**: 責務の仕分け。ルールはModel箱へ、手順はService箱へ、イベントはController箱へ。
* **Prompt**:
  A modern flat vector illustration of sorting items into three bins.
  Items labeled 'Rule' go to a bin labeled 'Model'.
  Items labeled 'Workflow' go to a bin labeled 'Service'.
  Items labeled 'Event' go to a bin labeled 'Controller'.
  Clean lines, flat colors.
  Text labels: "Model", "Service", "Controller" (English).
* **Status**: [x] 済

## 第13章：永続化① LocalStorage（13-1）

### `mvc_ts_study_013_outside_world.png`
* **Section**: 1. 永続化って、なんで「外部」なの？
* **Concept**: アプリケーションの円（世界）の外側に、Storageという箱がある。Serviceが手を伸ばして出し入れするイメージ。
* **Prompt**:
  A modern flat vector illustration of a clean circle containing 'App'.
  Outside the circle is a storage box labeled 'LocalStorage'.
  A connection line goes from the App core to the storage box.
  Clean lines, flat colors.
  Text labels: "App", "LocalStorage" (English).
  Japanese text: "外部" (Outside).
* **Status**: [x] 済

### `mvc_ts_study_013_blocking_turtle.png`
* **Section**: 2-2. 同期処理（＝重いと固まることある）
* **Concept**: 重い荷物を持ったカメ（同期処理）が道を塞いでいて、後ろの車（UI）が渋滞している。
* **Prompt**:
  A modern flat vector illustration of a slow turtle carrying a heavy box labeled 'Sync' blocking a road.
  Behind it, fast cars labeled 'UI' are stuck in traffic, unable to move.
  Clean lines, flat colors.
  Text labels: "Sync", "UI" (English).
  Japanese text: "渋滞" (Traffic Jam).
* **Status**: [x] 済

## 第14章：永続化② Repository（14-2）

### `mvc_ts_study_014_repository_plug.png`
* **Section**: 2) 今回の完成形の“依存の向き”
* **Concept**: Serviceが「コンセントの形（Interface）」だけを知っている。そこに「具体的なプラグ（Repository実装）」が差し込まれる。
* **Prompt**:
  A modern flat vector illustration of a plug connection.
  Component labeled 'Service' holds a socket/interface labeled 'IRepository'.
  A separate component labeled 'Repo' (implementation) plugs into that socket.
  Clean lines, flat colors.
  Text labels: "Service", "Interface", "Impl" (English).
* **Status**: [x] 済

### `mvc_ts_study_014_contract_scroll.png`
* **Section**: 5) Step1：Repositoryの“契約”を作る
* **Concept**: 契約書ことインターフェイス。ServiceとRepositoryが握手している。
* **Prompt**:
  A modern flat vector illustration of a contract scroll labeled 'Interface'.
  On one side, a character 'Service' signs it.
  On the other side, a character 'Repo' signs it.
  Connecting them with trust.
  Clean lines, flat colors.
  Text labels: "Interface", "Service", "Repo" (English).
* **Status**: [x] 済

## 第15章：DI（15-2）

### `mvc_ts_study_015_assembly_robot.png`
* **Section**: 2) DIってなに？（超ざっくり）
* **Concept**: アプリの起動時（Main）に、ロボットアームが部品（Repository, Service）を組み立ててControllerを作る様子。
* **Prompt**:
  A modern flat vector illustration of a robotic arm assembling parts.
  The arm places a block labeled 'Repo' into 'Service', and then 'Service' into 'Controller'.
  This happens at a station labeled 'Main'.
  Clean lines, flat colors.
  Text labels: "Main", "Repo", "Service", "Controller" (English).
  Japanese text: "組み立て" (Assembly).
* **Status**: [x] 済

### `mvc_ts_study_015_composition_root.png`
* **Section**: 7) Step4：組み立て担当（Composition Root）
* **Concept**: アプリの配線盤（Main）。各部品（Controller, Service, Repository）のケーブルがここに集まって繋がっている。
* **Prompt**:
  A modern flat vector illustration of a main switchboard labeled 'Main'.
  Cables from boxes labeled 'View', 'Controller', 'Service', 'Repo' are all plugged into this central board, lighting up the system.
  Clean lines, flat colors.
  Text labels: "Main", "View", "Ctrl", "Service", "Repo" (English).
* **Status**: [x] 済

## 第16章：テスト（16-2）

### `mvc_ts_study_016_test_scope.png`
* **Section**: 16.1 まず今日のゴール
* **Concept**: ModelとServiceが頑丈なプロテクターで守られている様子。ViewとControllerは外側にある。
* **Prompt**:
  A modern flat vector illustration of a strong shield protecting the core blocks 'Model' and 'Service'.
  Outside the shield, 'View' and 'Controller' are lighter and less protected.
  Clean lines, flat colors.
  Text labels: "Model", "Service", "View", "Controller" (English).
* **Status**: [x] 済

### `mvc_ts_study_016_lab_testing.png`
* **Section**: 16.2 テストって結局なに？
* **Concept**: 実験室のビーカーの中で、Model（ロジック）だけが隔離されてテストされている。外の影響を受けない安全な環境。
* **Prompt**:
  A modern flat vector illustration of a science lab setting.
  Inside a glass beaker or dome, a glowing cube labeled 'Logic' is being examined.
  A checklist labeled 'Test' floats nearby with green checkmarks.
  Clean lines, flat colors.
  Text labels: "Logic", "Test" (English).
  Japanese text: "実験" (Experiment).
* **Status**: [x] 済

## 第17章：総合演習（17-6）

### `mvc_ts_study_017_search_funnel.png`
* **Section**: 17-2 仕上げ機能①：検索
* **Concept**: 検索フィルターの漏斗（じょうご）。たくさんのデータから、条件に合うものだけがViewへ落ちてくる。
* **Prompt**:
  A modern flat vector illustration of a funnel labeled 'Search'.
  A list of items enters the top, and only matching items exit the bottom into a 'View' box.
  Clean lines, flat colors.
  Text labels: "Search", "View" (English).
* **Status**: [x] 済

### `mvc_ts_study_017_full_architecture.png`
* **Section**: Architecture (MVC)
* **Concept**: 完成したMVC + Service + Repository + ViewModelの全体像。整然と並んだブロックが線でつながり、美しい構造体を作っている。
* **Prompt**:
  A modern flat vector diagram of the complete architecture.
  Blocks arranged logically: View -> Controller -> Service -> Model.
  Service also connects to Repository.
  Model connects to ViewModel -> View.
  It looks like a stable, well-built structure.
  Clean lines, flat colors.
  Text labels: "View", "Ctrl", "Service", "Model", "Repo", "VM" (English).
* **Status**: [x] 済
