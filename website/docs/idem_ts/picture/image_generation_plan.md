# Image Generation Plan - idem_ts

## Common Settings
- **Style**: Modern Flat Vector, Clean Line Art, Professional yet Friendly.
- **Visual Style**: Flat colors, uniform bold outlines, 2D vector, clean and sophisticated, tech-friendly.
- **Color Palette**:
  - Main: Indigo (#4B0082), Deep Purple (#673AB7)
  - Accent: Amber (#FFC107), Cyan (#00BCD4)
  - Background: White (#FFFFFF) or Very Light Grey (#F9F9F9)
- **Prompt Template**: [Style description] + [Scene/Concept description] + [Japanese Text instructions].

## Generation List

### Chapter 01: Idempotency Introduction
- **File**: `idem_ts_study_001_concept.png`
- **Section**: `1.1 「同じ操作を何回やっても、同じ結果になる」こと`
- **Prompt**: Modern flat vector illustration showing a large "Equal" sign (=) with two identical gears on both sides. On one side, a hand presses a button multiple times. On the other side, a single perfect box remains unchanged in a "Stable" state. Clean indigo and deep purple color scheme. English text "1 Request" and "Result A" and "N Requests" and "Result A" clearly visible.

### Chapter 02: Why Idempotency?
- **File**: `idem_ts_study_002_network.png`
- **Section**: `2.1 なぜ「冪等性」がいるのか？（答え：ネットワークは壊れるから）`
- **Prompt**: A conceptual flat vector illustration of the "Network Triangle of Failure". Three nodes: Client, Cloud (Network), and Server. A lightning bolt strikes the connection from Server back to Client, labeled "Success but No Response". The Client character looks worried with a "Retry?" thought bubble. Professional and clean line art.

### Chapter 03: Terms Comparison
- **File**: `idem_ts_study_003_terms.png`
- **Section**: `3.5 まとめ表：こんがらがりを整理しよ！📋✨`
- **Prompt**: A clean 2D vector graphic showing three interlocking gears labeled in English: "Idempotent" (Indigo), "Deduplication" (Deep Purple), and "Retry" (Amber). A central Venn diagram style overlapping them to show they work together for reliability. Modern tech aesthetic.

### Chapter 04: Operation Ranking
- **File**: `idem_ts_study_004_ranking.png`
- **Section**: `4.1 判定基準：「ダメージ」と「確率」で決まる💥🔁`
- **Prompt**: A 2D flat vector "Heatmap" or Grid. X-axis: "Retry Likelihood" (Low to High), Y-axis: "Impact of Double Execution" (Small to Huge). A "Payment/Order" icon is in the top-right "Critical" zone (Coral color), while a "Log" icon is in the bottom-left "Low" zone (Grey color). Clean and professional.

### Chapter 05: Mini Order API Map
- **File**: `idem_ts_study_005_api_map.png`
- **Section**: `5.4 ミニ注文APIの仕様（ドラフト）📝✨`
- **Prompt**: A modern flat vector "API Blueprint" showing a mobile app connecting to three server endpoints: "POST /orders" (Create), "GET /orders/{id}" (Read), and "POST /orders/{id}/confirm-payment" (Update). Small icons represent the transition from "Pending" to "Confirmed" status. Indigo and Cyan colors.

### Chapter 06: HTTP Safety & Idempotency
- **File**: `idem_ts_study_006_http_quadrant.png`
- **Section**: `6.5 まとめ：この図だけ脳内に刻もう🧠✨`
- **Prompt**: A clean 2D vector quadrant chart. Horizontal axis: "Safe (Read-only)". Vertical axis: "Idempotent (Effect-only)". Icons for GET (Safe & Idempotent), PUT/DELETE (Idempotent but not Safe), and POST (Neither). Each quadrant has a distinct soft color background.

### Chapter 07: GET/PUT/DELETE Concept
- **File**: `idem_ts_study_007_standard_methods.png`
- **Section**: `7.4 まとめ✅：GET、PUT、DELETEの冪等性`
- **Prompt**: A professional flat vector showing three different hands performing operations. Hand 1 peeks into a box (GET), Hand 2 replaces a box with a new identical one (PUT), and Hand 3 removes a box (DELETE). A green "Idempotent" stamp on each action. Clean lines, Indigo theme.

### Chapter 08: POST Risk Timeline
- **File**: `idem_ts_study_008_post_risk.png`
- **Section**: `8.2 なぜPOSTは「冪等じゃない」の？（二重注文のナゾ）😱`
- **Prompt**: A vertical timeline in flat vector style. Step 1: Client sends "Create Order". Step 2: Server creates Order #101 but response is lost. Step 3: Client retries. Step 4: Server creates Order #102. Bottom shows a "Order List" with two identical orders, and a "Error" exclamation mark.

### Chapter 09: Idempotency Contract
- **File**: `idem_ts_study_009_contract.png`
- **Section**: `9.4 冪等性の「契約（約束）」に含めるべき4要素📜✨`
- **Prompt**: A minimalist 2D vector of a "Service Level Agreement" document. Four major points are highlighted with icons: 1. A Key (Key required), 2. A Clock (TTL), 3. A Shield (Payload check), 4. A Replay icon (Same response). Signed by a "Client" and "Server" hand.

### Chapter 10: Idempotency-Key Flow
- **File**: `idem_ts_study_010_header_flow.png`
- **Section**: `10.4 サーバーはどうやって「同じ」と判断する？🔍🖥️`
- **Prompt**: A modern flat vector sequence diagram. 1. Client sends header "Idempotency-Key: UUID-123". 2. Server checks "Key Store". 3. Server finds "Done" and returns the stored result directly. Clean line art with Indigo and Amber highlights.

### Chapter 11: Client vs Server Gen
- **File**: `idem_ts_study_011_key_gen.png`
- **Section**: `11.4 どっちを選ぶ？決め方のコツ🧭✨`
- **Prompt**: A split-screen flat vector illustration. Left (Recommended): A Client character holds a key labeled "UUID" and sends it to the server. Right: A Server character issues a "Token" back to the client first. A green "Crown" icon above the client side. Professional tech aesthetic.

### Chapter 12: Scope and TTL
- **File**: `idem_ts_study_012_scope_ttl.png`
- **Section**: `12.1 スコープ設計：何を「同じ操作」とみなす？🧩🔍`
- **Prompt**: A conceptual flat vector of a storage box. Inside, records are tagged with "User ID" + "Operation" + "Key". A small digital clock on the side says "Expires in 24h", with a ghost-like icon showing an old record fading away. Indigo and Deep Purple colors.

### Chapter 13: Response Cache Strategy
- **File**: `idem_ts_study_013_cache_replay.png`
- **Section**: `13.3 なぜ“結果を保存”が強いの？💪🔥`
- **Prompt**: A professional 2D vector of a "Response Guard". A server process saves a successful result (JSON) into a gold-colored safe. When a retry request arrives, the server simply pulls the JSON out of the safe and hands it back, bypassing the logic engine. Clean line art.

### Chapter 14: Storage Comparison
- **File**: `idem_ts_study_014_storage_trio.png`
- **Section**: `🧰保存先の候補はこの3つ！それぞれ“向いてる世界”が違うよ🌍✨`
- **Prompt**: A trio of modern flat vector icons. 1. A Brain (Memory: Fast but forgetful), 2. A Fortress (DB: Safe and permanent), 3. A Rocket (Redis: Fast and has a timer). Icons are arranged in a comparison row with clean indigo outlines.

### Chapter 15: Race Condition Illustration
- **File**: `idem_ts_study_015_race_condition.png`
- **Section**: `15.3 典型事故：冪等キーがあっても二重決済！？🔑💳😱`
- **Prompt**: A high-action flat vector of two identical race cars (Requests) speeding side-by-side toward a single narrow finish line (The Logic). Both cars cross the line at the exact same time before the "Close Gate" (Lock) can drop. A small "Double Charge" label in red. Modern and dynamic lines.

### Chapter 16: Unique Constraint Barrier
- **File**: `idem_ts_study_016_db_shield.png`
- **Section**: `1. ユニーク制約ってなに？🧷`
- **Prompt**: A protective blue energy shield (DB Unique Constraint) blocking a second red block from entering a storage slot. The first blue block is already inside. The red block bounces off with a small "Conflict" spark. Clean 2D vector style.

### Chapter 17: Atomic Lock Mechanism
- **File**: `idem_ts_study_017_atomic_lock.png`
- **Section**: `17.4 ロック🔒とAtomic⚡のざっくり定義`
- **Prompt**: A modern flat vector of a digital "Turnstile" or gate. Only one person (Request) can pass at a time. The person who enters grabs a "Processing" ball. The next person in line has a "Wait" bubble. Clean Indigo and Amber colors.

### Chapter 18: Error Classifier
- **File**: `idem_ts_study_018_error_buckets.png`
- **Section**: `18.1 「失敗」はぜんぶ同じじゃない 😵‍💫➡️🧩`
- **Prompt**: A flat vector of a sorting robot. It puts 503 and 429 icons into a "Retry (Green)" bucket, and 400 and 401 icons into a "Fix Design (Red)" bucket. The robot looks calm and efficient. Professional and friendly line art.

### Chapter 19: Saving Error Responses
- **File**: `idem_ts_study_019_error_save.png`
- **Section**: `2) 失敗結果を保存するメリット👍✨`
- **Prompt**: A 2D flat vector showing a "Failed" status report (Red color) being carefully filed away into the same "Idempotency Storage" as the success results. A caption (in thought bubble) says "If they ask again, show this same error". Indigo theme.

### Chapter 20: HTTP Status Symbols
- **File**: `idem_ts_study_020_status_chart.png`
- **Section**: `3) まず覚える「勝ちパターン」ステータスセット🏆✨`
- **Prompt**: A clean infographic style flat vector showing five distinct screens. Each screen has a status code (201, 202, 409, 429, 503) and a matching character emote (Success, Thinking, Conflict, Crowded, Maintenance). Clean and professional.

### Chapter 21: At-Least-Once Delivery
- **File**: `idem_ts_study_021_at_least_once.png`
- **Section**: `21.3 “少なくとも1回配送（At-least-once）”って？🔁📦`
- **Prompt**: A minimalist flat vector showing a "Delivery Van" (Queue) dropping off two identical boxes at a house (Consumer). One box is slightly transparent to show it's a "Duplicate". The House has a "Seen it" checkmark to safely ignore the second box.

### Chapter 22: Outbox Pattern Flow
- **File**: `idem_ts_study_022_outbox_flow.png`
- **Section**: `2. Outboxってなに？（超やさしく）📮`
- **Prompt**: A modern 2D vector of a "Dual Write" station. A character puts a record into the "Main DB" and an identical envelope into a "Local Outbox" in one swift movement. A separate "Postman" character is picking up the envelope to send it to the cloud. Clean line art.

### Chapter 23: Idempotency Testing
- **File**: `idem_ts_study_023_testing.png`
- **Section**: `まず大事：冪等性テストは “回数” と “同時” が命🔥`
- **Prompt**: A professional flat vector showing a test laboratory. A "Testing Robot" is pressing the "Confirm Order" button 10 times rapidly (represented by motion lines). A dashboard monitor shows "Creation Count: 1" and "Status: Pass (Green)". Amber and Indigo palette.

### Chapter 24: Final Checklist Board
- **File**: `idem_ts_study_024_checklist.png`
- **Section**: `24.2 実務チェックリスト（これを埋めると設計が完成する）✅🧩`
- **Prompt**: A large, clean 2D vector whiteboard titled "Idempotency Ready?". Several checkboxes (Key, Storage, Lock, Testing) are all checked. A confident engineer character stands next to it giving a thumbs up. Professional and inspiring tech aesthetic.

## Supplemental Images (Filling Gaps)

### Chapter 12: Request Hashing
- **File**: `idem_ts_study_012_hash_logic.png`
- **Section**: `12.1 スコープ設計：何を「同じ操作」とみなす？🧩🔍` (Bottom)
- **Prompt**: A literal "Meat Grinder" or "Processor" machine in modern flat vector style. On one side, a complex JSON document ("Request Body") enters. On the other side, a short, elegant string of hex characters ("SHA-256 Hash") emerges. The machine is labeled "Deduplication Filter". Indigo and Cyan color scheme.

### Chapter 17: State Transitions
- **File**: `idem_ts_study_017_state_model.png`
- **Section**: `17.6 状態遷移を決めよう（processing/succeeded/failed）🔁📋`
- **Prompt**: A clean 2D vector state transition diagram. Three bubbles: "Processing" (Yellow), "Succeeded" (Green), and "Failed" (Red). Arrows showing transitions with labels like "Success", "Error (Retryable)", and "Error (Fatal)". Clean line art, professional layout.

### Chapter 018: Exponential Backoff + Jitter
- **File**: `idem_ts_study_018_backoff_viz.png`
- **Section**: `ルール1：即リトライは禁止！まず “待つ” ⏳`
- **Prompt**: A professional flat vector graph. The X-axis is "Attempts", Y-axis is "Wait Time". Bars showing wait times doubling (1s, 2s, 4s, 8s). Small "sparkle" or "variation" marks around each bar to represent "Jitter". Indigo and Amber highlights.

### Chapter 019: Error Saving Decision
- **File**: `idem_ts_study_019_decision_tree.png`
- **Section**: `4) 判断の軸（これだけ覚えれば強い）🧠🪄`
- **Prompt**: A clean decision flowchart in flat vector style. Start: "Error Occurred". Diamond 1: "Is it retryable (503/Timeout)?". Diamond 2: "Is it fatal (400/402)?". Paths leading to "Discard & Retry" or "Save & Replay". Logic-focused, professional Indigo theme.

### Chapter 021: Consumer ACK Failure
- **File**: `idem_ts_study_021_ack_retry.png`
- **Section**: `パターンA：処理は成功したのに、ACK（完了通知）が届かなかった📡💥`
- **Prompt**: A modern 2D vector sequence diagram. 1. Broker sends Message. 2. Consumer processes successfully. 3. Consumer tries to send "ACK" back, but a "Red X" appears on the signal. 4. Broker times out and sends the same message again. Very clear and educational.

### Chapter 022: Outbox Detail Sequence
- **File**: `idem_ts_study_022_outbox_seq.png`
- **Section**: `3. 全体像：Outbox方式の“王道フロー”🧩`
- **Prompt**: A tiered professional flat vector diagram. Layer 1: App Logic. Layer 2: DB Transaction (Orders + Outbox). Layer 3: Publisher Polling. Layer 4: Event Bus. Arrows showing the data flow strictly moving from Layer 2 to Layer 4 through the Outbox table. Indigo/Deep Purple.
