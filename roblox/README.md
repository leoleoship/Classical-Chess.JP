# Chess.JP Roblox Starter

This folder contains a Roblox Studio starter version of Chess.JP.

## How To Install In Roblox Studio

1. Open Roblox Studio and create a new Baseplate project.
2. In Explorer, right-click `ServerScriptService`.
3. Choose `Insert Object` -> `Script`.
4. Rename the script to `ChessJP`.
5. Open `roblox/ServerScriptService/ChessJP.server.lua`.
6. Copy the whole file into the Roblox script.
7. Press Play.

## What This Version Has

- A 3D 8x8 chessboard.
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
- Pieces are simple generated Roblox shapes, not final custom models yet.

## What We Can Add Next

- Bot mode.
- Online matchmaking with Roblox players.
- Opening drills and puzzles from Chess.JP.
- Check, checkmate, and move ratings.
- Dramatic Roblox effects for checkmate, captures, forks, pins, and skewers.
- Better 3D piece models.

This is intentionally a starter Roblox port: it gets the board playable first, then we can layer the Chess.JP personality on top.
