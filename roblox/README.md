# Chess.JP Roblox Starter

This folder contains Roblox Studio starter versions of Chess.JP.

## Recommended: 2D Version

1. Open Roblox Studio and create a new Baseplate project.
2. In Explorer, open `StarterPlayer`.
3. Right-click `StarterPlayerScripts`.
4. Choose `Insert Object` -> `LocalScript`.
5. Rename the script to `ChessJP2D`.
6. Open `roblox/StarterPlayerScripts/ChessJP2D.client.lua`.
7. Copy the whole file into the Roblox LocalScript.
8. Press Play.

## Optional: 3D Version

1. Open Roblox Studio and create a new Baseplate project.
2. In Explorer, right-click `ServerScriptService`.
3. Choose `Insert Object` -> `Script`.
4. Rename the script to `ChessJP3D`.
5. Open `roblox/ServerScriptService/ChessJP.server.lua`.
6. Copy the whole file into the Roblox Script.
7. Press Play.

## What This Version Has

- A 2D screen chessboard styled like the GitHub Chess.JP app.
- A Chess.JP side panel with mode buttons, settings, move rating, captured pieces, controls, and move history.
- Classic, Candyland, and Sunburst themes.
- Click pieces and squares to move.
- White and black turns.
- Normal movement for pawns, knights, bishops, rooks, queens, and kings.
- Captures.
- Pawn promotion to queen.
- Basic captured-piece display in the output labels.
- Restart button.

## Current Limits

- Check and checkmate are not enforced yet.
- Castling and en passant are not implemented yet.
- Bot, online, puzzle, and account buttons are UI placeholders for now.
- The 2D version uses simple letters for pieces instead of final art.
- The optional 3D version uses simple generated Roblox shapes, not final custom models yet.

## What We Can Add Next

- Bot mode.
- Online matchmaking with Roblox players.
- Opening drills and puzzles from Chess.JP.
- Check, checkmate, and move ratings.
- Dramatic Roblox effects for checkmate, captures, forks, pins, and skewers.
- Better 2D piece art or 3D piece models.

This is intentionally a starter Roblox port: it gets the board playable first, then we can layer the Chess.JP personality on top.
