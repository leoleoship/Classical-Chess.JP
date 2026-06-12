(async () => {
const { Chess } = await import("https://esm.sh/chess.js@1.2.0");

const SUPABASE_URL = "https://dwyoebbskkhayjcutzvb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3eW9lYmJza2toYXlqY3V0enZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTg3ODIsImV4cCI6MjA5NTg3NDc4Mn0.xg_k7Um4WW4zFLj_h5nuwlJoLJMNYLOwi2Yjt2yqsOM";

const game = new Chess();
const board = document.querySelector("#board");
const statusEl = document.querySelector("#status");
const moveList = document.querySelector("#moveList");
const moveCount = document.querySelector("#moveCount");
const moveRating = document.querySelector("#moveRating");
const fenInput = document.querySelector("#fenInput");
const fenForm = document.querySelector("#fenForm");
const fenMessage = document.querySelector("#fenMessage");
const promotionDialog = document.querySelector("#promotionDialog");
const whiteCaptured = document.querySelector("#whiteCaptured");
const blackCaptured = document.querySelector("#blackCaptured");
const celebrationLayer = document.querySelector("#celebrationLayer");
const openingScreen = document.querySelector("#openingScreen");
const loadingScreen = document.querySelector("#loadingScreen");
const loadingPercent = document.querySelector("#loadingPercent");
const loadingMeterFill = document.querySelector("#loadingMeterFill");
const onlineWaitingOverlay = document.querySelector("#onlineWaitingOverlay");
const modeHuman = document.querySelector("#modeHuman");
const modeBot = document.querySelector("#modeBot");
const modeOnline = document.querySelector("#modeOnline");
const modePuzzle = document.querySelector("#modePuzzle");
const modeBuilder = document.querySelector("#modeBuilder");
const modeCustom = document.querySelector("#modeCustom");
const puzzlePanel = document.querySelector("#puzzlePanel");
const puzzleDifficulty = document.querySelector("#puzzleDifficulty");
const puzzlePicker = document.querySelector("#puzzlePicker");
const puzzleProgress = document.querySelector("#puzzleProgress");
const puzzleNumber = document.querySelector("#puzzleNumber");
const puzzleTitle = document.querySelector("#puzzleTitle");
const puzzleObjective = document.querySelector("#puzzleObjective");
const puzzlePrompt = document.querySelector("#puzzlePrompt");
const puzzleMessage = document.querySelector("#puzzleMessage");
const puzzleHint = document.querySelector("#puzzleHint");
const puzzleRestart = document.querySelector("#puzzleRestart");
const puzzleNext = document.querySelector("#puzzleNext");
const customRules = document.querySelector("#customRules");
const builderPanel = document.querySelector("#builderPanel");
const piecePalette = document.querySelector("#piecePalette");
const builderClear = document.querySelector("#builderClear");
const builderLoadCurrent = document.querySelector("#builderLoadCurrent");
const builderBoardName = document.querySelector("#builderBoardName");
const builderSave = document.querySelector("#builderSave");
const savedBoardSelect = document.querySelector("#savedBoardSelect");
const builderLoadSaved = document.querySelector("#builderLoadSaved");
const builderPlay = document.querySelector("#builderPlay");
const builderDelete = document.querySelector("#builderDelete");
const builderMessage = document.querySelector("#builderMessage");
const reloadBoard = document.querySelector("#reloadBoard");
const resignGame = document.querySelector("#resignGame");
const botSettings = document.querySelector("#botSettings");
const onlinePanel = document.querySelector("#onlinePanel");
const onlineCount = document.querySelector("#onlineCount");
const onlineStatus = document.querySelector("#onlineStatus");
const findOnlineMatch = document.querySelector("#findOnlineMatch");
const onlineUsername = document.querySelector("#onlineUsername");
const saveOnlineAccount = document.querySelector("#saveOnlineAccount");
const accountId = document.querySelector("#accountId");
const onlineElo = document.querySelector("#onlineElo");
const demoOnlineWin = document.querySelector("#demoOnlineWin");
const demoOnlineLoss = document.querySelector("#demoOnlineLoss");
const whiteName = document.querySelector("#whiteName");
const blackName = document.querySelector("#blackName");
const botSideSelect = document.querySelector("#botSideSelect");
const difficultySelect = document.querySelector("#difficultySelect");
const eloValue = document.querySelector("#eloValue");
const ruleNoCastle = document.querySelector("#ruleNoCastle");
const ruleNoEnPassant = document.querySelector("#ruleNoEnPassant");
const ruleQueensOnly = document.querySelector("#ruleQueensOnly");
const ruleOneStepSliders = document.querySelector("#ruleOneStepSliders");
const ruleNoPawnDouble = document.querySelector("#ruleNoPawnDouble");
const ruleMandatoryCapture = document.querySelector("#ruleMandatoryCapture");
const ruleNoRepeatPiece = document.querySelector("#ruleNoRepeatPiece");
const languageSelect = document.querySelector("#languageSelect");
const themeSelect = document.querySelector("#themeSelect");
const soundToggle = document.querySelector("#soundToggle");
const musicSelect = document.querySelector("#musicSelect");
const volumeRange = document.querySelector("#volumeRange");

const pieceGlyphs = {
  wp: "♙",
  wn: "♘",
  wb: "♗",
  wr: "♖",
  wq: "♕",
  wk: "♔",
  bp: "♟",
  bn: "♞",
  bb: "♝",
  br: "♜",
  bq: "♛",
  bk: "♚",
};

const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9 };
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
let botColor = "b";

const i18n = {
  ja: {
    actions: "操作",
    account: "アカウント",
    accountId: "Account ID",
    advanced: "Advanced",
    bad: "Bad",
    beginner: "Beginner",
    black: "黒",
    blackCaptured: "黒が取った駒",
    boardRegion: "チェス盤",
    botSide: "自分の色",
    botMode: "Bot戦",
    bgm: "BGM",
    brilliant: "Brilliant",
    builderMode: "盤面作成",
    boardName: "盤面名",
    boardSaved: "盤面を保存しました。",
    builderStatus: "盤面作成: 駒を選んで好きなマスに置けます。",
    cannotPlayBoard: "この盤面は通常チェスとして開始できません。白黒のキングを1つずつ置いて、合法な局面にしてください。",
    brightLight: "明るめ",
    captured: "取られた駒",
    check: "{mode}: {side}番です。チェックされています。",
    checkmate: "チェックメイト。{side}の負けです。",
    classicLight: "クラシック",
    clearBoard: "全消去",
    copyFen: "FENをコピー",
    copiedFen: "FENをコピーしました。",
    customMode: "個人ルール",
    deleteBoard: "削除",
    difficulty: "難易度",
    demoLoss: "デモ敗北 -10",
    demoWin: "デモ勝利 +15",
    draw: "ドローです。",
    elo: "ELO",
    erase: "消す",
    fenError: "FENを読み込めませんでした。",
    flip: "盤面反転",
    forced: "Forced",
    gameInfo: "ゲーム情報",
    gameMode: "対局モード",
    grandmaster: "Grandmaster",
    good: "Good",
    humanMode: "対人戦",
    intermediate: "Intermediate",
    language: "言語",
    light: "ライト",
    load: "読込",
    loadingStatus: "盤面を準備中...",
    loadingTitle: "Chess.JP",
    loadBoard: "読込",
    loadCurrent: "現在の局面",
    mode: "モード",
    mistake: "Mistake",
    moveCount: "{count}手",
    moveRating: "手の評価",
    moves: "棋譜",
    newGame: "新規対局",
    nightLight: "ナイト",
    noCastle: "キャスリングなし",
    noEnPassant: "アンパッサンなし",
    noPawnDouble: "ポーンの2マス移動なし",
    noRepeatPiece: "同じ駒を連続で動かせない",
    novice: "Novice",
    oneStepSliders: "ルークとビショップは1マスだけ",
    mandatoryCapture: "取れる駒があれば必ず取る",
    findMatch: "マッチ検索",
    onlineDemo: "オンラインロビー: 名前を保存してマッチ検索を押してください。",
    onlineElo: "Online ELO",
    onlineFound: "オンライン対戦が見つかりました。あなたは{side}です。",
    onlineJoined: "オンラインロビーに接続しました。",
    onlineLoss: "オンラインELOが10下がりました。",
    onlineMode: "オンライン",
    onlineNow: "オンライン",
    onlineNotReady: "オンライン接続を準備しています...",
    onlineOpponentResigned: "相手が投了しました。あなたの勝ちです。",
    onlineRejoined: "オンライン対戦に戻りました。最新局面を同期しています...",
    onlineSaved: "オンラインアカウントを保存しました。",
    onlineSearching: "対戦相手を探しています...",
    onlineSyncError: "オンライン接続に失敗しました。Supabase設定を確認してください。",
    onlineTurnWait: "相手の手番です。",
    onlineWin: "オンラインELOが15上がりました。",
    puzzleMode: "パズル",
    puzzleNumber: "パズル {number}",
    puzzleObjective: "{side}番。{moves}手でメイト。",
    puzzleProgress: "{solved} / {total}クリア",
    puzzleCorrect: "正解。そのまま続けてください。",
    puzzleHint: "ヒント",
    puzzleHintShown: "動かす駒を盤上で光らせました。",
    puzzleReply: "相手が応手しています...",
    puzzleSolved: "クリア！ チェックメイトです。",
    puzzleWrong: "その手ではありません。局面を戻します。",
    restartPuzzle: "やり直す",
    nextPuzzle: "次のパズル",
    piecePalette: "駒パレット",
    playMusic: "Play Music",
    playWhite: "白で遊ぶ",
    playBlack: "黒で遊ぶ",
    playBoard: "この盤面で遊ぶ",
    promotion: "昇格",
    queensOnly: "昇格はクイーンのみ",
    reloadBoard: "盤面を再読込",
    resign: "投了",
    resigned: "{loser}が投了しました。{winner}の勝ちです。",
    settings: "設定",
    save: "保存",
    saveBoard: "保存",
    savedBoards: "保存盤面",
    soso: "So-So",
    soundFx: "効果音",
    thinking: "{mode}: Botが考えています。",
    title: "Chess.JP",
    turn: "{mode}: {side}番です。",
    undo: "一手戻す",
    volume: "音量",
    white: "白",
    whiteCaptured: "白が取った駒",
  },
  en: {
    actions: "Actions",
    account: "Account",
    accountId: "Account ID",
    advanced: "Advanced",
    bad: "Bad",
    beginner: "Beginner",
    black: "Black",
    blackCaptured: "Black captured",
    boardRegion: "Chess board",
    botSide: "Your side",
    botMode: "Bot",
    bgm: "BGM",
    brilliant: "Brilliant",
    builderMode: "Board Maker",
    boardName: "Board name",
    boardSaved: "Board saved.",
    builderStatus: "Board Maker: choose a piece and place it anywhere.",
    cannotPlayBoard: "This board cannot start as a normal chess game. Add exactly one king for each side and make the position legal.",
    brightLight: "Bright",
    captured: "Captured pieces",
    check: "{mode}: {side} to move. In check.",
    checkmate: "Checkmate. {side} loses.",
    classicLight: "Classic",
    clearBoard: "Clear board",
    copyFen: "Copy FEN",
    copiedFen: "FEN copied.",
    customMode: "Custom",
    deleteBoard: "Delete",
    difficulty: "Difficulty",
    demoLoss: "Demo loss -10",
    demoWin: "Demo win +15",
    draw: "Draw.",
    elo: "ELO",
    erase: "Erase",
    fenError: "Could not load that FEN.",
    flip: "Flip board",
    forced: "Forced",
    gameInfo: "Game info",
    gameMode: "Game mode",
    grandmaster: "Grandmaster",
    good: "Good",
    humanMode: "Human",
    intermediate: "Intermediate",
    language: "Language",
    light: "Light",
    load: "Load",
    loadingStatus: "Preparing the board...",
    loadingTitle: "Chess.JP",
    loadBoard: "Load board",
    loadCurrent: "Load current",
    mode: "Mode",
    mistake: "Mistake",
    moveCount: "{count} moves",
    moveRating: "Move rating",
    moves: "Moves",
    newGame: "New game",
    nightLight: "Night",
    noCastle: "No castling",
    noEnPassant: "No en passant",
    noPawnDouble: "No two-square pawn move",
    noRepeatPiece: "No same piece twice",
    novice: "Novice",
    oneStepSliders: "Rooks and bishops move one square",
    mandatoryCapture: "Captures are mandatory",
    findMatch: "Find match",
    onlineDemo: "Online lobby: save your name, then press Find match.",
    onlineElo: "Online ELO",
    onlineFound: "Online match found. You are {side}.",
    onlineJoined: "Connected to the online lobby.",
    onlineLoss: "Online ELO decreased by 10.",
    onlineMode: "Match Online",
    onlineNow: "Online now",
    onlineNotReady: "Preparing online connection...",
    onlineOpponentResigned: "Opponent resigned. You win.",
    onlineRejoined: "Rejoined your online match. Syncing the latest board...",
    onlineSaved: "Online account saved.",
    onlineSearching: "Searching for an opponent...",
    onlineSyncError: "Online connection failed. Check the Supabase settings.",
    onlineTurnWait: "Waiting for your opponent.",
    onlineWin: "Online ELO increased by 15.",
    puzzleMode: "Puzzles",
    puzzleNumber: "Puzzle {number}",
    puzzleObjective: "{side} to move. Mate in {moves}.",
    puzzleProgress: "{solved} / {total} solved",
    puzzleCorrect: "Correct. Keep going.",
    puzzleHint: "Hint",
    puzzleHintShown: "The piece to move is highlighted on the board.",
    puzzleReply: "Opponent is replying...",
    puzzleSolved: "Solved! Checkmate.",
    puzzleWrong: "That is not the move. Resetting the position.",
    restartPuzzle: "Restart",
    nextPuzzle: "Next puzzle",
    piecePalette: "Piece palette",
    playMusic: "Play Music",
    playWhite: "Play White",
    playBlack: "Play Black",
    playBoard: "Play board",
    promotion: "Promotion",
    queensOnly: "Queen promotion only",
    reloadBoard: "Reload board",
    resign: "Resign",
    resigned: "{loser} resigned. {winner} wins.",
    settings: "Settings",
    save: "Save",
    saveBoard: "Save board",
    savedBoards: "Saved boards",
    soso: "So-So",
    soundFx: "Sound FX",
    thinking: "{mode}: Bot is thinking.",
    title: "Chess.JP",
    turn: "{mode}: {side} to move.",
    undo: "Undo",
    volume: "Volume",
    white: "White",
    whiteCaptured: "White captured",
  },
};

const musicModes = {
  playMusic: {
    notes: [220, 246.94, 277.18, 329.63, 369.99, 440],
    tempo: 2600,
    wave: "triangle",
    attack: 0.22,
    gain: 0.065,
  },
};

const chessPuzzles = [
  { id: "beginner-1", difficulty: "beginner", name: { en: "Back Rank Threat", ja: "バックランクの脅威" }, fen: "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1", line: ["a1a8"] },
  { id: "beginner-2", difficulty: "beginner", name: { en: "Promotion Selection", ja: "昇格の選択" }, fen: "6br/4PpkN/8/4K3/4B3/8/8/7R w - - 0 1", line: ["e7e8n"] },
  { id: "beginner-3", difficulty: "beginner", name: { en: "Rook Blockade", ja: "ルークの封鎖" }, fen: "7k/7p/8/8/1B6/8/8/4K1R1 w - - 0 1", line: ["b4c3"] },
  { id: "beginner-4", difficulty: "beginner", name: { en: "Smothered by Pieces", ja: "駒に囲まれて" }, fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4", line: ["h5f7"] },
  { id: "beginner-5", difficulty: "beginner", name: { en: "What a Fool", ja: "なんて愚かな手" }, fen: "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2", line: ["d8h4"] },
  { id: "beginner-6", difficulty: "beginner", name: { en: "First-rank Finish", ja: "最終ランクの一撃" }, fen: "5k2/3Q1p2/5R2/p5K1/8/8/8/8 w - - 0 1", line: ["d7f7"] },
  { id: "beginner-7", difficulty: "beginner", name: { en: "Diagonal Seal", ja: "斜線の封鎖" }, fen: "K6k/8/8/8/1Q6/8/2Br4/8 w - - 0 1", line: ["b4f8"] },
  { id: "beginner-8", difficulty: "beginner", name: { en: "Rook Lift", ja: "ルークの上昇" }, fen: "6k1/4Q3/8/2p5/R7/K1p5/8/8 w - - 0 1", line: ["a4a8"] },
  { id: "beginner-9", difficulty: "beginner", name: { en: "Queen and Knight", ja: "クイーンとナイト" }, fen: "8/3p4/8/3K2p1/8/4N3/7k/5Q2 w - - 0 1", line: ["f1g2"] },
  { id: "beginner-10", difficulty: "beginner", name: { en: "Back-rank Door", ja: "バックランクの扉" }, fen: "5k2/p1R5/8/6Q1/8/2Kp4/8/8 w - - 0 1", line: ["g5d8"] },

  { id: "novice-1", difficulty: "novice", name: { en: "The Amazing Opera", ja: "驚異のオペラ" }, fen: "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16", line: ["b3b8", "d7b8", "d1d8"] },
  { id: "novice-2", difficulty: "novice", name: { en: "Sacrifice, Lure, and Mate!", ja: "犠牲、誘い、そしてメイト！" }, fen: "5nkr/5N2/4pKBp/8/2n5/8/4r3/6R1 w - - 0 1", line: ["g6h7", "g8h7", "g1g7"] },
  { id: "novice-3", difficulty: "novice", name: { en: "Deflector", ja: "守備駒をそらせ" }, fen: "3qr1k1/5ppp/8/8/8/8/4Q3/4R1K1 w - - 0 1", line: ["e2e8", "d8e8", "e1e8"] },
  { id: "novice-4", difficulty: "novice", name: { en: "Counter Check!", ja: "カウンターチェック！" }, fen: "3qk1r1/1N3p1N/8/8/1B6/8/4B3/4R1K1 w - - 0 1", line: ["e2g4", "d8e7", "e1e7"] },
  { id: "novice-5", difficulty: "novice", name: { en: "Railroad to Victory", ja: "勝利へのレール" }, fen: "1k6/8/8/7Q/8/8/8/4K2R w - - 0 1", line: ["h5f7", "b8c8", "h1h8"] },
  { id: "novice-6", difficulty: "novice", name: { en: "Queen Bridge", ja: "クイーンの橋" }, fen: "8/1k5r/R7/8/1K6/2Q5/8/8 w - - 0 1", line: ["c3c6", "b7b8", "a6a8"] },
  { id: "novice-7", difficulty: "novice", name: { en: "Long Rook Turn", ja: "長いルークの旋回" }, fen: "8/8/8/7R/8/K7/8/1k3B2 w - - 0 1", line: ["h5c5", "b1a1", "c5c1"] },
  { id: "novice-8", difficulty: "novice", name: { en: "Queen Descent", ja: "クイーンの降下" }, fen: "8/1p6/3Q4/8/8/3p1K2/8/4k3 w - - 0 1", line: ["d6d3", "b7b5", "d3e2"] },
  { id: "novice-9", difficulty: "novice", name: { en: "Knight Blockade", ja: "ナイトの封鎖" }, fen: "8/8/1n6/8/1N6/2R2K2/8/7k w - - 0 1", line: ["f3g3", "h1g1", "c3c1"] },
  { id: "novice-10", difficulty: "novice", name: { en: "Rook Shelter", ja: "ルークの隠れ家" }, fen: "4K3/7k/7b/8/7R/8/8/8 w - - 0 1", line: ["e8f7", "h7h8", "h4h6"] },

  { id: "intermediate-1", difficulty: "intermediate", name: { en: "Diagonal Corridor", ja: "対角線の回廊" }, fen: "3b4/3R4/2k5/5Q2/8/8/4K3/8 w - - 4 3", line: ["f5d5", "c6b6", "d7b7", "b6a6", "d5b5"] },
  { id: "intermediate-2", difficulty: "intermediate", name: { en: "Queen Deflection", ja: "クイーンのそらし" }, fen: "8/4k3/1Q6/8/7q/1K6/8/2R5 w - - 0 1", line: ["c1c7", "e7e8", "b6e6", "e8f8", "e6f7"] },
  { id: "intermediate-3", difficulty: "intermediate", name: { en: "Queen Staircase", ja: "クイーンの階段" }, fen: "1k2K3/6Q1/8/8/8/8/8/8 w - - 4 3", line: ["e8d8", "b8a8", "d8c7", "a8a7", "g7a1"] },
  { id: "intermediate-4", difficulty: "intermediate", name: { en: "Inverted Staircase", ja: "反転した階段" }, fen: "8/8/8/8/8/8/6Q1/1k2K3 w - - 4 3", line: ["e1d1", "b1a1", "d1c2", "a1a2", "g2a8"] },
  { id: "intermediate-5", difficulty: "intermediate", name: { en: "Rook Box", ja: "ルークの包囲網" }, fen: "6R1/8/8/8/7K/8/8/7k w - - 4 3", line: ["h4g3", "h1g1", "g8f8", "g1h1", "f8f1"] },
  { id: "intermediate-6", difficulty: "intermediate", name: { en: "Rook Box Reversed", ja: "反転したルーク包囲" }, fen: "7k/8/8/7K/8/8/8/6R1 w - - 4 3", line: ["h5g6", "h8g8", "g1f1", "g8h8", "f1f8"] },
  { id: "intermediate-7", difficulty: "intermediate", name: { en: "Left-Edge Rook", ja: "左端のルーク" }, fen: "1R6/8/8/8/K7/8/8/k7 w - - 4 3", line: ["a4b3", "a1b1", "b8c8", "b1a1", "c8c1"] },
  { id: "intermediate-8", difficulty: "intermediate", name: { en: "Rising Rook", ja: "上昇するルーク" }, fen: "k7/8/8/K7/8/8/8/1R6 w - - 4 3", line: ["a5b6", "a8b8", "b1c1", "b8a8", "c1c8"] },
  { id: "intermediate-9", difficulty: "intermediate", name: { en: "Queen's Return", ja: "クイーンの帰還" }, fen: "3K2k1/1Q6/8/8/8/8/8/8 w - - 4 3", line: ["d8e8", "g8h8", "e8f7", "h8h7", "b7h1"] },
  { id: "intermediate-10", difficulty: "intermediate", name: { en: "Queen's Return Reversed", ja: "反転したクイーンの帰還" }, fen: "8/8/8/8/8/8/1Q6/3K2k1 w - - 4 3", line: ["d1e1", "g1h1", "e1f2", "h1h2", "b2h8"] },

  { id: "advanced-1", difficulty: "advanced", name: { en: "Long Diagonal Chase", ja: "長い対角線の追撃" }, fen: "3b4/5R2/3k4/5Q2/8/8/4K3/8 w - - 2 2", line: ["f7d7", "d6c6", "f5d5", "c6b6", "d7b7", "b6a6", "d5b5"] },
  { id: "advanced-2", difficulty: "advanced", name: { en: "Inverted Diagonal Chase", ja: "反転した対角線の追撃" }, fen: "8/4K3/8/8/5Q2/3k4/5R2/3b4 w - - 2 2", line: ["f2d2", "d3c3", "f4d4", "c3b3", "d2b2", "b3a3", "d4b4"] },
  { id: "advanced-3", difficulty: "advanced", name: { en: "Queen Compass", ja: "クイーンの羅針盤" }, fen: "k4K2/6Q1/8/8/8/8/8/8 w - - 2 2", line: ["f8e8", "a8b8", "e8d8", "b8a8", "d8c7", "a8a7", "g7a1"] },
  { id: "advanced-4", difficulty: "advanced", name: { en: "Southbound Compass", ja: "南向きの羅針盤" }, fen: "8/8/8/8/8/8/6Q1/k4K2 w - - 2 2", line: ["f1e1", "a1b1", "e1d1", "b1a1", "d1c2", "a1a2", "g2a8"] },
  { id: "advanced-5", difficulty: "advanced", name: { en: "Rook Edge Pursuit", ja: "ルークの端追い" }, fen: "6R1/8/8/7K/8/8/7k/8 w - - 2 2", line: ["h5h4", "h2h1", "h4g3", "h1g1", "g8f8", "g1h1", "f8f1"] },
  { id: "advanced-6", difficulty: "advanced", name: { en: "Rook Edge Ascent", ja: "ルークの端上り" }, fen: "8/7k/8/8/7K/8/8/6R1 w - - 2 2", line: ["h4h5", "h7h8", "h5g6", "h8g8", "g1f1", "g8h8", "f1f8"] },
  { id: "advanced-7", difficulty: "advanced", name: { en: "Left-Edge Pursuit", ja: "左端の追撃" }, fen: "1R6/8/8/K7/8/8/k7/8 w - - 2 2", line: ["a5a4", "a2a1", "a4b3", "a1b1", "b8c8", "b1a1", "c8c1"] },
  { id: "advanced-8", difficulty: "advanced", name: { en: "Left-Edge Ascent", ja: "左端の上り" }, fen: "8/k7/8/8/K7/8/8/1R6 w - - 2 2", line: ["a4a5", "a7a8", "a5b6", "a8b8", "b1c1", "b8a8", "c1c8"] },
  { id: "advanced-9", difficulty: "advanced", name: { en: "Queen's Long Return", ja: "クイーンの長い帰還" }, fen: "2K4k/1Q6/8/8/8/8/8/8 w - - 2 2", line: ["c8d8", "h8g8", "d8e8", "g8h8", "e8f7", "h8h7", "b7h1"] },
  { id: "advanced-10", difficulty: "advanced", name: { en: "Queen's Rising Return", ja: "上昇するクイーンの帰還" }, fen: "8/8/8/8/8/8/1Q6/2K4k w - - 2 2", line: ["c1d1", "h1g1", "d1e1", "g1h1", "e1f2", "h1h2", "b2h8"] },

  { id: "grandmaster-1", difficulty: "grandmaster", name: { en: "Rook Clearance Maze", ja: "ルークのクリアランス迷路" }, fen: "3b4/5R2/4k3/8/8/8/4K3/1Q6 w - - 0 1", line: ["b1f5", "e6d6", "f7d7", "d6c6", "f5d5", "c6b6", "d7b7", "b6a6", "d5b5"] },
  { id: "grandmaster-2", difficulty: "grandmaster", name: { en: "Inverted Clearance", ja: "反転したクリアランス" }, fen: "1Q6/4K3/8/8/8/4k3/5R2/3b4 w - - 0 1", line: ["b8f4", "e3d3", "f2d2", "d3c3", "f4d4", "c3b3", "d2b2", "b3a3", "d4b4"] },
  { id: "grandmaster-3", difficulty: "grandmaster", name: { en: "Queen Compass Rotated", ja: "回転したクイーンの羅針盤" }, fen: "7Q/8/8/8/8/8/8/2K3k1 w - - 0 1", line: ["h8b2", "g1f1", "c1d1", "f1g1", "d1e1", "g1h1", "e1f2", "h1h2", "b2h8"] },
  { id: "grandmaster-4", difficulty: "grandmaster", name: { en: "Queen Compass Reversed", ja: "反転したクイーンの羅針盤" }, fen: "Q7/8/8/8/8/8/8/1k3K2 w - - 0 1", line: ["a8g2", "b1c1", "f1e1", "c1b1", "e1d1", "b1a1", "d1c2", "a1a2", "g2a8"] },
  { id: "grandmaster-5", difficulty: "grandmaster", name: { en: "Rook Edge Ascent", ja: "ルークの端上り" }, fen: "8/8/7k/8/7K/8/8/5R2 w - - 0 1", line: ["f1g1", "h6h7", "h4h5", "h7h8", "h5g6", "h8g8", "g1f1", "g8h8", "f1f8"] },
  { id: "grandmaster-6", difficulty: "grandmaster", name: { en: "Queen Compass", ja: "クイーンの羅針盤" }, prompt: { en: "Find the strongest queen move, then coordinate king and queen along the engine's fastest mating route.", ja: "最強のクイーンの一手を見つけ、エンジンが選ぶ最短のメイトルートに沿ってキングとクイーンを連携させよう。" }, fen: "1k3K2/8/8/8/8/8/8/Q7 w - - 0 1", line: ["a1g7", "b8c8", "f8e8", "c8b8", "e8d8", "b8a8", "d8c7", "a8a7", "g7a1"] },
  { id: "grandmaster-7", difficulty: "grandmaster", name: { en: "Rook Edge Pursuit", ja: "ルークの端追い" }, prompt: { en: "Use the rook to control the edge while your king closes the box. Every tempo matters in this exact mate in five.", ja: "ルークで盤端を支配しながらキングで包囲を狭めよう。正確なメイトイン5では、すべてのテンポが重要です。" }, fen: "5R2/8/8/7K/8/7k/8/8 w - - 0 1", line: ["f8g8", "h3h2", "h5h4", "h2h1", "h4g3", "h1g1", "g8f8", "g1h1", "f8f1"] },
  { id: "grandmaster-8", difficulty: "grandmaster", name: { en: "Classic Smothered Mate", ja: "伝統のスマザードメイト" }, prompt: { en: "Begin with the necessary rook sacrifice, drive the king into the corner with the knight, then sacrifice the queen for the classic smothered mate.", ja: "必要なルーク犠牲から始め、ナイトでキングを隅へ追い込み、最後はクイーンを犠牲にして伝統的なスマザードメイトを決めよう。" }, fen: "r6k/4pRpp/8/4N3/2Qp4/8/8/1K6 w - - 0 1", line: ["f7f8", "a8f8", "e5f7", "h8g8", "f7h6", "g8h8", "c4g8", "f8g8", "h6f7"] },
  { id: "grandmaster-9", difficulty: "grandmaster", name: { en: "Mirror Rook Pursuit", ja: "鏡映しのルーク追撃" }, prompt: { en: "Solve the mirrored edge position. Coordinate king and rook precisely so the fifth move is the only mating finish.", ja: "左右反転した盤端の局面を解こう。キングとルークを正確に連携させ、5手目の唯一のメイトを決めよう。" }, fen: "2R5/8/8/K7/8/k7/8/8 w - - 0 1", line: ["c8b8", "a3a2", "a5a4", "a2a1", "a4b3", "a1b1", "b8c8", "b1a1", "c8c1"] },
  { id: "grandmaster-10", difficulty: "grandmaster", name: { en: "Queen's Long Return", ja: "クイーンの長い帰還" }, prompt: { en: "Send the queen across the board and keep tightening the mating net with the most direct king-and-queen moves.", ja: "クイーンを盤の反対側へ送り、最も直接的なキングとクイーンの手でメイトの網を狭めよう。" }, fen: "2K3k1/8/8/8/8/8/8/7Q w - - 0 1", line: ["h1b7", "g8f8", "b7h7", "f8e8", "c8c7", "e8f8", "c7d6", "f8e8", "h7e7"] },
];

const puzzlePolicies = {
  "grandmaster-3": {
    solutions: {
      "7Q/8/8/8/8/8/8/2K3k1 w - -": ["h8b2"],
      "8/8/8/8/8/8/1Q6/2K2k2 w - -": ["b2h2", "c1d1"],
      "8/8/8/8/8/8/7Q/2K1k3 w - -": ["c1c2"],
      "8/8/8/8/8/8/2K4Q/5k2 w - -": ["c2d3"],
      "8/8/8/8/8/3K4/7Q/4k3 w - -": ["h2e2", "h2g1"],
      "8/8/8/8/8/8/1Q6/3K2k1 w - -": ["d1e1"],
      "8/8/8/8/8/8/1Q6/4K2k w - -": ["e1f2"],
      "8/8/8/8/8/8/1Q3K1k/8 w - -": ["b2h8"],
    },
    replies: {
      "8/8/8/8/8/8/1Q6/2K3k1 b - -": "g1f1",
      "8/8/8/8/8/8/7Q/2K2k2 b - -": "f1e1",
      "8/8/8/8/8/8/2K4Q/4k3 b - -": "e1f1",
      "8/8/8/8/8/3K4/7Q/5k2 b - -": "f1e1",
      "8/8/8/8/8/8/1Q6/3K1k2 b - -": "f1g1",
      "8/8/8/8/8/8/1Q6/4K1k1 b - -": "g1h1",
      "8/8/8/8/8/8/1Q3K2/7k b - -": "h1h2",
    },
  },
  "grandmaster-4": {
    solutions: {
      "Q7/8/8/8/8/8/8/1k3K2 w - -": ["a8g2"],
      "8/8/8/8/8/8/6Q1/2k2K2 w - -": ["g2a2", "f1e1"],
      "8/8/8/8/8/8/Q7/3k1K2 w - -": ["f1f2"],
      "8/8/8/8/8/8/Q4K2/2k5 w - -": ["f2e3"],
      "8/8/8/8/8/4K3/Q7/3k4 w - -": ["a2d2", "a2b1"],
      "8/8/8/8/8/8/6Q1/1k2K3 w - -": ["e1d1"],
      "8/8/8/8/8/8/6Q1/k2K4 w - -": ["d1c2"],
      "8/8/8/8/8/8/k1K3Q1/8 w - -": ["g2a8"],
    },
    replies: {
      "8/8/8/8/8/8/6Q1/1k3K2 b - -": "b1c1",
      "8/8/8/8/8/8/Q7/2k2K2 b - -": "c1d1",
      "8/8/8/8/8/8/Q4K2/3k4 b - -": "d1c1",
      "8/8/8/8/8/4K3/Q7/2k5 b - -": "c1d1",
      "8/8/8/8/8/8/6Q1/2k1K3 b - -": "c1b1",
      "8/8/8/8/8/8/6Q1/1k1K4 b - -": "b1a1",
      "8/8/8/8/8/8/2K3Q1/k7 b - -": "a1a2",
    },
  },
  "grandmaster-6": {
    solutions: {
      "1k3K2/8/8/8/8/8/8/Q7 w - -": ["a1g7"],
      "2k2K2/6Q1/8/8/8/8/8/8 w - -": ["f8e8", "g7a7"],
      "1k2K3/6Q1/8/8/8/8/8/8 w - -": ["e8d8"],
      "k2K4/6Q1/8/8/8/8/8/8 w - -": ["d8c7"],
      "8/k1K3Q1/8/8/8/8/8/8 w - -": ["g7a1"],
      "3k1K2/Q7/8/8/8/8/8/8 w - -": ["f8f7"],
      "2k5/Q4K2/8/8/8/8/8/8 w - -": ["f7e6"],
      "3k4/Q7/4K3/8/8/8/8/8 w - -": ["a7b8", "a7d7"],
    },
    replies: {
      "1k3K2/6Q1/8/8/8/8/8/8 b - -": "b8c8",
      "2k1K3/6Q1/8/8/8/8/8/8 b - -": "c8b8",
      "1k1K4/6Q1/8/8/8/8/8/8 b - -": "b8a8",
      "k7/2K3Q1/8/8/8/8/8/8 b - -": "a8a7",
      "2k2K2/Q7/8/8/8/8/8/8 b - -": "c8d8",
      "3k4/Q4K2/8/8/8/8/8/8 b - -": "d8c8",
      "2k5/Q7/4K3/8/8/8/8/8 b - -": "c8d8",
    },
  },
  "grandmaster-10": {
    solutions: {
      "2K3k1/8/8/8/8/8/8/7Q w - -": ["h1b7"],
      "2K2k2/1Q6/8/8/8/8/8/8 w - -": ["c8d8", "b7h7"],
      "3K2k1/1Q6/8/8/8/8/8/8 w - -": ["d8e8"],
      "4K2k/1Q6/8/8/8/8/8/8 w - -": ["e8f7"],
      "8/1Q3K1k/8/8/8/8/8/8 w - -": ["b7h1"],
      "2K1k3/7Q/8/8/8/8/8/8 w - -": ["c8c7"],
      "5k2/2K4Q/8/8/8/8/8/8 w - -": ["c7d6"],
      "4k3/7Q/3K4/8/8/8/8/8 w - -": ["h7g8", "h7e7"],
    },
    replies: {
      "2K3k1/1Q6/8/8/8/8/8/8 b - -": "g8f8",
      "3K1k2/1Q6/8/8/8/8/8/8 b - -": "f8g8",
      "4K1k1/1Q6/8/8/8/8/8/8 b - -": "g8h8",
      "7k/1Q3K2/8/8/8/8/8/8 b - -": "h8h7",
      "2K2k2/7Q/8/8/8/8/8/8 b - -": "f8e8",
      "4k3/2K4Q/8/8/8/8/8/8 b - -": "e8f8",
      "5k2/7Q/3K4/8/8/8/8/8 b - -": "f8e8",
    },
  },
};

const checkmateEffects = [
  "confetti",
  "bomb",
  "balloons",
  "lightning",
  "windburst",
  "shooting-star",
  "sword-king",
  "duel",
];
const checkmatedEffects = ["sad-face", "down-arrows", "crumbling-castles", "pawn-corner"];

let selected = null;
let legalMoves = [];
let flipped = false;
let lastMove = null;
let lastMoveVector = null;
let mode = "human";
let botTimer = null;
let botThinking = false;
let puzzleIndex = 0;
let puzzlePly = 0;
let puzzleThinking = false;
let puzzleSolved = false;
let puzzleTimer = null;
let puzzleHintSquare = null;
let solvedPuzzles = new Set(JSON.parse(localStorage.getItem("chessJpSolvedPuzzlesV10") || "[]"));
let bombExplosionSquare = null;
let bombExplosionTimer = null;
let enPassantBoardSquares = [];
let enPassantBoardTimer = null;
let castleBoardSquares = [];
let castleBoardTimer = null;
let language = "ja";
let latestRating = null;
let audioContext = null;
let masterGain = null;
let musicTimer = null;
let musicNotesPlayed = 0;
let celebrationTimer = null;
let loadingTimer = null;
let loadingHideTimer = null;
let loadingProgress = 0;
let coordinateKey = "";
let savedBoardsDirty = true;
let tacticalMarkersDirty = true;
let selectedBuilderPiece = "wq";
let playerElo = Number(localStorage.getItem("chessTableElo")) || 1200;
let gameSettled = false;
let resignation = null;
let supabaseClient = null;
let lobbyChannel = null;
let matchChannel = null;
let onlinePlayers = 0;
let onlineSearching = false;
let onlineMatch = null;
let onlineMyColor = null;
let onlineSearchNonce = "";
const onlineMatchStorageKey = "chessJpActiveOnlineMatch";
const onlineAccount = JSON.parse(
  localStorage.getItem("chessJpOnlineAccount") ||
    `{"id":"JP-${Math.random().toString(36).slice(2, 8).toUpperCase()}","username":"Guest","elo":1200}`
);
const moveRatings = [];
const captured = { w: [], b: [] };
const builderBoard = {};
const tacticalPins = new Set();
const tacticalSkewers = new Set();
const tacticalSwordLine = new Map();
const plantedSkewerBombs = new Set();
const plantedSkewerBombTimers = new Map();
let savedBuilderBoards = JSON.parse(localStorage.getItem("chessJpSavedBoards") || "[]");

function orientedFiles() {
  return flipped ? [...files].reverse() : files;
}

function orientedRanks() {
  return flipped ? [...ranks].reverse() : ranks;
}

function squareName(fileIndex, rankIndex) {
  return `${orientedFiles()[fileIndex]}${orientedRanks()[rankIndex]}`;
}

function drawCoordinates() {
  const nextCoordinateKey = flipped ? "flipped" : "standard";
  if (coordinateKey === nextCoordinateKey) return;
  document.querySelectorAll(".files").forEach((el) => {
    el.replaceChildren(...orientedFiles().map((file) => label(file)));
  });

  document.querySelectorAll(".ranks").forEach((el) => {
    el.replaceChildren(...orientedRanks().map((rank) => label(rank)));
  });
  coordinateKey = nextCoordinateKey;
}

function label(text) {
  const span = document.createElement("span");
  span.textContent = text;
  return span;
}

function t(key, values = {}) {
  let text = i18n[language][key] || i18n.en[key] || key;
  Object.entries(values).forEach(([name, value]) => {
    text = text.replace(`{${name}}`, value);
  });
  return text;
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.setAttribute("title", t(el.dataset.i18nTitle));
  });
  updateModeUI();
  updateStatus();
  updateMoves();
  updateRatingPanel();
  updateEloDisplay();
  updateOnlineAccountUI();
}

