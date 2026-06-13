#!/usr/bin/env python3
import argparse
import random

import chess
import chess.engine


EDGE_SQUARES = [
    chess.A8,
    chess.B8,
    chess.C8,
    chess.F8,
    chess.G8,
    chess.H8,
    chess.A7,
    chess.H7,
]
WHITE_KING_SQUARES = [
    chess.A1,
    chess.B1,
    chess.C1,
    chess.F1,
    chess.G1,
    chess.H1,
    chess.A2,
    chess.H2,
]


def random_position(rng):
    board = chess.Board(None)
    black_king = rng.choice(EDGE_SQUARES)
    white_king = rng.choice(WHITE_KING_SQUARES)
    if chess.square_distance(black_king, white_king) <= 1:
        return None
    board.set_piece_at(black_king, chess.Piece(chess.KING, chess.BLACK))
    board.set_piece_at(white_king, chess.Piece(chess.KING, chess.WHITE))

    white_material = rng.sample(
        [chess.QUEEN, chess.ROOK, chess.ROOK, chess.BISHOP, chess.BISHOP, chess.KNIGHT],
        rng.randint(2, 5),
    )
    black_material = rng.sample(
        [chess.QUEEN, chess.ROOK, chess.ROOK, chess.BISHOP, chess.KNIGHT],
        rng.randint(1, 4),
    )
    for color, material in (
        (chess.WHITE, white_material),
        (chess.BLACK, black_material),
    ):
        for piece_type in material:
            empty = [square for square in chess.SQUARES if board.piece_at(square) is None]
            board.set_piece_at(
                rng.choice(empty),
                chess.Piece(piece_type, color),
            )

    for color, count in (
        (chess.WHITE, rng.randint(1, 5)),
        (chess.BLACK, rng.randint(2, 7)),
    ):
        for _ in range(count):
            empty = [
                square
                for square in chess.SQUARES
                if board.piece_at(square) is None
                and chess.square_rank(square) not in (0, 7)
            ]
            if not empty:
                break
            board.set_piece_at(rng.choice(empty), chess.Piece(chess.PAWN, color))

    board.turn = chess.WHITE
    if not board.is_valid() or board.is_check():
        return None
    return board


def mate_distance(score):
    score = score.pov(chess.WHITE)
    return score.mate() if score.is_mate() else None


def verify_line(engine, board, line, moves, depth):
    replay = board.copy()
    for ply, move in enumerate(line):
        if move not in replay.legal_moves:
            return False
        if ply % 2 == 0:
            infos = engine.analyse(
                replay,
                chess.engine.Limit(depth=depth),
                multipv=2,
            )
            if infos[0]["pv"][0] != move:
                return False
            best_distance = mate_distance(infos[0]["score"])
            remaining = moves - (ply // 2)
            if best_distance != remaining:
                return False
            if len(infos) > 1:
                second_distance = mate_distance(infos[1]["score"])
                if second_distance is not None and second_distance <= remaining:
                    return False
        else:
            best = engine.analyse(
                replay,
                chess.engine.Limit(depth=depth - 2),
            )
            if best["pv"][0] != move:
                return False
        replay.push(move)
    return replay.is_checkmate()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--moves", type=int, required=True)
    parser.add_argument("--count", type=int, required=True)
    parser.add_argument("--seed", type=int, default=20260613)
    parser.add_argument("--depth", type=int, default=20)
    parser.add_argument("--stockfish", default="/opt/homebrew/bin/stockfish")
    args = parser.parse_args()

    rng = random.Random(args.seed)
    engine = chess.engine.SimpleEngine.popen_uci(args.stockfish)
    found = 0
    checked = 0
    try:
        while found < args.count:
            checked += 1
            board = random_position(rng)
            if board is None:
                continue
            info = engine.analyse(board, chess.engine.Limit(depth=13))
            if mate_distance(info["score"]) != args.moves:
                continue
            line = info["pv"][: args.moves * 2 - 1]
            if len(line) != args.moves * 2 - 1:
                continue
            if not verify_line(engine, board, line, args.moves, args.depth):
                continue
            found += 1
            print(f"{found}. FEN {board.fen()}", flush=True)
            print(f"   LINE {' '.join(move.uci() for move in line)}", flush=True)
            print(f"   SAN {board.variation_san(line)}", flush=True)
            print(f"   CHECKED {checked}", flush=True)
    finally:
        engine.quit()


if __name__ == "__main__":
    main()
