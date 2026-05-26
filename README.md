# Chess.JP

ブラウザで遊べるローカル用チェスゲームです。

Server name: Classical-chess.jp

## 起動

`index.html` をブラウザで開きます。

```sh
python3 -m http.server 4173
```

上のコマンドで配信する場合は、`http://localhost:4173` を開いてください。

## 機能

- 合法手のみ選択可能
- 対人戦モード
- Bot戦モード
- Bot難易度: Beginner、Novice、Intermediate、Advanced、Grandmaster
- Bot戦用ELO: 勝つと +15、負けると -10
- Match Online モードとオンライン人数表示
- ローカル保存のオンラインアカウントとOnline ELO
- Board Maker モード: 好きな駒を好きな場所に配置
- Board Maker の保存、読込、保存盤面からの対局開始
- 個人ルールモード
- 日本語/英語の表示切替
- ライトテーマ切替
- 効果音と5種類のBGM設定
- Brilliant / Good / So-So / Bad / Mistake の手評価
- チェック、チェックメイト、ドロー表示
- 昇格選択
- 盤面反転
- 一手戻す
- FEN の表示、コピー、読み込み
- 棋譜と取られた駒の表示

Bot戦モードでは、白がプレイヤー、黒がBotとして自動で指します。
Match Online はデモロビーです。実際のインターネット対戦には WebSocket などのリアルタイムサーバーが必要です。
オンラインアカウントとOnline ELOは現在ブラウザ内に保存されます。実アカウント化にはサーバーとデータベースが必要です。
個人ルールモードでは、キャスリングなし、アンパッサンなし、昇格はクイーンのみを切り替えられます。
手評価は、局面の駒得、チェック、メイト、機動力、相手の強い返しをもとに軽量AIが判定します。
Brilliant はサクリファイスからのメイトや大きな戦術的優位など、かなり強い手だけに出ます。
Mistake は大きく評価を落とす手や、相手に強い勝ち筋を渡す手に出ます。
BGMは No more、Nostalgia music、Calm nostalgia、Candyland、Sunburst から選べます。

ルール判定には `chess.js` を使用しています。