function ratingText(rating) {
  if (!rating) return "-";
  return t(rating.key);
}

function syncDefaultNames() {
  const defaults = {
    en: { black: "Black", white: "White" },
    ja: { black: "黒", white: "白" },
  };
  const defaultValues = ["White", "Black", "白", "黒"];
  if (defaultValues.includes(whiteName.value.trim())) whiteName.value = defaults[language].white;
  if (defaultValues.includes(blackName.value.trim())) blackName.value = defaults[language].black;
}

function updateEloDisplay() {
  eloValue.textContent = String(playerElo);
}

function updateOnlineCount() {
  onlineCount.textContent = String(onlinePlayers);
}

function onlineSideName(color) {
  return t(color === "w" ? "white" : "black");
}

function saveOnlineProfile() {
  localStorage.setItem("chessJpOnlineAccount", JSON.stringify(onlineAccount));
}

function updateOnlineAccountUI() {
  onlineUsername.value = onlineAccount.username;
  accountId.textContent = onlineAccount.id;
  onlineElo.textContent = String(onlineAccount.elo);
}

function adjustOnlineElo(delta) {
  onlineAccount.elo = Math.max(100, onlineAccount.elo + delta);
  saveOnlineProfile();
  updateOnlineAccountUI();
  onlineStatus.textContent = delta > 0 ? t("onlineWin") : t("onlineLoss");
  if (delta > 0) triggerOnlineEloGain(delta);
}

function saveActiveOnlineMatch() {
  if (!onlineMatch || !onlineMyColor) return;
  localStorage.setItem(
    onlineMatchStorageKey,
    JSON.stringify({
      match: onlineMatch,
      color: onlineMyColor,
      fen: game.fen(),
      ply: currentOnlinePly(),
      savedAt: Date.now(),
      status: onlineStatus.textContent,
    }),
  );
}

function clearActiveOnlineMatch() {
  localStorage.removeItem(onlineMatchStorageKey);
}

function plyFromFen(fen) {
  const parts = fen.split(" ");
  const turn = parts[1] || "w";
  const fullmove = Math.max(1, Number(parts[5]) || 1);
  return (fullmove - 1) * 2 + (turn === "b" ? 1 : 0);
}

function currentOnlinePly() {
  return plyFromFen(game.fen());
}

function loadActiveOnlineMatch() {
  try {
    const saved = JSON.parse(localStorage.getItem(onlineMatchStorageKey) || "null");
    if (!saved?.match?.roomId || !saved.color) return null;
    const maxAge = 1000 * 60 * 60 * 8;
    if (Date.now() - Number(saved.savedAt || 0) > maxAge) {
      clearActiveOnlineMatch();
      return null;
    }
    return saved;
  } catch {
    clearActiveOnlineMatch();
    return null;
  }
}

function updateOnlineWaitingOverlay() {
  if (!onlineWaitingOverlay) return;
  onlineWaitingOverlay.hidden = !(mode === "online" && onlineSearching && !onlineMatch);
}

function ownOnlinePayload() {
  return {
    id: onlineAccount.id,
    username: onlineAccount.username || "Guest",
    elo: onlineAccount.elo,
    joinedAt: Date.now(),
  };
}

async function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2.45.4");
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supabaseClient;
}

function updatePresenceCount() {
  if (!lobbyChannel) return;
  const state = lobbyChannel.presenceState();
  const presenceCount = Object.values(state).reduce((total, presences) => total + presences.length, 0);
  onlinePlayers = Math.max(1, presenceCount);
  updateOnlineCount();
}

async function ensureOnlineLobby() {
  if (lobbyChannel) return;
  onlineStatus.textContent = t("onlineNotReady");
  try {
    const client = await getSupabaseClient();
    lobbyChannel = client
      .channel("chess-jp-lobby", {
        config: {
          broadcast: { self: true },
          presence: { key: onlineAccount.id },
        },
      })
      .on("presence", { event: "sync" }, updatePresenceCount)
      .on("broadcast", { event: "match_request" }, ({ payload }) => handleOnlineMatchRequest(payload))
      .on("broadcast", { event: "match_found" }, ({ payload }) => handleOnlineMatchFound(payload))
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED") return;
        await lobbyChannel.track(ownOnlinePayload());
        updatePresenceCount();
        if (mode === "online" && !onlineMatch) onlineStatus.textContent = t("onlineJoined");
      });
  } catch (error) {
    console.error(error);
    onlineStatus.textContent = t("onlineSyncError");
  }
}

async function stopOnlineServices() {
  onlineSearching = false;
  onlineSearchNonce = "";
  onlineMatch = null;
  onlineMyColor = null;
  updateOnlineWaitingOverlay();
  if (!supabaseClient) return;
  if (matchChannel) await supabaseClient.removeChannel(matchChannel);
  if (lobbyChannel) await supabaseClient.removeChannel(lobbyChannel);
  matchChannel = null;
  lobbyChannel = null;
  onlinePlayers = 0;
}

function handleOnlineMatchRequest(payload) {
  if (!payload || payload.id === onlineAccount.id || !onlineSearching || onlineMatch) return;
  const players = [onlineAccount.id, payload.id].sort();
  const colors = {
    [players[0]]: "w",
    [players[1]]: "b",
  };
  const roomId = `room-${payload.nonce}-${players.join("-")}`;
  lobbyChannel?.send({
    type: "broadcast",
    event: "match_found",
    payload: {
      roomId,
      players,
      colors,
      names: {
        [onlineAccount.id]: onlineAccount.username || "Guest",
        [payload.id]: payload.username || "Guest",
      },
    },
  });
}

function handleOnlineMatchFound(payload) {
  if (!payload?.players?.includes(onlineAccount.id) || onlineMatch) return;
  joinOnlineMatch(payload);
}

function applyOnlineNames(match) {
  const opponentId = match.players.find((id) => id !== onlineAccount.id);
  const myName = onlineAccount.username || "Guest";
  const opponentName = match.names?.[opponentId] || "Opponent";
  if (onlineMyColor === "w") {
    whiteName.value = myName;
    blackName.value = opponentName;
  } else {
    whiteName.value = opponentName;
    blackName.value = myName;
  }
}

function joinOnlineMatch(match, options = {}) {
  onlineSearching = false;
  onlineMatch = match;
  onlineMyColor = options.color || match.colors?.[onlineAccount.id] || "w";
  applyOnlineNames(match);
  flipped = onlineMyColor === "b";
  if (options.fen) {
    try {
      game.load(options.fen);
      resetCapturedFromHistory();
      markTacticalMarkersDirty();
    } catch {
      game.reset();
      resetPlayableState();
    }
  } else if (options.keepBoard) {
    resetCapturedFromHistory();
  } else {
    game.reset();
    resetPlayableState();
  }
  subscribeOnlineMatch(match.roomId);
  onlineStatus.textContent = options.rejoined ? t("onlineRejoined") : t("onlineFound", { side: onlineSideName(onlineMyColor) });
  saveActiveOnlineMatch();
  render();
}

async function subscribeOnlineMatch(roomId) {
  const client = await getSupabaseClient();
  if (matchChannel) await client.removeChannel(matchChannel);
  matchChannel = client
    .channel(`chess-jp-match-${roomId}`, { config: { broadcast: { self: false } } })
    .on("broadcast", { event: "move" }, ({ payload }) => applyRemoteOnlineMove(payload))
    .on("broadcast", { event: "resign" }, ({ payload }) => applyRemoteOnlineResign(payload))
    .on("broadcast", { event: "new_game" }, () => resetOnlineBoard(false))
    .on("broadcast", { event: "sync_request" }, ({ payload }) => handleOnlineSyncRequest(payload))
    .on("broadcast", { event: "sync_state" }, ({ payload }) => applyOnlineSyncState(payload))
    .subscribe((status) => {
      if (status === "SUBSCRIBED" && onlineMatch) requestOnlineSync();
    });
}

function isOnlinePlayerTurn() {
  return mode === "online" && onlineMatch && onlineMyColor === game.turn();
}

function broadcastOnlineMove(result) {
  if (!matchChannel || !onlineMatch || !result) return;
  matchChannel.send({
    type: "broadcast",
    event: "move",
    payload: {
      playerId: onlineAccount.id,
      move: {
        from: result.from,
        to: result.to,
        promotion: result.promotion,
      },
      fen: game.fen(),
      moveCount: currentOnlinePly(),
    },
  });
}

function requestOnlineSync() {
  if (!matchChannel || !onlineMatch) return;
  matchChannel.send({
    type: "broadcast",
    event: "sync_request",
    payload: {
      playerId: onlineAccount.id,
      moveCount: currentOnlinePly(),
    },
  });
}

function handleOnlineSyncRequest(payload) {
  if (!payload || payload.playerId === onlineAccount.id || !matchChannel || !onlineMatch) return;
  matchChannel.send({
    type: "broadcast",
    event: "sync_state",
    payload: {
      playerId: onlineAccount.id,
      fen: game.fen(),
      moveCount: currentOnlinePly(),
    },
  });
}

function applyOnlineSyncState(payload) {
  if (!payload || payload.playerId === onlineAccount.id || mode !== "online" || !onlineMatch) return;
  if (payload.moveCount < currentOnlinePly() || !payload.fen) return;
  try {
    game.load(payload.fen);
    resetCapturedFromHistory();
    markTacticalMarkersDirty();
    saveActiveOnlineMatch();
    render();
  } catch {
    onlineStatus.textContent = t("onlineSyncError");
  }
}

function applyRemoteOnlineMove(payload) {
  if (!payload || payload.playerId === onlineAccount.id || mode !== "online" || !onlineMatch) return;
  if (payload.moveCount <= currentOnlinePly()) return;
  playMove(payload.move, { remote: true });
  if (payload.fen && game.fen() !== payload.fen) {
    try {
      game.load(payload.fen);
      resetCapturedFromHistory();
      markTacticalMarkersDirty();
      saveActiveOnlineMatch();
      render();
    } catch {
      onlineStatus.textContent = t("onlineSyncError");
    }
  }
}

function applyRemoteOnlineResign(payload) {
  if (!payload || payload.playerId === onlineAccount.id || mode !== "online") return;
  resignation = { loser: payload.color, winner: payload.color === "w" ? "b" : "w" };
  gameSettled = true;
  clearActiveOnlineMatch();
  adjustOnlineElo(15);
  onlineStatus.textContent = t("onlineOpponentResigned");
  render();
}

function resetOnlineBoard(broadcast = true) {
  game.reset();
  resetPlayableState();
  saveActiveOnlineMatch();
  if (broadcast && matchChannel) {
    matchChannel.send({
      type: "broadcast",
      event: "new_game",
      payload: { playerId: onlineAccount.id },
    });
  }
  render();
}

async function startOnlineSearch() {
  await ensureOnlineLobby();
  if (!lobbyChannel) return;
  onlineSearching = true;
  onlineMatch = null;
  onlineMyColor = null;
  onlineSearchNonce = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  onlineStatus.textContent = t("onlineSearching");
  updateOnlineWaitingOverlay();
  await lobbyChannel.track(ownOnlinePayload());
  await lobbyChannel.send({
    type: "broadcast",
    event: "match_request",
    payload: {
      ...ownOnlinePayload(),
      nonce: onlineSearchNonce,
    },
  });
}

async function restoreActiveOnlineMatch() {
  const saved = loadActiveOnlineMatch();
  if (!saved) return false;
  mode = "online";
  onlineSearching = false;
  onlineMatch = saved.match;
  onlineMyColor = saved.color;
  if (saved.fen) {
    try {
      game.load(saved.fen);
      resetCapturedFromHistory();
      markTacticalMarkersDirty();
    } catch {
      game.reset();
      resetPlayableState();
    }
  }
  applyOnlineNames(onlineMatch);
  flipped = onlineMyColor === "b";
  onlineStatus.textContent = t("onlineRejoined");
  await ensureOnlineLobby();
  await subscribeOnlineMatch(onlineMatch.roomId);
  saveActiveOnlineMatch();
  return true;
}

function playerColor() {
  return botColor === "w" ? "b" : "w";
}

function syncBotSide() {
  botColor = botSideSelect.value === "b" ? "w" : "b";
}

function adjustElo(delta) {
  playerElo = Math.max(100, playerElo + delta);
  localStorage.setItem("chessTableElo", String(playerElo));
  updateEloDisplay();
}

function settleEloIfGameOver() {
  if (gameSettled || !isPlayableGameOver()) return;

  if (mode === "bot") {
    gameSettled = true;
    if (!game.isCheckmate()) return;
    if (game.turn() === botColor) adjustElo(15);
    else adjustElo(-10);
  } else if (mode === "online" && onlineMyColor) {
    gameSettled = true;
    if (!game.isCheckmate()) return;
    const winner = game.turn() === "w" ? "b" : "w";
    adjustOnlineElo(winner === onlineMyColor ? 15 : -10);
    clearActiveOnlineMatch();
  }
}

function activeRules() {
  return {
    noCastle: mode === "custom" && ruleNoCastle.checked,
    noEnPassant: mode === "custom" && ruleNoEnPassant.checked,
    queensOnly: mode === "custom" && ruleQueensOnly.checked,
    oneStepSliders: mode === "custom" && ruleOneStepSliders.checked,
    noPawnDouble: mode === "custom" && ruleNoPawnDouble.checked,
    mandatoryCapture: mode === "custom" && ruleMandatoryCapture.checked,
    noRepeatPiece: mode === "custom" && ruleNoRepeatPiece.checked,
  };
}

function moveDistance(move) {
  return {
    file: Math.abs(files.indexOf(move.to[0]) - files.indexOf(move.from[0])),
    rank: Math.abs(Number(move.to[1]) - Number(move.from[1])),
  };
}

function moveAllowedByCustomRules(move, rules, mandatoryCaptureAvailable, lastOwnMove) {
  if (moveTargetsKing(move)) return false;
  if (rules.noCastle && (move.flags.includes("k") || move.flags.includes("q"))) return false;
  if (rules.noEnPassant && move.flags.includes("e")) return false;
  if (rules.noPawnDouble && move.flags.includes("b")) return false;
  if (rules.mandatoryCapture && mandatoryCaptureAvailable && !move.captured && !move.flags.includes("e")) return false;
  if (rules.noRepeatPiece && lastOwnMove?.to === move.from) return false;

  if (rules.oneStepSliders && (move.piece === "r" || move.piece === "b")) {
    const distance = moveDistance(move);
    if (Math.max(distance.file, distance.rank) > 1) return false;
  }
  return true;
}

function filteredAllMoves() {
  const rules = activeRules();
  const moves = game.moves({ verbose: true });
  const history = rules.noRepeatPiece ? game.history({ verbose: true }) : [];
  const lastOwnMove = [...history].reverse().find((move) => move.color === game.turn());
  const baseMoves = moves.filter((move) => moveAllowedByCustomRules(move, rules, false, lastOwnMove));
  const mandatoryCaptureAvailable = baseMoves.some((move) => Boolean(move.captured) || move.flags.includes("e"));
  return baseMoves.filter((move) => moveAllowedByCustomRules(move, rules, mandatoryCaptureAvailable, lastOwnMove));
}

function filteredMoves(square) {
  return filteredAllMoves().filter((move) => move.from === square);
}

function isStalemateDraw() {
  return !game.isCheckmate() && !game.isCheck() && filteredAllMoves().length === 0;
}

function isPlayableGameOver() {
  return game.isCheckmate() || isStalemateDraw();
}

function moveTargetsKing(move) {
  return game.get(move.to)?.type === "k";
}

function pieceAtOffset(square, fileStep, rankStep) {
  const fileIndex = files.indexOf(square[0]) + fileStep;
  const rank = Number(square[1]) + rankStep;
  if (fileIndex < 0 || fileIndex > 7 || rank < 1 || rank > 8) return null;
  const targetSquare = `${files[fileIndex]}${rank}`;
  const piece = game.get(targetSquare);
  return piece ? { square: targetSquare, piece } : { square: targetSquare, piece: null };
}

function canSlideAlong(type, fileStep, rankStep) {
  const diagonal = Math.abs(fileStep) === Math.abs(rankStep);
  const straight = fileStep === 0 || rankStep === 0;
  if (type === "q") return diagonal || straight;
  if (type === "b") return diagonal;
  if (type === "r") return straight;
  return false;
}

function updateTacticalMarkers() {
  if (!tacticalMarkersDirty) return;
  tacticalPins.clear();
  tacticalSkewers.clear();
  tacticalSwordLine.clear();
  if (mode === "builder") {
    tacticalMarkersDirty = false;
    return;
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  files.forEach((file) => {
    ranks.forEach((rank) => {
      const square = `${file}${rank}`;
      const attacker = game.get(square);
      if (!attacker || !canSlideAlong(attacker.type, 1, 0) && !canSlideAlong(attacker.type, 1, 1)) return;

      directions.forEach(([fileStep, rankStep]) => {
        if (!canSlideAlong(attacker.type, fileStep, rankStep)) return;

        const seen = [];
        let cursor = square;
        for (let distance = 0; distance < 7; distance += 1) {
          const next = pieceAtOffset(cursor, fileStep, rankStep);
          if (!next) break;
          cursor = next.square;
          if (!next.piece) continue;
          seen.push(next);
          if (seen.length >= 3) break;
        }

        const [first, second] = seen;
        if (!first || !second || first.piece.color === attacker.color) return;
        if (second.piece.color === first.piece.color && second.piece.type === "k") {
          tacticalPins.add(first.square);
        }
        if (first.piece.type === "k" && second.piece.color === first.piece.color && pieceValues[second.piece.type] >= 5) {
          tacticalSkewers.add(second.square);
          plantedSkewerBombs.add(second.square);
          if (!plantedSkewerBombTimers.has(second.square)) plantedSkewerBombTimers.set(second.square, 2);
        }
      });
    });
  });

  [...plantedSkewerBombs].forEach((square) => {
    if (game.get(square)) return;
    plantedSkewerBombs.delete(square);
    plantedSkewerBombTimers.delete(square);
  });

  updateSwordLineMarkers(directions);
  tacticalMarkersDirty = false;
}

function markTacticalMarkersDirty() {
  tacticalMarkersDirty = true;
}

function lineOrientation(fileStep, rankStep) {
  if (fileStep === 0) return "vertical";
  if (rankStep === 0) return "horizontal";
  return fileStep === rankStep ? "diagonal-up" : "diagonal-down";
}

function weaponFacingClass(fileStep, rankStep) {
  const fileDirection = -Math.sign(fileStep);
  const rankDirection = -Math.sign(rankStep);
  if (fileDirection === 1 && rankDirection === 0) return "face-east";
  if (fileDirection === -1 && rankDirection === 0) return "face-west";
  if (fileDirection === 0 && rankDirection === 1) return "face-north";
  if (fileDirection === 0 && rankDirection === -1) return "face-south";
  if (fileDirection === 1 && rankDirection === 1) return "face-northeast";
  if (fileDirection === -1 && rankDirection === 1) return "face-northwest";
  if (fileDirection === 1 && rankDirection === -1) return "face-southeast";
  if (fileDirection === -1 && rankDirection === -1) return "face-southwest";
  return "face-east";
}

function updateSwordLineMarkers(directions) {
  if (!game.isCheck()) return;

  let kingSquare = null;
  files.forEach((file) => {
    ranks.forEach((rank) => {
      const square = `${file}${rank}`;
      const piece = game.get(square);
      if (piece?.type === "k" && piece.color === game.turn()) kingSquare = square;
    });
  });
  if (!kingSquare) return;

  directions.forEach(([fileStep, rankStep]) => {
    const line = [];
    let cursor = kingSquare;
    for (let distance = 0; distance < 7; distance += 1) {
      const next = pieceAtOffset(cursor, fileStep, rankStep);
      if (!next) break;
      cursor = next.square;
      line.push(next.square);
      if (!next.piece) continue;
      const isEnemySwordCheck =
        next.piece.color !== game.turn() && ["q", "r"].includes(next.piece.type) && canSlideAlong(next.piece.type, fileStep, rankStep);
      if (isEnemySwordCheck) {
        const orientation = lineOrientation(fileStep, rankStep);
        const facing = weaponFacingClass(fileStep, rankStep);
        line.forEach((square, index) => {
          tacticalSwordLine.set(square, index === line.length - 1 ? `${orientation} held-sword ${facing}` : `${orientation} check-path`);
        });
      }
      break;
    }
  });
}

function knightForkTargetCount(square, color) {
  const jumps = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  return jumps.filter(([fileStep, rankStep]) => {
    const target = pieceAtOffset(square, fileStep, rankStep);
    if (!target?.piece || target.piece.color === color) return false;
    return target.piece.type === "k" || pieceValues[target.piece.type] >= 5;
  }).length;
}

function currentPuzzle() {
  return chessPuzzles[puzzleIndex] || chessPuzzles[0];
}

function puzzleMoveCount(puzzle = currentPuzzle()) {
  return Math.ceil(puzzle.line.length / 2);
}

function puzzlePlayerColor(puzzle = currentPuzzle()) {
  return puzzle.fen.split(" ")[1] === "b" ? "b" : "w";
}

function puzzleMoveKey(move) {
  return `${move.from}${move.to}${move.promotion || ""}`;
}

function puzzlePositionKey() {
  return game.fen().split(" ").slice(0, 4).join(" ");
}

function currentPuzzleSolutions() {
  const policyMoves = puzzlePolicies[currentPuzzle().id]?.solutions[puzzlePositionKey()];
  if (policyMoves?.length) return policyMoves;
  const expected = currentPuzzle().line[puzzlePly];
  return expected ? [expected] : [];
}

function saveSolvedPuzzles() {
  localStorage.setItem("chessJpSolvedPuzzlesV10", JSON.stringify([...solvedPuzzles]));
}

function renderPuzzlePanel() {
  if (mode !== "puzzle") return;
  const puzzle = currentPuzzle();
  const difficultyPuzzles = chessPuzzles.filter((item) => item.difficulty === puzzleDifficulty.value);
  puzzlePicker.replaceChildren();

  difficultyPuzzles.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = String(index + 1);
    button.dataset.puzzleId = item.id;
    button.classList.toggle("active", item.id === puzzle.id);
    button.classList.toggle("solved", solvedPuzzles.has(item.id));
    button.setAttribute("aria-label", `${t("puzzleNumber", { number: index + 1 })}: ${item.name[language] || item.name.en}`);
    puzzlePicker.append(button);
  });

  const number = difficultyPuzzles.findIndex((item) => item.id === puzzle.id) + 1;
  puzzleProgress.textContent = t("puzzleProgress", { solved: solvedPuzzles.size, total: chessPuzzles.length });
  puzzleNumber.textContent = t("puzzleNumber", { number });
  puzzleTitle.textContent = puzzle.name[language] || puzzle.name.en;
  puzzleObjective.textContent = t("puzzleObjective", {
    moves: puzzleMoveCount(puzzle),
    side: t(puzzlePlayerColor(puzzle) === "w" ? "white" : "black"),
  });
  puzzlePrompt.textContent = puzzle.prompt?.[language] || puzzle.prompt?.en || "";
  puzzlePrompt.hidden = !puzzlePrompt.textContent;
  puzzleHint.disabled = puzzleThinking || puzzleSolved || puzzlePly % 2 === 1;
  puzzleNext.disabled = !puzzleSolved;
}

function loadPuzzle(index = puzzleIndex) {
  clearTimeout(puzzleTimer);
  puzzleTimer = null;
  puzzleIndex = Math.max(0, Math.min(chessPuzzles.length - 1, index));
  const puzzle = currentPuzzle();
  puzzleDifficulty.value = puzzle.difficulty;
  game.load(puzzle.fen);
  resetPlayableState();
  puzzlePly = 0;
  puzzleThinking = false;
  puzzleSolved = false;
  puzzleHintSquare = null;
  flipped = game.turn() === "b";
  puzzleMessage.textContent = "";
  puzzleMessage.className = "puzzle-message";
  render();
}

function finishPuzzle(result) {
  const puzzle = currentPuzzle();
  puzzleSolved = true;
  puzzleThinking = false;
  solvedPuzzles.add(puzzle.id);
  saveSolvedPuzzles();
  puzzleMessage.textContent = t("puzzleSolved");
  puzzleMessage.className = "puzzle-message success";
  render();
  triggerGameOverCelebration(result);
  triggerMoveMoment(result);
}

function applyPuzzlePly(move, playerMove) {
  puzzleHintSquare = null;
  const result = game.move(move);
  if (!result) return null;
  markTacticalMarkersDirty();
  if (result.captured) captured[result.color].push(result.captured);
  lastMove = { from: result.from, to: result.to };
  lastMoveVector = moveVector(result.from, result.to);
  selected = null;
  legalMoves = [];
  puzzlePly += 1;
  playMoveSound(null);
  render();

  if (game.isCheckmate()) {
    finishPuzzle(result);
    return result;
  }

  triggerMoveMoment(result);
  if (playerMove) {
    puzzleMessage.textContent = t("puzzleCorrect");
    puzzleMessage.className = "puzzle-message success";
  }
  return result;
}

function schedulePuzzleReply() {
  if (mode !== "puzzle" || puzzleSolved || puzzlePly >= currentPuzzle().line.length) return;
  puzzleThinking = true;
  render();
  puzzleTimer = window.setTimeout(() => {
    const move =
      puzzlePolicies[currentPuzzle().id]?.replies[puzzlePositionKey()] ||
      currentPuzzle().line[puzzlePly];
    if (!move) {
      puzzleThinking = false;
      puzzleTimer = null;
      render();
      return;
    }
    const payload = { from: move.slice(0, 2), to: move.slice(2, 4) };
    if (move.length > 4) payload.promotion = move[4];
    applyPuzzlePly(payload, false);
    puzzleThinking = false;
    puzzleTimer = null;
    render();
  }, 520);
}

function playPuzzleMove(move) {
  if (!currentPuzzleSolutions().includes(puzzleMoveKey(move))) {
    puzzleHintSquare = null;
    selected = null;
    legalMoves = [];
    puzzleMessage.textContent = t("puzzleWrong");
    puzzleMessage.className = "puzzle-message error";
    render();
    clearTimeout(puzzleTimer);
    puzzleTimer = window.setTimeout(() => loadPuzzle(puzzleIndex), 850);
    return;
  }

  const result = applyPuzzlePly(move, true);
  if (result && !puzzleSolved) schedulePuzzleReply();
}

function showPuzzleHint() {
  if (mode !== "puzzle" || puzzleThinking || puzzleSolved || puzzlePly % 2 === 1) return;
  const solutions = currentPuzzleSolutions();
  const scripted = currentPuzzle().line[puzzlePly];
  const expected = solutions.includes(scripted) ? scripted : solutions[0];
  if (!expected) return;
  puzzleHintSquare = expected.slice(0, 2);
  puzzleMessage.textContent = t("puzzleHintShown");
  puzzleMessage.className = "puzzle-message hint";
  render();
}

function selectNextPuzzle() {
  const puzzle = currentPuzzle();
  const group = chessPuzzles.filter((item) => item.difficulty === puzzle.difficulty);
  const groupIndex = group.findIndex((item) => item.id === puzzle.id);
  const next = group[(groupIndex + 1) % group.length];
  loadPuzzle(chessPuzzles.findIndex((item) => item.id === next.id));
}

function playerName(color) {
  const value = color === "w" ? whiteName.value.trim() : blackName.value.trim();
  if (mode === "bot" && color === botColor) return "Bot";
  return value || t(color === "w" ? "white" : "black");
}

function isBotTurn() {
  return mode === "bot" && game.turn() === botColor && !isPlayableGameOver() && !resignation;
}

function movePayload(move) {
  const payload = { from: move.from, to: move.to };
  if (move.flags?.includes("p") || move.promotion) payload.promotion = move.promotion || "q";
  return payload;
}

function builderPieceAt(square) {
  const key = builderBoard[square];
  if (!key) return null;
  return { color: key[0], type: key[1], key };
}

function copyGameToBuilder() {
  Object.keys(builderBoard).forEach((square) => delete builderBoard[square]);
  files.forEach((file) => {
    ranks.forEach((rank) => {
      const square = `${file}${rank}`;
      const piece = game.get(square);
      if (piece) builderBoard[square] = `${piece.color}${piece.type}`;
    });
  });
}

function updateBuilderPalette() {
  if (mode !== "builder") return;
  piecePalette.querySelectorAll("button[data-piece]").forEach((button) => {
    button.classList.toggle("active", button.dataset.piece === selectedBuilderPiece);
  });
}

function saveBuilderBoards() {
  localStorage.setItem("chessJpSavedBoards", JSON.stringify(savedBuilderBoards));
  savedBoardsDirty = true;
}

function updateSavedBoardSelect() {
  if (!savedBoardsDirty) return;
  savedBoardSelect.replaceChildren();
  savedBuilderBoards.forEach((savedBoard) => {
    const option = document.createElement("option");
    option.value = savedBoard.id;
    option.textContent = savedBoard.name;
    savedBoardSelect.append(option);
  });
  savedBoardsDirty = false;
}

function loadBuilderBoard(boardState) {
  Object.keys(builderBoard).forEach((square) => delete builderBoard[square]);
  Object.entries(boardState).forEach(([square, piece]) => {
    builderBoard[square] = piece;
  });
}

function builderToFen() {
  const rows = ranks.map((rank) => {
    let empty = 0;
    let row = "";
    files.forEach((file) => {
      const piece = builderBoard[`${file}${rank}`];
      if (!piece) {
        empty += 1;
        return;
      }
      if (empty) {
        row += empty;
        empty = 0;
      }
      const type = piece[1];
      row += piece[0] === "w" ? type.toUpperCase() : type;
    });
    return row + (empty || "");
  });
  return `${rows.join("/")} w - - 0 1`;
}

function pathIsClear(from, to) {
  const fromFile = files.indexOf(from[0]);
  const toFile = files.indexOf(to[0]);
  const fromRank = Number(from[1]);
  const toRank = Number(to[1]);
  const fileStep = Math.sign(toFile - fromFile);
  const rankStep = Math.sign(toRank - fromRank);
  let file = fromFile + fileStep;
  let rank = fromRank + rankStep;

  while (file !== toFile || rank !== toRank) {
    if (builderBoard[`${files[file]}${rank}`]) return false;
    file += fileStep;
    rank += rankStep;
  }

  return true;
}

function builderPieceAttacksSquare(from, piece, to) {
  const fromFile = files.indexOf(from[0]);
  const toFile = files.indexOf(to[0]);
  const fromRank = Number(from[1]);
  const toRank = Number(to[1]);
  const fileDistance = Math.abs(toFile - fromFile);
  const rankDistance = Math.abs(toRank - fromRank);
  const fileDelta = toFile - fromFile;
  const rankDelta = toRank - fromRank;
  const color = piece[0];
  const type = piece[1];

  if (type === "p") {
    const direction = color === "w" ? 1 : -1;
    return rankDelta === direction && fileDistance === 1;
  }
  if (type === "n") {
    return (fileDistance === 1 && rankDistance === 2) || (fileDistance === 2 && rankDistance === 1);
  }
  if (type === "b") {
    return fileDistance === rankDistance && pathIsClear(from, to);
  }
  if (type === "r") {
    return (fileDistance === 0 || rankDistance === 0) && pathIsClear(from, to);
  }
  if (type === "q") {
    const diagonal = fileDistance === rankDistance;
    const straight = fileDistance === 0 || rankDistance === 0;
    return (diagonal || straight) && pathIsClear(from, to);
  }
  if (type === "k") {
    return Math.max(fileDistance, rankDistance) === 1;
  }

  return false;
}

function builderSquareAttackedBy(square, attackerColor) {
  return Object.entries(builderBoard).some(
    ([from, piece]) => piece[0] === attackerColor && builderPieceAttacksSquare(from, piece, square),
  );
}

function gamePathIsClear(from, to) {
  const fromFile = files.indexOf(from[0]);
  const toFile = files.indexOf(to[0]);
  const fromRank = Number(from[1]);
  const toRank = Number(to[1]);
  const fileStep = Math.sign(toFile - fromFile);
  const rankStep = Math.sign(toRank - fromRank);
  let file = fromFile + fileStep;
  let rank = fromRank + rankStep;

  while (file !== toFile || rank !== toRank) {
    if (game.get(`${files[file]}${rank}`)) return false;
    file += fileStep;
    rank += rankStep;
  }

  return true;
}

function gamePieceAttacksSquare(from, piece, to) {
  const fromFile = files.indexOf(from[0]);
  const toFile = files.indexOf(to[0]);
  const fromRank = Number(from[1]);
  const toRank = Number(to[1]);
  const fileDistance = Math.abs(toFile - fromFile);
  const rankDistance = Math.abs(toRank - fromRank);
  const fileDelta = toFile - fromFile;
  const rankDelta = toRank - fromRank;

  if (piece.type === "p") {
    const direction = piece.color === "w" ? 1 : -1;
    return rankDelta === direction && fileDistance === 1;
  }
  if (piece.type === "n") return (fileDistance === 1 && rankDistance === 2) || (fileDistance === 2 && rankDistance === 1);
  if (piece.type === "b") return fileDistance === rankDistance && gamePathIsClear(from, to);
  if (piece.type === "r") return (fileDistance === 0 || rankDistance === 0) && gamePathIsClear(from, to);
  if (piece.type === "q") {
    const diagonal = fileDistance === rankDistance;
    const straight = fileDistance === 0 || rankDistance === 0;
    return (diagonal || straight) && gamePathIsClear(from, to);
  }
  if (piece.type === "k") return Math.max(fileDistance, rankDistance) === 1;
  return false;
}

function squareDefendedBy(square, color) {
  return files.some((file) =>
    ranks.some((rank) => {
      const from = `${file}${rank}`;
      if (from === square) return false;
      const piece = game.get(from);
      return piece?.color === color && gamePieceAttacksSquare(from, piece, square);
    }),
  );
}

function squareAttackedBy(square, attackerColor) {
  return files.some((file) =>
    ranks.some((rank) => {
      const from = `${file}${rank}`;
      if (from === square) return false;
      const piece = game.get(from);
      return piece?.color === attackerColor && gamePieceAttacksSquare(from, piece, square);
    }),
  );
}

function attackingPiecesForSquare(square, attackerColor) {
  const attackers = [];
  files.forEach((file) => {
    ranks.forEach((rank) => {
      const from = `${file}${rank}`;
      if (from === square) return;
      const piece = game.get(from);
      if (piece?.color === attackerColor && gamePieceAttacksSquare(from, piece, square)) {
        attackers.push({ square: from, type: piece.type });
      }
    });
  });
  return attackers;
}

function adjacentSquares(square) {
  const fileIndex = files.indexOf(square[0]);
  const rank = Number(square[1]);
  const squares = [];
  for (let fileStep = -1; fileStep <= 1; fileStep += 1) {
    for (let rankStep = -1; rankStep <= 1; rankStep += 1) {
      if (!fileStep && !rankStep) continue;
      const nextFile = files[fileIndex + fileStep];
      const nextRank = rank + rankStep;
      if (nextFile && nextRank >= 1 && nextRank <= 8) squares.push(`${nextFile}${nextRank}`);
    }
  }
  return squares;
}

function kingSquareFor(color) {
  for (const file of files) {
    for (const rank of ranks) {
      const square = `${file}${rank}`;
      const piece = game.get(square);
      if (piece?.color === color && piece.type === "k") return square;
    }
  }
  return null;
}

function coordinatedMateNet(attackerColor, defenderColor) {
  const kingSquare = kingSquareFor(defenderColor);
  if (!kingSquare) return false;

  const attackers = new Map();
  [kingSquare, ...adjacentSquares(kingSquare)].forEach((square) => {
    attackingPiecesForSquare(square, attackerColor).forEach((attacker) => {
      attackers.set(attacker.square, attacker.type);
    });
  });

  const types = [...attackers.values()];
  const minorCount = types.filter((type) => type === "n" || type === "b").length;
  return minorCount >= 2 || (attackers.size >= 3 && minorCount >= 1);
}

function valuableTargetsAttackedFrom(square, color) {
  const piece = game.get(square);
  if (!piece) return 0;
  const enemyColor = color === "w" ? "b" : "w";
  return files.reduce(
    (total, file) =>
      total +
      ranks.reduce((rankTotal, rank) => {
        const targetSquare = `${file}${rank}`;
        const target = game.get(targetSquare);
        if (!target || target.color !== enemyColor) return rankTotal;
        const targetValue = target.type === "k" ? 100 : pieceValues[target.type] || 0;
        const movedValue = piece.type === "k" ? 100 : pieceValues[piece.type] || 0;
        return rankTotal + (targetValue >= movedValue && gamePieceAttacksSquare(square, piece, targetSquare) ? 1 : 0);
      }, 0),
    0,
  );
}

function createsLineTacticFrom(square, color) {
  const attacker = game.get(square);
  if (!attacker || !["b", "r", "q"].includes(attacker.type)) return false;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  return directions.some(([fileStep, rankStep]) => {
    if (!canSlideAlong(attacker.type, fileStep, rankStep)) return false;
    const seen = [];
    let cursor = square;
    for (let distance = 0; distance < 7; distance += 1) {
      const next = pieceAtOffset(cursor, fileStep, rankStep);
      if (!next) break;
      cursor = next.square;
      if (!next.piece) continue;
      seen.push(next.piece);
      if (seen.length >= 2) break;
    }

    const [first, second] = seen;
    if (!first || !second || first.color === color || second.color !== first.color) return false;
    return second.type === "k" || (first.type === "k" && pieceValues[second.type] >= 5);
  });
}

function validateBuilderPlayable() {
  const whiteKings = Object.entries(builderBoard).filter(([, piece]) => piece === "wk");
  const blackKings = Object.entries(builderBoard).filter(([, piece]) => piece === "bk");
  if (whiteKings.length !== 1 || blackKings.length !== 1) return false;

  const blackKingSquare = blackKings[0][0];
  return !builderSquareAttackedBy(blackKingSquare, "w");
}

function resetPlayableState() {
  clearTimeout(puzzleTimer);
  puzzleTimer = null;
  captured.w = [];
  captured.b = [];
  selected = null;
  legalMoves = [];
  lastMove = null;
  lastMoveVector = null;
  latestRating = null;
  gameSettled = false;
  resignation = null;
  moveRatings.length = 0;
  tacticalPins.clear();
  tacticalSkewers.clear();
  tacticalSwordLine.clear();
  markTacticalMarkersDirty();
  plantedSkewerBombs.clear();
  plantedSkewerBombTimers.clear();
  bombExplosionSquare = null;
  clearTimeout(bombExplosionTimer);
  bombExplosionTimer = null;
  enPassantBoardSquares = [];
  clearTimeout(enPassantBoardTimer);
  enPassantBoardTimer = null;
  castleBoardSquares = [];
  clearTimeout(castleBoardTimer);
  castleBoardTimer = null;
  clearCelebration();
}

function moveVector(from, to) {
  const fromFile = files.indexOf(from[0]);
  const toFile = files.indexOf(to[0]);
  const fromRank = Number(from[1]);
  const toRank = Number(to[1]);
  const distance = 18;
  return {
    x: Math.max(-1, Math.min(1, fromFile - toFile)) * distance,
    y: Math.max(-1, Math.min(1, toRank - fromRank)) * distance,
  };
}

function evaluateBoard(color) {
  let score = 0;
  files.forEach((file) => {
    ranks.forEach((rank) => {
      const piece = game.get(`${file}${rank}`);
      if (!piece) return;
      const value = piece.type === "k" ? 0 : pieceValues[piece.type] * 100;
      score += piece.color === color ? value : -value;
    });
  });

  const turn = game.turn();
  const mobility = game.moves().length;
  score += turn === color ? mobility * 1.5 : -mobility * 1.5;
  return score;
}

function scoreMoveForRating(move, color) {
  const before = evaluateBoard(color);
  const result = game.move(movePayload(move));
  if (!result) return -9999;

  let score = evaluateBoard(color) - before;
  if (result.captured) score += pieceValues[result.captured] * 28;
  if (result.promotion) score += pieceValues[result.promotion] * 18;
  if (game.isCheckmate()) score += 2000;
  else if (game.isCheck()) score += 45;
  game.undo();
  return score;
}

function bestReplyScore(color) {
  const opponentMoves = game.moves({ verbose: true }).filter((reply) => !moveTargetsKing(reply));
  if (!opponentMoves.length) return 0;
  return Math.max(...opponentMoves.map((reply) => scoreMoveForRating(reply, color)));
}

function probeMovePayload(move) {
  const payload = { from: move.from, to: move.to };
  if (move.promotion || move.flags?.includes("p")) payload.promotion = move.promotion || "q";
  return payload;
}

function moveWouldCheckmate(move) {
  const result = game.move(movePayload(move));
  const isMate = Boolean(result && game.isCheckmate());
  if (result) game.undo();
  return isMate;
}

function fenForTurn(fen, color) {
  const parts = fen.split(" ");
  parts[1] = color;
  return parts.join(" ");
}

function hasMateInOneFromFen(fen, color) {
  const probe = new Chess(fenForTurn(fen, color));
  const moves = probe.moves({ verbose: true });
  return moves.some((move) => {
    if (probe.get(move.to)?.type === "k") return false;
    const result = probe.move(probeMovePayload(move));
    const isMate = Boolean(result && probe.isCheckmate());
    if (result) probe.undo();
    return isMate;
  });
}

function attackerForcesMate(probe, attackerColor, pliesLeft, memo, budget) {
  if (probe.isCheckmate()) return probe.turn() !== attackerColor;
  if (probe.isDraw() || pliesLeft <= 0 || budget.nodes <= 0) return false;

  const key = `${probe.fen()}|${attackerColor}|${pliesLeft}`;
  if (memo.has(key)) return memo.get(key);
  budget.nodes -= 1;

  const moves = probe.moves({ verbose: true });
  if (!moves.length) return false;
  const attackerTurn = probe.turn() === attackerColor;
  let forced = attackerTurn ? false : true;

  for (const move of moves) {
    const result = probe.move(probeMovePayload(move));
    if (!result) continue;
    const childForced = attackerForcesMate(probe, attackerColor, pliesLeft - 1, memo, budget);
    probe.undo();

    if (attackerTurn && childForced) {
      forced = true;
      break;
    }
    if (!attackerTurn && !childForced) {
      forced = false;
      break;
    }
  }

  memo.set(key, forced);
  return forced;
}

function hasUnavoidableMateFromFen(fen, attackerColor, plies = 4) {
  const probe = new Chess(fen);
  return attackerForcesMate(probe, attackerColor, plies, new Map(), { nodes: 2200 });
}

function bestCurrentTurnFollowUp(color, baselineScore) {
  const moves = game.moves({ verbose: true }).filter((reply) => !moveTargetsKing(reply));
  if (!moves.length) return { gain: game.isCheckmate() ? -2400 : evaluateBoard(color) - baselineScore, mate: false };

  return moves.reduce(
    (best, move) => {
      const result = game.move(movePayload(move));
      if (!result) return best;
      const mate = game.isCheckmate();
      const gain = mate ? 2400 : evaluateBoard(color) - baselineScore;
      game.undo();
      if (mate || gain > best.gain) return { gain, mate };
      return best;
    },
    { gain: -9999, mate: false },
  );
}

function findHiddenBrilliantContinuation(color, playedResult, baselineScore, majorSacrifice) {
  if (!majorSacrifice) return { brilliant: false, gain: 0, mate: false };

  const opponentMoves = game.moves({ verbose: true }).filter((reply) => !moveTargetsKing(reply));
  if (!opponentMoves.length) return { brilliant: false, gain: 0, mate: false };

  let baitWorks = false;
  let bestGain = -9999;
  let mateFound = false;

  opponentMoves.forEach((reply) => {
    const looksLikePunish = reply.to === playedResult.to;
    const result = game.move(movePayload(reply));
    if (!result) return;

    const followUp = bestCurrentTurnFollowUp(color, baselineScore);
    game.undo();

    bestGain = Math.max(bestGain, followUp.gain);
    mateFound = mateFound || followUp.mate;
    if (looksLikePunish && (followUp.mate || followUp.gain >= 700)) baitWorks = true;
  });

  return {
    brilliant: baitWorks,
    gain: bestGain,
    mate: mateFound,
  };
}

function analyzeMove(move) {
  if (moveTargetsKing(move)) return null;
  const color = game.turn();
  const moves = filteredAllMoves();
  if (!moves.length) return null;

  const played = moves.find((candidate) => candidate.from === move.from && candidate.to === move.to);
  const playedMove = played ? { ...played, promotion: move.promotion || played.promotion } : move;
  if (moves.length === 1 && played) {
    return {
      key: "forced",
      loss: 0,
      color,
      sacrifice: false,
      swing: 0,
    };
  }

  const hadMateInOne = moves.some((candidate) => moveWouldCheckmate(candidate));
  const playedWasMateInOne = moveWouldCheckmate(playedMove);
  const opponentColor = color === "w" ? "b" : "w";
  const opponentHadMateThreat = hasMateInOneFromFen(game.fen(), opponentColor);
  const forcedMateAgainstPlayer =
    (game.isCheck() || opponentHadMateThreat) && hasUnavoidableMateFromFen(game.fen(), opponentColor);
  const playedScore = scoreMoveForRating(playedMove, color);
  const bestScore = Math.max(...moves.map((candidate) => scoreMoveForRating(candidate, color)));
  const before = evaluateBoard(color);
  const piece = game.get(playedMove.from);
  const movedValue = piece && piece.type !== "k" ? pieceValues[piece.type] * 100 : 0;
  const result = game.move(movePayload(playedMove));
  if (!result) return null;
  const after = evaluateBoard(color);
  const isMate = game.isCheckmate();
  const givesCheck = game.isCheck();
  const capturedValue = result.captured ? pieceValues[result.captured] * 100 : 0;
  const pieceIsOffered = squareAttackedBy(result.to, game.turn());
  const isSacrifice = pieceIsOffered && movedValue >= 300 && capturedValue + 120 < movedValue;
  const isMajorSacrifice = pieceIsOffered && movedValue >= 500 && capturedValue + 180 < movedValue;
  const recentOwnRatings = moveRatings.filter((rating) => rating?.color === color).slice(-5);
  let sacrificeMoveIndex = -1;
  recentOwnRatings.forEach((rating, index) => {
    if (rating.sacrifice) sacrificeMoveIndex = index;
  });
  const sacrificeMovesAgo = sacrificeMoveIndex < 0 ? null : recentOwnRatings.length - sacrificeMoveIndex;
  const recentSacrifice = sacrificeMovesAgo !== null;
  const isCoordinatedMateNet =
    isMate && (isSacrifice || recentSacrifice) && coordinatedMateNet(color, game.turn());
  const hiddenBrilliant = findHiddenBrilliantContinuation(color, result, before, isMajorSacrifice);
  const opponentReply = bestReplyScore(game.turn());
  const protectedDestination = squareDefendedBy(result.to, color);
  const usefulProtectedMove =
    protectedDestination &&
    (Boolean(result.captured) || Boolean(result.promotion) || givesCheck || after - before >= 45 || valuableTargetsAttackedFrom(result.to, color) > 0);
  const createsFork = result.piece === "n" && knightForkTargetCount(result.to, color) >= 2;
  const createsLineTactic = createsLineTacticFrom(result.to, color);
  const createsTactic = createsFork || createsLineTactic;
  const tacticCanBeCaptured = createsTactic && squareAttackedBy(result.to, game.turn());
  const opponentStillHasMateThreat = opponentHadMateThreat && hasMateInOneFromFen(game.fen(), game.turn());
  game.undo();

  const swing = after - before;
  const loss = bestScore - playedScore;
  const missedMateInOne = hadMateInOne && !playedWasMateInOne;
  const missedCheckmateThreat = !isMate && opponentHadMateThreat && opponentStillHasMateThreat;
  const failedSacrifice =
    isSacrifice &&
    !isMate &&
    !hiddenBrilliant.brilliant &&
    swing < 120 &&
    (loss >= 90 || swing <= -120 || opponentReply >= 180);
  let key = loss <= 35 ? "good" : loss <= 140 ? "soso" : "bad";

  if (isCoordinatedMateNet || (isMate && isMajorSacrifice && givesCheck) || (isMajorSacrifice && givesCheck && swing > 500) || hiddenBrilliant.brilliant) {
    key = "brilliant";
  } else if (forcedMateAgainstPlayer) {
    key = "forced";
  } else if (missedMateInOne || missedCheckmateThreat) {
    key = "mistake";
  } else if (failedSacrifice) {
    key = isMajorSacrifice || swing <= -260 || opponentReply >= 260 ? "mistake" : "bad";
  } else if (tacticCanBeCaptured) {
    key = movedValue >= 300 || opponentReply >= 220 || swing <= -180 ? "mistake" : "bad";
  } else if (usefulProtectedMove || createsTactic) {
    key = "good";
  } else if (loss >= 260 || swing <= -320 || (opponentReply >= 260 && loss >= 160)) {
    key = "mistake";
  }

  return {
    key,
    loss: Math.round(loss),
    color,
    sacrifice: isSacrifice,
    majorSacrifice: isMajorSacrifice,
    recentSacrifice,
    sacrificeMovesAgo,
    pieceIsOffered,
    swing: Math.round(swing),
    protected: usefulProtectedMove,
    tactic: createsTactic,
    tacticCanBeCaptured,
    missedMateInOne,
    missedCheckmateThreat,
    forcedMateAgainstPlayer,
    failedSacrifice,
    coordinatedMateNet: isCoordinatedMateNet,
    hiddenBrilliant: hiddenBrilliant.brilliant,
    hiddenGain: Math.round(hiddenBrilliant.gain),
  };
}

function recordRating(rating) {
  if (!rating) return;
  latestRating = rating;
  moveRatings.push(rating);
}

function updateRatingPanel() {
  moveRating.className = latestRating ? latestRating.key : "";
  moveRating.textContent = ratingText(latestRating);
}

function ensureAudio() {
  if (audioContext) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContextClass();
  masterGain = audioContext.createGain();
  masterGain.gain.value = Number(volumeRange.value) / 100;
  masterGain.connect(audioContext.destination);
}

async function resumeAudio() {
  ensureAudio();
  if (audioContext.state === "suspended") await audioContext.resume();
}

function playTone(frequency, duration, type = "sine", gainValue = 0.08) {
  if (!soundToggle.checked) return;
  resumeAudio();
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(gainValue, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  oscillator.connect(gain);
  gain.connect(masterGain);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
}

function playMoveSound(rating) {
  if (!soundToggle.checked) return;
  const tones = {
    brilliant: 880,
    forced: 520,
    good: 660,
    soso: 440,
    bad: 300,
    mistake: 180,
  };
  const base = tones[rating?.key] || 440;
  playTone(base, 0.16, "triangle", 0.07);
  window.setTimeout(() => playTone(base * 1.5, 0.12, "sine", 0.04), 70);
}

async function playMusicNote() {
  await resumeAudio();
  const track = musicModes[musicSelect.value];
  if (!track) return;
  const notes = track.notes;
  const note = notes[Math.floor(Math.random() * notes.length)];
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = track.wave;
  oscillator.frequency.value = note;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(track.gain, now + track.attack);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 3.6);
  oscillator.connect(gain);
  gain.connect(masterGain);
  oscillator.start(now);
  oscillator.stop(now + 3.8);
  musicNotesPlayed += 1;
}

async function startMusic() {
  await resumeAudio();
  const track = musicModes[musicSelect.value];
  if (!track) return;
  if (musicTimer) return;
  musicNotesPlayed = 0;
  await playMusicNote();
  musicTimer = window.setInterval(playMusicNote, track.tempo);
}

function stopMusic() {
  clearInterval(musicTimer);
  musicTimer = null;
}

function startMusicAfterGesture() {
  if (musicSelect.value !== "none") startMusic();
}

function clearCelebration() {
  clearTimeout(celebrationTimer);
  celebrationTimer = null;
  celebrationLayer.replaceChildren();
  celebrationLayer.className = "celebration-layer";
}

function scheduleCelebrationClear(duration) {
  clearTimeout(celebrationTimer);
  celebrationTimer = window.setTimeout(() => {
    celebrationTimer = null;
    clearCelebration();
  }, duration);
}

function setLoadingProgress(value) {
  loadingProgress = Math.max(0, Math.min(100, Math.round(value)));
  if (loadingPercent) loadingPercent.textContent = `${loadingProgress}%`;
  if (loadingMeterFill) loadingMeterFill.style.width = `${loadingProgress}%`;
}

function showLoadingScreen(duration = 900) {
  if (!loadingScreen) return;
  clearInterval(loadingTimer);
  clearTimeout(loadingHideTimer);
  setLoadingProgress(0);
  document.body.classList.remove("loading-done");
  document.body.classList.add("is-loading");
  const startedAt = performance.now();
  loadingTimer = window.setInterval(() => {
    const elapsed = performance.now() - startedAt;
    const target = Math.min(92, (elapsed / duration) * 100);
    setLoadingProgress(Math.max(loadingProgress + 1, target));
  }, 70);
  loadingHideTimer = window.setTimeout(hideLoadingScreen, duration);
}

function hideLoadingScreen() {
  if (!loadingScreen) return;
  clearInterval(loadingTimer);
  clearTimeout(loadingHideTimer);
  loadingTimer = null;
  loadingHideTimer = null;
  setLoadingProgress(100);
  document.body.classList.add("loading-done");
  document.body.classList.remove("is-loading");
}

function dismissOpeningScreen() {
  openingScreen?.classList.add("dismissed");
}

function makeCelebrationPiece(className, text, left, delay = 0) {
  const piece = document.createElement("span");
  piece.className = className;
  piece.textContent = text;
  piece.style.left = `${left}%`;
  piece.style.animationDelay = `${delay}ms`;
  return piece;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function appendCheckmateEffect(effect) {
  if (effect === "confetti") {
    const colors = ["#f05d5e", "#f7c948", "#2f9e8f", "#4d7cfe", "#9b5de5"];
    for (let i = 0; i < 64; i += 1) {
      const piece = makeCelebrationPiece("confetti-piece", "", Math.random() * 100, Math.random() * 450);
      piece.style.setProperty("--confetti-color", colors[i % colors.length]);
      piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
      celebrationLayer.append(piece);
    }
  } else if (effect === "bomb") {
    celebrationLayer.append(makeCelebrationPiece("bomb-core", "BOOM", 50, 0));
    for (let i = 0; i < 22; i += 1) {
      const spark = makeCelebrationPiece("bomb-spark", "", 50, i * 18);
      spark.style.setProperty("--angle", `${(360 / 22) * i}deg`);
      spark.style.setProperty("--distance", `${120 + Math.random() * 120}px`);
      celebrationLayer.append(spark);
    }
  } else if (effect === "balloons") {
    const balloons = ["♙", "♘", "♗", "♖", "♕", "♔"];
    for (let i = 0; i < 16; i += 1) {
      celebrationLayer.append(
        makeCelebrationPiece("balloon-piece", balloons[i % balloons.length], 5 + Math.random() * 90, i * 100),
      );
    }
  } else if (effect === "lightning") {
    for (let i = 0; i < 8; i += 1) {
      celebrationLayer.append(makeCelebrationPiece("lightning-bolt", "⚡", 8 + Math.random() * 84, i * 90));
    }
  } else if (effect === "windburst") {
    celebrationLayer.append(makeCelebrationPiece("wind-core", "", 50, 0));
    for (let i = 0; i < 28; i += 1) {
      const gust = makeCelebrationPiece("wind-streak", "", 50, i * 20);
      gust.style.setProperty("--angle", `${(360 / 28) * i}deg`);
      gust.style.setProperty("--distance", `${120 + Math.random() * 180}px`);
      celebrationLayer.append(gust);
    }
  } else if (effect === "shooting-star") {
    for (let i = 0; i < 10; i += 1) {
      const star = makeCelebrationPiece("shooting-star-piece", "★", Math.random() * 70, i * 130);
      star.style.top = `${Math.random() * 42}%`;
      celebrationLayer.append(star);
    }
  } else if (effect === "sword-king") {
    celebrationLayer.append(makeCelebrationPiece("king-target", "♔", 50, 0));
    celebrationLayer.append(makeCelebrationPiece("sword-strike", "╱", 50, 140));
  } else if (effect === "duel") {
    celebrationLayer.append(makeCelebrationPiece("duel-piece white-duelist", "♔", 34, 0));
    celebrationLayer.append(makeCelebrationPiece("duel-piece black-duelist", "♚", 66, 0));
    celebrationLayer.append(makeCelebrationPiece("duel-clash", "✦", 50, 550));
  }
}

function appendCheckmatedEffect(effect) {
  if (effect === "sad-face") {
    celebrationLayer.append(makeCelebrationPiece("sad-face-piece", ":(", 50, 0));
    for (let i = 0; i < 12; i += 1) {
      const drop = makeCelebrationPiece("sad-tear", "", 25 + Math.random() * 50, i * 90);
      drop.style.setProperty("--tear-drift", `${Math.random() * 80 - 40}px`);
      celebrationLayer.append(drop);
    }
  } else if (effect === "down-arrows") {
    for (let i = 0; i < 28; i += 1) {
      celebrationLayer.append(makeCelebrationPiece("down-arrow-piece", "↓", 6 + Math.random() * 88, i * 60));
    }
  } else if (effect === "crumbling-castles") {
    celebrationLayer.append(makeCelebrationPiece("crumbling-castle castle-left", "♜", 35, 0));
    celebrationLayer.append(makeCelebrationPiece("crumbling-castle castle-right", "♖", 65, 160));
    ["♘", "♗", "♕", "♔", "♖", "♙"].forEach((glyph, index) => {
      const defender = makeCelebrationPiece("castle-defender", glyph, 38 + index * 4.8, 120 + index * 70);
      defender.style.setProperty("--defender-drop", `${18 + Math.random() * 34}px`);
      celebrationLayer.append(defender);
    });
    for (let i = 0; i < 14; i += 1) {
      const pawn = makeCelebrationPiece("castle-waiting-pawn", i % 2 ? "♟" : "♙", 18 + i * 5, i * 44);
      pawn.style.setProperty("--pawn-rise", `${Math.random() * 22 - 11}px`);
      celebrationLayer.append(pawn);
    }
    for (let i = 0; i < 26; i += 1) {
      const stone = makeCelebrationPiece("castle-rubble", "", 34 + Math.random() * 32, 260 + i * 28);
      stone.style.setProperty("--rubble-x", `${Math.random() * 260 - 130}px`);
      stone.style.setProperty("--rubble-rot", `${Math.random() * 240 - 120}deg`);
      celebrationLayer.append(stone);
    }
  } else if (effect === "pawn-corner") {
    ["♘", "♗", "♖", "♕", "♔"].forEach((glyph, index) => {
      const victim = makeCelebrationPiece("cornered-piece", glyph, 38 + index * 6, index * 90);
      victim.style.setProperty("--corner-fall", `${Math.random() * 80 - 40}px`);
      celebrationLayer.append(victim);
    });
    for (let i = 0; i < 10; i += 1) {
      const side = i % 2 === 0 ? "left" : "right";
      const pawn = makeCelebrationPiece(`corner-pawn corner-pawn-${side}`, "♟", side === "left" ? 9 + i * 2 : 91 - i * 2, 160 + i * 70);
      pawn.style.setProperty("--corner-y", `${(i % 5) * 11 - 22}vh`);
      celebrationLayer.append(pawn);
    }
    for (let i = 0; i < 8; i += 1) {
      const burst = makeCelebrationPiece("corner-capture-burst", "×", 34 + Math.random() * 32, 900 + i * 70);
      burst.style.setProperty("--burst-y", `${Math.random() * 30 - 15}vh`);
      celebrationLayer.append(burst);
    }
  }
}

function appendCheckmatedAccent() {
  const accent = randomItem(["sad-face", "down-arrows", "crumbling-castles"]);
  if (accent === "sad-face") {
    celebrationLayer.append(makeCelebrationPiece("checkmated-accent-sad", ":(", 50, 700));
  } else if (accent === "down-arrows") {
    for (let i = 0; i < 9; i += 1) {
      celebrationLayer.append(makeCelebrationPiece("checkmated-accent-arrow", "↓", 18 + i * 8, 540 + i * 55));
    }
  } else {
    celebrationLayer.append(makeCelebrationPiece("checkmated-accent-castle left", "♜", 38, 620));
    celebrationLayer.append(makeCelebrationPiece("checkmated-accent-castle right", "♖", 62, 760));
  }
}

function nonKingPieceCount(color) {
  return files.reduce(
    (total, file) =>
      total +
      ranks.reduce((rankTotal, rank) => {
        const piece = game.get(`${file}${rank}`);
        return rankTotal + (piece && piece.color === color && piece.type !== "k" ? 1 : 0);
      }, 0),
    0,
  );
}

function triggerCheckmateCelebration(result) {
  if (!game.isCheckmate()) return;
  clearCelebration();
  const losingKing = game.turn() === "w" ? "♔" : "♚";
  const playerWasCheckmated = mode === "bot" && result?.color === botColor;
  const effect = randomItem(playerWasCheckmated ? checkmatedEffects : checkmateEffects);
  celebrationLayer.classList.add("active", playerWasCheckmated ? "checkmated-result" : "checkmate-result", effect);
  celebrationLayer.append(makeCelebrationPiece("checkmate-banner", "CHECKMATE", 50, 0));
  celebrationLayer.append(makeCelebrationPiece("fallen-king", losingKing, 50, 420));
  if (playerWasCheckmated) {
    appendCheckmatedEffect(effect);
    appendCheckmatedAccent();
  } else {
    appendCheckmateEffect(effect);
  }

  scheduleCelebrationClear(4200);
}

function triggerDrawCelebration(perspectiveColor = "w") {
  if (!isStalemateDraw()) return;
  clearCelebration();
  const playerPieces = nonKingPieceCount(perspectiveColor);
  const opponentPieces = nonKingPieceCount(perspectiveColor === "w" ? "b" : "w");
  const effect =
    playerPieces === opponentPieces
      ? "question-draw"
      : playerPieces > opponentPieces
        ? randomItem(checkmatedEffects)
        : randomItem(checkmateEffects);
  celebrationLayer.classList.add("active", "draw-result", effect);
  celebrationLayer.append(makeCelebrationPiece("draw-banner", "DRAW", 50, 0));
  if (effect === "question-draw") celebrationLayer.append(makeCelebrationPiece("question-draw-piece", "?", 50, 120));
  else if (checkmatedEffects.includes(effect)) appendCheckmatedEffect(effect);
  else appendCheckmateEffect(effect);

  scheduleCelebrationClear(4200);
}

function triggerGameOverCelebration(result) {
  if (game.isCheckmate()) triggerCheckmateCelebration(result);
  else if (isStalemateDraw()) triggerDrawCelebration(mode === "bot" ? playerColor() : result?.color || "w");
}

function triggerOnlineEloGain(delta) {
  clearCelebration();
  celebrationLayer.classList.add("active", "elo-gain-result");
  celebrationLayer.append(makeCelebrationPiece("elo-gain-title", `ELO +${delta}`, 50, 0));
  celebrationLayer.append(makeCelebrationPiece("elo-gain-crown", "♕", 50, 140));
  for (let i = 0; i < 14; i += 1) {
    const token = makeCelebrationPiece("elo-gain-token", i % 2 ? "▲" : "✦", 10 + Math.random() * 80, i * 55);
    token.style.top = `${18 + Math.random() * 64}%`;
    celebrationLayer.append(token);
  }
  scheduleCelebrationClear(2300);
}

function triggerMoveMoment(result) {
  if (!result || isPlayableGameOver()) return;

  let effect = null;
  const isSwordCheck = game.isCheck() && ["q", "r"].includes(result.piece);
  if (result.flags.includes("e")) effect = "moment-en-passant";
  else if (result.flags.includes("p")) effect = "moment-promotion";
  else if (isSwordCheck) effect = "moment-check-sword";
  else if (game.isCheck()) effect = "moment-check";
  else if (result.captured) effect = "moment-capture";
  if (!effect) return;

  clearCelebration();
  celebrationLayer.classList.add("active", "small-moment", effect);
  if (result.captured) {
    const capturedColor = result.color === "w" ? "b" : "w";
    celebrationLayer.append(makeCelebrationPiece("moment-captured-piece", pieceGlyphs[`${capturedColor}${result.captured}`], 50, 0));
  }

  if (effect === "moment-en-passant") {
    celebrationLayer.append(makeCelebrationPiece("moment-slash", "EN PASSANT", 50, 0));
    celebrationLayer.append(makeCelebrationPiece("moment-wisp", "", 50, 80));
    celebrationLayer.append(makeCelebrationPiece("moment-assassin-pawn", pieceGlyphs[`${result.color}p`], 42, 120));
    celebrationLayer.append(makeCelebrationPiece("moment-assassin-blade", "╱", 55, 180));
  } else if (effect === "moment-promotion") {
    celebrationLayer.append(makeCelebrationPiece("moment-crown", "♛", 50, 0));
    for (let i = 0; i < 10; i += 1) {
      const sparkle = makeCelebrationPiece("moment-sparkle", "✦", 36 + Math.random() * 28, i * 40);
      sparkle.style.top = `${34 + Math.random() * 22}%`;
      celebrationLayer.append(sparkle);
    }
  } else if (effect === "moment-check") {
    celebrationLayer.append(makeCelebrationPiece("moment-check-text", "CHECK", 50, 0));
    celebrationLayer.append(makeCelebrationPiece("moment-check-ring", "", 50, 0));
  } else if (effect === "moment-check-sword") {
    celebrationLayer.append(makeCelebrationPiece("moment-check-text", "CHECK", 50, 0));
    celebrationLayer.append(makeCelebrationPiece("moment-check-ring", "", 50, 0));
  } else if (effect === "moment-capture") {
    celebrationLayer.append(makeCelebrationPiece("moment-capture-pop", "", 50, 90));
  }

  scheduleCelebrationClear(1450);
}

function triggerTacticMoment(type, result) {
  if (!result || isPlayableGameOver()) return;
  clearCelebration();
  celebrationLayer.classList.add("active", "small-moment", `moment-${type}`);

  if (type === "bishop-sniper") {
    celebrationLayer.append(makeCelebrationPiece("moment-sniper-bishop", pieceGlyphs[`${result.color}b`], 38, 0));
    celebrationLayer.append(makeCelebrationPiece("moment-sniper-held", "", 41, 70));
    celebrationLayer.append(makeCelebrationPiece("moment-sniper-line", "", 52, 100));
    celebrationLayer.append(makeCelebrationPiece("moment-sniper-sight", "⊕", 68, 180));
  } else if (type === "shield") {
    celebrationLayer.append(makeCelebrationPiece("moment-shield-piece", pieceGlyphs[`${result.color}${result.piece}`], 43, 0));
    celebrationLayer.append(makeCelebrationPiece("moment-shield", "⬡", 55, 100));
  } else if (type === "knight-fork") {
    celebrationLayer.append(makeCelebrationPiece("moment-fork-knight", pieceGlyphs[`${result.color}n`], 50, 0));
    celebrationLayer.append(makeCelebrationPiece("moment-fork-bolt", "⚡", 50, 90));
  } else if (type === "skewer-bomb") {
    celebrationLayer.append(makeCelebrationPiece("moment-skewer-bomb", "BOOM", 50, 0));
  }

  scheduleCelebrationClear(1500);
}

function triggerPostMoveTactics(result, context = {}) {
  if (!result || isPlayableGameOver()) return;
  if (context.movedSkeweredPiece) {
    triggerTacticMoment("skewer-bomb", result);
  } else if (result.flags.includes("k") || result.flags.includes("q")) {
    triggerBoardCastle(result);
  } else if (context.wasInCheck && !game.isCheck() && result.piece !== "k") {
    triggerTacticMoment("shield", result);
  } else if (game.isCheck() && result.piece === "b") {
    triggerTacticMoment("bishop-sniper", result);
  } else if (result.piece === "n" && knightForkTargetCount(result.to, result.color) >= 2) {
    triggerTacticMoment("knight-fork", result);
  }
}

function triggerBoardBomb(square) {
  if (!square) return;
  clearTimeout(bombExplosionTimer);
  bombExplosionSquare = square;
  bombExplosionTimer = window.setTimeout(() => {
    bombExplosionSquare = null;
    bombExplosionTimer = null;
    render();
  }, 900);
}

function removePlantedSkewerBomb(square) {
  plantedSkewerBombs.delete(square);
  plantedSkewerBombTimers.delete(square);
  tacticalSkewers.delete(square);
}

function tickSkewerBombs() {
  const expiredSquares = [];

  [...plantedSkewerBombTimers.entries()].forEach(([square, movesLeft]) => {
    if (!game.get(square)) {
      removePlantedSkewerBomb(square);
      return;
    }

    const nextMovesLeft = movesLeft - 1;
    if (nextMovesLeft <= 0) {
      removePlantedSkewerBomb(square);
      expiredSquares.push(square);
    } else {
      plantedSkewerBombTimers.set(square, nextMovesLeft);
    }
  });

  return expiredSquares;
}

function enPassantCapturedSquare(result) {
  if (!result?.flags.includes("e")) return null;
  return `${result.to[0]}${result.from[1]}`;
}

function triggerBoardEnPassant(result) {
  const capturedSquare = enPassantCapturedSquare(result);
  if (!capturedSquare) return;
  clearTimeout(enPassantBoardTimer);
  enPassantBoardSquares = [result.to, capturedSquare];
  enPassantBoardTimer = window.setTimeout(() => {
    enPassantBoardSquares = [];
    enPassantBoardTimer = null;
    render();
  }, 950);
}

function castledRookDestination(result) {
  if (!result || !(result.flags.includes("k") || result.flags.includes("q"))) return null;
  return result.to[0] === "g" ? `f${result.to[1]}` : `d${result.to[1]}`;
}

function triggerBoardCastle(result) {
  const rookSquare = castledRookDestination(result);
  if (!rookSquare) return;
  clearTimeout(castleBoardTimer);
  castleBoardSquares = [result.from, result.to, rookSquare];
  render();
  castleBoardTimer = window.setTimeout(() => {
    castleBoardSquares = [];
    castleBoardTimer = null;
    render();
  }, 2000);
}

function renderBoard() {
  drawCoordinates();
  updateTacticalMarkers();
  board.replaceChildren();
  const builder = mode === "builder";

  for (let rankIndex = 0; rankIndex < 8; rankIndex += 1) {
    for (let fileIndex = 0; fileIndex < 8; fileIndex += 1) {
      const square = squareName(fileIndex, rankIndex);
      const piece = builder ? builderPieceAt(square) : game.get(square);
      const button = document.createElement("button");
      const isLight = (fileIndex + rankIndex) % 2 === 0;

      button.className = `square ${isLight ? "light" : "dark"}`;
      button.type = "button";
      button.dataset.square = square;
      button.setAttribute("role", "gridcell");
      button.setAttribute("aria-label", square);

      if (piece) {
        const span = document.createElement("span");
        span.className = `piece ${piece.color === "w" ? "white" : "black"} piece-${piece.type}`;
        span.textContent = pieceGlyphs[`${piece.color}${piece.type}`];
        if (lastMove?.to === square) {
          span.classList.add("move-in");
          span.style.setProperty("--move-x", `${lastMoveVector?.x || 0}px`);
          span.style.setProperty("--move-y", `${lastMoveVector?.y || 0}px`);
        }
        button.append(span);
      }

      if (!builder && tacticalSwordLine.has(square)) {
        const sword = document.createElement("span");
        const marker = tacticalSwordLine.get(square);
        sword.className = marker.includes("held-sword") ? `board-held-sword ${marker}` : `board-check-path ${marker}`;
        button.append(sword);
      }

      if (!builder && selected === square) button.classList.add("selected");
      if (!builder && mode === "puzzle" && puzzleHintSquare === square) button.classList.add("puzzle-hint");
      if (!builder && (lastMove?.from === square || lastMove?.to === square)) button.classList.add("last");
      if (!builder && legalMoves.some((move) => move.to === square)) {
        button.classList.add(piece ? "capture" : "legal");
      }
      if (!builder && piece?.type === "k" && piece.color === game.turn() && game.isCheck()) {
        button.classList.add("in-check");
      }
      if (!builder && tacticalPins.has(square)) button.classList.add("pinned");
      if (!builder && (tacticalSkewers.has(square) || plantedSkewerBombs.has(square))) button.classList.add("skewered");
      if (!builder && bombExplosionSquare === square) button.classList.add("bomb-exploding");
      if (!builder && enPassantBoardSquares.includes(square)) button.classList.add("en-passant-board");
      if (!builder && castleBoardSquares.includes(square)) button.classList.add("castle-board");

      board.append(button);
    }
  }
}

async function handleSquareClick(square) {
  if (mode === "builder") {
    if (selectedBuilderPiece === "erase") delete builderBoard[square];
    else builderBoard[square] = selectedBuilderPiece;
    render();
    return;
  }

  if (mode === "puzzle" && (puzzleThinking || puzzleSolved || puzzlePly % 2 === 1)) return;
  if (resignation || isBotTurn() || botThinking) return;
  if (mode === "online" && !isOnlinePlayerTurn()) {
    onlineStatus.textContent = onlineMatch ? t("onlineTurnWait") : t("onlineNotReady");
    return;
  }

  const piece = game.get(square);

  if (selected) {
    const candidate = legalMoves.find((move) => move.to === square);
    if (candidate) {
      const isPromotion = candidate.flags.includes("p");
      const promotion =
        isPromotion && activeRules().queensOnly
          ? "q"
          : isPromotion
            ? await requestPromotion()
            : undefined;
      const move = { from: selected, to: square, promotion };
      if (mode === "puzzle") playPuzzleMove(move);
      else playMove(move);
      return;
    }
  }

  if (piece && piece.color === game.turn()) {
    selected = square;
    legalMoves = filteredMoves(square);
  } else {
    selected = null;
    legalMoves = [];
  }

  render();
}

function playMove(move, options = {}) {
  try {
    if (moveTargetsKing(move)) {
      selected = null;
      legalMoves = [];
      render();
      return;
    }
    updateTacticalMarkers();
    const targetPiece = game.get(move.to);
    const context = {
      movedSkeweredPiece: tacticalSkewers.has(move.from) || plantedSkewerBombs.has(move.from),
      capturedSkeweredPiece:
        Boolean(targetPiece) &&
        targetPiece.color !== game.turn() &&
        (tacticalSkewers.has(move.to) || plantedSkewerBombs.has(move.to)),
      skewerSquare: move.from,
      capturedSkewerSquare: move.to,
      wasInCheck: game.isCheck(),
    };
    const rating = analyzeMove(move);
    const result = game.move(move);
    if (!result) return;
    markTacticalMarkersDirty();
    if (result.captured) captured[result.color].push(result.captured);
    recordRating(rating);
    lastMove = { from: result.from, to: result.to };
    lastMoveVector = moveVector(result.from, result.to);
    selected = null;
    legalMoves = [];
    playMoveSound(rating);
    settleEloIfGameOver();
    if (context.movedSkeweredPiece || context.capturedSkeweredPiece) {
      const bombSquare = context.movedSkeweredPiece ? context.skewerSquare : context.capturedSkewerSquare;
      removePlantedSkewerBomb(bombSquare);
      triggerBoardBomb(bombSquare);
    }
    const autoBombSquares = tickSkewerBombs();
    if (autoBombSquares.length) triggerBoardBomb(autoBombSquares[0]);
    if (result.flags.includes("e")) triggerBoardEnPassant(result);
    render();
    triggerGameOverCelebration(result);
    triggerMoveMoment(result);
    triggerPostMoveTactics(result, context);
    if (mode === "online" && !gameSettled) saveActiveOnlineMatch();
    if (mode === "online" && !options.remote) broadcastOnlineMove(result);
    scheduleBotMove();
  } catch {
    selected = null;
    legalMoves = [];
    render();
  }
}

function scoreBotMove(move) {
  let score = 0;
  if (move.captured) score += pieceValues[move.captured] * 10;
  if (move.promotion) score += pieceValues[move.promotion] * 8;

  game.move(movePayload(move));
  score += evaluateBoard(botColor) / 20;
  if (game.isCheckmate()) score += 1000;
  else if (game.isCheck()) score += 8;
  game.undo();

  return score;
}

function botPositionScore() {
  if (game.isCheckmate()) return game.turn() === botColor ? -100000 : 100000;
  if (isStalemateDraw()) return 0;

  let score = evaluateBoard(botColor);
  if (game.isCheck()) score += game.turn() === botColor ? -55 : 55;
  return score;
}

function orderedBotSearchMoves() {
  return game
    .moves({ verbose: true })
    .filter((move) => !moveTargetsKing(move))
    .sort((a, b) => {
      const value = (move) =>
        (move.captured ? pieceValues[move.captured] * 100 : 0) +
        (move.promotion ? pieceValues[move.promotion] * 80 : 0) +
        (move.san?.includes("#") ? 10000 : move.san?.includes("+") ? 40 : 0);
      return value(b) - value(a);
    });
}

function searchBotPosition(depth, alpha, beta) {
  if (depth <= 0 || isPlayableGameOver()) return botPositionScore();

  const maximizing = game.turn() === botColor;
  const moves = orderedBotSearchMoves();
  if (!moves.length) return botPositionScore();

  if (maximizing) {
    let best = -Infinity;
    for (const move of moves) {
      game.move(movePayload(move));
      best = Math.max(best, searchBotPosition(depth - 1, alpha, beta));
      game.undo();
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  }

  let best = Infinity;
  for (const move of moves) {
    game.move(movePayload(move));
    best = Math.min(best, searchBotPosition(depth - 1, alpha, beta));
    game.undo();
    beta = Math.min(beta, best);
    if (beta <= alpha) break;
  }
  return best;
}

function scoreBotMoveWithLookahead(move, depth) {
  const result = game.move(movePayload(move));
  if (!result) return -Infinity;
  const score = searchBotPosition(depth - 1, -Infinity, Infinity);
  game.undo();
  return score;
}

function pickRandomMove(moves) {
  return moves[Math.floor(Math.random() * moves.length)];
}

function chooseBotMove() {
  const moves = game.moves({ verbose: true }).filter((move) => !moveTargetsKing(move));
  if (!moves.length) return null;

  const difficulty = difficultySelect.value;
  if (difficulty === "beginner") return pickRandomMove(moves);

  const searchDepth = difficulty === "grandmaster" ? 3 : difficulty === "advanced" ? 2 : 1;
  const scored = moves
    .map((move) => ({
      move,
      score: searchDepth > 1 ? scoreBotMoveWithLookahead(move, searchDepth) : scoreBotMove(move) + Math.random() * 0.35,
    }))
    .sort((a, b) => b.score - a.score);

  if (difficulty === "novice") {
    const topHalf = scored.slice(0, Math.max(2, Math.ceil(scored.length / 2)));
    return Math.random() < 0.45 ? pickRandomMove(topHalf).move : scored[0].move;
  }
  if (difficulty === "intermediate") {
    const topFive = scored.slice(0, Math.min(5, scored.length));
    return Math.random() < 0.22 ? pickRandomMove(topFive).move : scored[0].move;
  }
  if (difficulty === "advanced") {
    const topTwo = scored.slice(0, Math.min(2, scored.length));
    return Math.random() < 0.08 ? pickRandomMove(topTwo).move : scored[0].move;
  }

  return scored[0].move;
}

function scheduleBotMove() {
  clearTimeout(botTimer);
  if (!isBotTurn()) {
    botThinking = false;
    return;
  }

  botThinking = true;
  updateStatus();
  botTimer = setTimeout(() => {
    const move = chooseBotMove();
    if (!move) {
      botThinking = false;
      render();
      return;
    }

    updateTacticalMarkers();
    const targetPiece = game.get(move.to);
    const context = {
      movedSkeweredPiece: tacticalSkewers.has(move.from) || plantedSkewerBombs.has(move.from),
      capturedSkeweredPiece:
        Boolean(targetPiece) &&
        targetPiece.color !== game.turn() &&
        (tacticalSkewers.has(move.to) || plantedSkewerBombs.has(move.to)),
      skewerSquare: move.from,
      capturedSkewerSquare: move.to,
      wasInCheck: game.isCheck(),
    };
    const rating = analyzeMove(movePayload(move));
    const result = game.move(movePayload(move));
    markTacticalMarkersDirty();
    if (result?.captured) captured[result.color].push(result.captured);
    recordRating(rating);
    lastMove = result ? { from: result.from, to: result.to } : lastMove;
    lastMoveVector = result ? moveVector(result.from, result.to) : lastMoveVector;
    botThinking = false;
    selected = null;
    legalMoves = [];
    playMoveSound(latestRating);
    settleEloIfGameOver();
    if (context.movedSkeweredPiece || context.capturedSkeweredPiece) {
      const bombSquare = context.movedSkeweredPiece ? context.skewerSquare : context.capturedSkewerSquare;
      removePlantedSkewerBomb(bombSquare);
      triggerBoardBomb(bombSquare);
    }
    const autoBombSquares = tickSkewerBombs();
    if (autoBombSquares.length) triggerBoardBomb(autoBombSquares[0]);
    if (result?.flags.includes("e")) triggerBoardEnPassant(result);
    render();
    triggerGameOverCelebration(result);
    triggerMoveMoment(result);
    triggerPostMoveTactics(result, context);
  }, 450);
}

function requestPromotion() {
  return new Promise((resolve) => {
    const close = () => {
      promotionDialog.removeEventListener("close", close);
      resolve(promotionDialog.returnValue || "q");
    };

    promotionDialog.addEventListener("close", close);
    promotionDialog.showModal();
  });
}

function updateStatus() {
  if (mode === "builder") {
    statusEl.textContent = t("builderStatus");
    fenInput.value = game.fen();
    return;
  }

  if (mode === "puzzle") {
    if (puzzleSolved) statusEl.textContent = t("puzzleSolved");
    else if (puzzleThinking) statusEl.textContent = t("puzzleReply");
    else {
      statusEl.textContent = t("puzzleObjective", {
        moves: puzzleMoveCount(),
        side: t(puzzlePlayerColor() === "w" ? "white" : "black"),
      });
    }
    fenInput.value = game.fen();
    return;
  }

  if (resignation) {
    statusEl.textContent = t("resigned", {
      loser: playerName(resignation.loser),
      winner: playerName(resignation.winner),
    });
    fenInput.value = game.fen();
    return;
  }

  const side = playerName(game.turn());
  const modeLabels = { human: t("humanMode"), bot: t("botMode"), custom: t("customMode"), online: t("onlineMode"), puzzle: t("puzzleMode") };
  const modeLabel = modeLabels[mode];
  let text = botThinking ? t("thinking", { mode: modeLabel }) : t("turn", { mode: modeLabel, side });

  if (game.isCheckmate()) {
    text = t("checkmate", { side });
  } else if (isStalemateDraw()) {
    text = t("draw");
  } else if (game.isCheck()) {
    text = t("check", { mode: modeLabel, side });
  }

  statusEl.textContent = text;
  fenInput.value = game.fen();
}

function updateMoves() {
  const history = game.history();
  moveList.replaceChildren();
  moveCount.textContent = t("moveCount", { count: history.length });

  history.forEach((san, index) => {
    const li = document.createElement("li");
    const moveNo = Math.floor(index / 2) + 1;
    const rating = moveRatings[index];
    const ratingBadge = rating ? `<span class="move-rating ${rating.key}">${ratingText(rating)}</span>` : "";
    li.innerHTML = `${index % 2 === 0 ? `${moveNo}. ${san}` : san}${ratingBadge}`;
    moveList.append(li);
  });
}

function updateCaptured() {
  whiteCaptured.textContent = captured.w
    .sort((a, b) => pieceValues[b] - pieceValues[a])
    .map((type) => pieceGlyphs[`b${type}`])
    .join(" ");
  blackCaptured.textContent = captured.b
    .sort((a, b) => pieceValues[b] - pieceValues[a])
    .map((type) => pieceGlyphs[`w${type}`])
    .join(" ");
}

function render() {
  renderBoard();
  updateModeUI();
  renderPuzzlePanel();
  updateStatus();
  updateMoves();
  updateCaptured();
  updateRatingPanel();
  updateEloDisplay();
  if (mode === "online") {
    updateOnlineAccountUI();
    updateOnlineCount();
  }
  updateOnlineWaitingOverlay();
  updateBuilderPalette();
  updateSavedBoardSelect();
  fenMessage.textContent = "";
}

function setMode(nextMode) {
  mode = nextMode;
  clearTimeout(botTimer);
  clearTimeout(puzzleTimer);
  puzzleTimer = null;
  botThinking = false;
  puzzleThinking = false;
  syncBotSide();
  if (mode === "online") {
    ensureOnlineLobby();
  } else {
    stopOnlineServices();
  }
  selected = null;
  legalMoves = [];
  gameSettled = false;
  if (mode === "puzzle") {
    loadPuzzle(puzzleIndex);
    return;
  }
  render();
  scheduleBotMove();
}

function updateModeUI() {
  const custom = mode === "custom";
  const bot = mode === "bot";
  const online = mode === "online";
  const puzzle = mode === "puzzle";
  const builder = mode === "builder";
  modeHuman.classList.toggle("active", mode === "human");
  modeBot.classList.toggle("active", bot);
  modeOnline.classList.toggle("active", online);
  modePuzzle.classList.toggle("active", puzzle);
  modeBuilder.classList.toggle("active", builder);
  modeCustom.classList.toggle("active", custom);
  modeHuman.setAttribute("aria-checked", String(mode === "human"));
  modeBot.setAttribute("aria-checked", String(bot));
  modeOnline.setAttribute("aria-checked", String(online));
  modePuzzle.setAttribute("aria-checked", String(puzzle));
  modeBuilder.setAttribute("aria-checked", String(builder));
  modeCustom.setAttribute("aria-checked", String(custom));
  customRules.hidden = !custom;
  botSettings.hidden = !bot;
  onlinePanel.hidden = !online;
  puzzlePanel.hidden = !puzzle;
  builderPanel.hidden = !builder;
}

function resetCapturedFromHistory() {
  captured.w = [];
  captured.b = [];

  const replay = new Chess();
  game.history({ verbose: true }).forEach((move) => {
    const result = replay.move({
      from: move.from,
      to: move.to,
      promotion: move.promotion,
    });
    if (result?.captured) captured[result.color].push(result.captured);
  });
}

function reloadCurrentBoard() {
  if (mode === "puzzle") {
    loadPuzzle(puzzleIndex);
    return;
  }
  selected = null;
  legalMoves = [];
  tacticalPins.clear();
  tacticalSkewers.clear();
  tacticalSwordLine.clear();
  markTacticalMarkersDirty();
  plantedSkewerBombs.clear();
  plantedSkewerBombTimers.clear();
  bombExplosionSquare = null;
  clearTimeout(bombExplosionTimer);
  bombExplosionTimer = null;
  enPassantBoardSquares = [];
  clearTimeout(enPassantBoardTimer);
  enPassantBoardTimer = null;
  castleBoardSquares = [];
  clearTimeout(castleBoardTimer);
  castleBoardTimer = null;
  clearCelebration();
  render();
}

function resignCurrentSide() {
  if (mode === "builder" || mode === "puzzle" || resignation || isPlayableGameOver()) return;
  clearTimeout(botTimer);
  botThinking = false;
  const loser = mode === "online" && onlineMyColor ? onlineMyColor : game.turn();
  const winner = loser === "w" ? "b" : "w";
  resignation = { loser, winner };
  selected = null;
  legalMoves = [];
  gameSettled = true;
  if (mode === "bot") adjustElo(loser === botColor ? 15 : -10);
  if (mode === "online") {
    adjustOnlineElo(-10);
    clearActiveOnlineMatch();
    matchChannel?.send({
      type: "broadcast",
      event: "resign",
      payload: { playerId: onlineAccount.id, color: loser },
    });
  }
  clearCelebration();
  render();
}

document.querySelector("#newGame").addEventListener("click", () => {
  clearTimeout(botTimer);
  botThinking = false;
  if (mode === "puzzle") {
    loadPuzzle(puzzleIndex);
    return;
  }
  if (mode === "online" && onlineMatch) {
    resetOnlineBoard(true);
    return;
  }
  game.reset();
  resetPlayableState();
  render();
  scheduleBotMove();
});

reloadBoard.addEventListener("click", reloadCurrentBoard);
resignGame.addEventListener("click", resignCurrentSide);
board.addEventListener("click", (event) => {
  const squareButton = event.target.closest(".square");
  if (!squareButton || !board.contains(squareButton)) return;
  handleSquareClick(squareButton.dataset.square);
});

document.querySelector("#undoMove").addEventListener("click", () => {
  if (mode === "puzzle") {
    loadPuzzle(puzzleIndex);
    return;
  }
  if (mode === "online") {
    onlineStatus.textContent = t("onlineTurnWait");
    return;
  }
  clearTimeout(botTimer);
  botThinking = false;
  const undone = game.undo();
  if (!undone) return;
  moveRatings.pop();
  if (mode === "bot" && game.turn() === botColor && game.history().length) {
    game.undo();
    moveRatings.pop();
  }
  latestRating = moveRatings[moveRatings.length - 1] || null;
  gameSettled = false;
  resetCapturedFromHistory();
  plantedSkewerBombs.clear();
  plantedSkewerBombTimers.clear();
  markTacticalMarkersDirty();
  lastMove = null;
  lastMoveVector = null;
  selected = null;
  legalMoves = [];
  render();
});

document.querySelector("#flipBoard").addEventListener("click", () => {
  flipped = !flipped;
  render();
});

document.querySelector("#copyFen").addEventListener("click", async () => {
  await navigator.clipboard.writeText(game.fen());
  fenMessage.textContent = t("copiedFen");
});

modeHuman.addEventListener("click", () => setMode("human"));
modeBot.addEventListener("click", () => setMode("bot"));
modeOnline.addEventListener("click", () => setMode("online"));
modePuzzle.addEventListener("click", () => setMode("puzzle"));
modeBuilder.addEventListener("click", () => setMode("builder"));
modeCustom.addEventListener("click", () => setMode("custom"));

puzzleDifficulty.addEventListener("change", () => {
  const index = chessPuzzles.findIndex((puzzle) => puzzle.difficulty === puzzleDifficulty.value);
  loadPuzzle(index);
});

puzzlePicker.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-puzzle-id]");
  if (!button) return;
  const index = chessPuzzles.findIndex((puzzle) => puzzle.id === button.dataset.puzzleId);
  loadPuzzle(index);
});

puzzleRestart.addEventListener("click", () => loadPuzzle(puzzleIndex));
puzzleHint.addEventListener("click", showPuzzleHint);
puzzleNext.addEventListener("click", selectNextPuzzle);

piecePalette.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-piece]");
  if (!button) return;
  selectedBuilderPiece = button.dataset.piece;
  updateBuilderPalette();
});

builderClear.addEventListener("click", () => {
  Object.keys(builderBoard).forEach((square) => delete builderBoard[square]);
  render();
});

builderLoadCurrent.addEventListener("click", () => {
  copyGameToBuilder();
  builderMessage.textContent = "";
  render();
});

builderSave.addEventListener("click", () => {
  const name = builderBoardName.value.trim() || `Board ${savedBuilderBoards.length + 1}`;
  const selectedId = savedBoardSelect.value;
  const existing = savedBuilderBoards.find((savedBoard) => savedBoard.id === selectedId);
  const payload = { ...builderBoard };
  if (existing && builderBoardName.value.trim() === existing.name) {
    existing.board = payload;
  } else {
    savedBuilderBoards.push({
      id: `board-${Date.now()}`,
      name,
      board: payload,
    });
  }
  saveBuilderBoards();
  builderMessage.textContent = t("boardSaved");
  updateSavedBoardSelect();
});

builderLoadSaved.addEventListener("click", () => {
  const savedBoard = savedBuilderBoards.find((item) => item.id === savedBoardSelect.value);
  if (!savedBoard) return;
  loadBuilderBoard(savedBoard.board);
  builderBoardName.value = savedBoard.name;
  builderMessage.textContent = "";
  render();
});

builderDelete.addEventListener("click", () => {
  savedBuilderBoards = savedBuilderBoards.filter((item) => item.id !== savedBoardSelect.value);
  saveBuilderBoards();
  builderMessage.textContent = "";
  updateSavedBoardSelect();
});

builderPlay.addEventListener("click", () => {
  try {
    if (!validateBuilderPlayable()) throw new Error("invalid board");
    game.load(builderToFen());
    resetPlayableState();
    setMode("human");
  } catch {
    builderMessage.textContent = t("cannotPlayBoard");
  }
});

findOnlineMatch.addEventListener("click", () => {
  showLoadingScreen(700);
  startOnlineSearch();
});

saveOnlineAccount.addEventListener("click", () => {
  onlineAccount.username = onlineUsername.value.trim() || "Guest";
  saveOnlineProfile();
  updateOnlineAccountUI();
  onlineStatus.textContent = t("onlineSaved");
  if (lobbyChannel) lobbyChannel.track(ownOnlinePayload());
});

demoOnlineWin.addEventListener("click", () => adjustOnlineElo(15));
demoOnlineLoss.addEventListener("click", () => adjustOnlineElo(-10));

[whiteName, blackName].forEach((input) => {
  input.addEventListener("input", updateStatus);
});

difficultySelect.addEventListener("change", () => {
  if (isBotTurn()) scheduleBotMove();
});

botSideSelect.addEventListener("change", () => {
  syncBotSide();
  clearTimeout(botTimer);
  botThinking = false;
  game.reset();
  resetPlayableState();
  render();
  scheduleBotMove();
});

[
  ruleNoCastle,
  ruleNoEnPassant,
  ruleQueensOnly,
  ruleOneStepSliders,
  ruleNoPawnDouble,
  ruleMandatoryCapture,
  ruleNoRepeatPiece,
].forEach((input) => {
  input.addEventListener("change", () => {
    selected = null;
    legalMoves = [];
    render();
  });
});

languageSelect.addEventListener("change", () => {
  language = languageSelect.value;
  syncDefaultNames();
  applyLanguage();
  renderPuzzlePanel();
});

themeSelect.addEventListener("change", () => {
  document.body.dataset.theme = themeSelect.value;
});

soundToggle.addEventListener("change", () => {
  if (soundToggle.checked) {
    playTone(440, 0.1, "sine", 0.04);
    startMusicAfterGesture();
  }
});

musicSelect.addEventListener("change", () => {
  stopMusic();
  if (musicSelect.value !== "none") startMusic();
});

document.addEventListener("pointerdown", startMusicAfterGesture);
document.addEventListener("click", startMusicAfterGesture);
document.addEventListener("keydown", startMusicAfterGesture);
openingScreen?.addEventListener("click", dismissOpeningScreen);
window.setTimeout(dismissOpeningScreen, 2700);

volumeRange.addEventListener("input", () => {
  if (!masterGain) return;
  masterGain.gain.value = Number(volumeRange.value) / 100;
});

fenForm.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    if (mode === "puzzle") mode = "human";
    game.load(fenInput.value.trim());
    resetPlayableState();
    render();
    scheduleBotMove();
  } catch {
    fenMessage.textContent = t("fenError");
  }
});

document.body.dataset.theme = themeSelect.value;
applyLanguage();
await restoreActiveOnlineMatch();
render();
})().catch((error) => {
  console.error(error);
  document.body.classList.add("loading-done");
  document.body.classList.remove("is-loading");
  const status = document.querySelector("#status");
  if (status) status.textContent = "Chess engine could not load. Please open the HTTPS site or localhost.";
});
