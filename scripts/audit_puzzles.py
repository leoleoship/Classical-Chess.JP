#!/usr/bin/env python3
import argparse
import re
from pathlib import Path

import chess
import chess.engine


PUZZLE_PATTERN = re.compile(
    r'\{ id: "([^"]+)".*?fen: "([^"]+)".*?line: \[([^\]]*)\]',
)
MAP_ENTRY_PATTERN = re.compile(r'^\s*"([^"]+)": \[([^\]]+)\],?$', re.MULTILINE)
FEN_ENTRY_PATTERN = re.compile(r'^\s*"([^"]+)": "([^"]+)",?$', re.MULTILINE)
QUOTED_PATTERN = re.compile(r'"([^"]+)"')
LOCKED_PATTERN = re.compile(
    r"const stockfishLockedPuzzles = new Set\(\[(.*?)\]\);",
    re.DOTALL,
)
SLIDERS = {chess.BISHOP, chess.ROOK, chess.QUEEN}


def section(source, start, end):
    return source.split(start, 1)[1].split(end, 1)[0]


def parse_puzzles(source, apply_naturalization=True):
    puzzles = {}
    for puzzle_id, fen, line_source in PUZZLE_PATTERN.findall(source):
        puzzles[puzzle_id] = {
            "id": puzzle_id,
            "fen": fen,
            "line": QUOTED_PATTERN.findall(line_source),
        }

    opening_source = section(
        source,
        "const extendedPuzzleOpenings = {",
        "chessPuzzles.forEach((puzzle) => {",
    )
    for puzzle_id, values_source in MAP_ENTRY_PATTERN.findall(opening_source):
        values = QUOTED_PATTERN.findall(values_source)
        if puzzle_id not in puzzles or not values:
            continue
        puzzles[puzzle_id]["fen"] = values[0]
        puzzles[puzzle_id]["line"] = values[1:] + puzzles[puzzle_id]["line"]

    if apply_naturalization:
        natural_source = section(
            source,
            "const naturalPuzzlePositions = {",
            "function squaresBetween",
        )
        natural_positions = dict(FEN_ENTRY_PATTERN.findall(natural_source))
        locked_match = LOCKED_PATTERN.search(source)
        locked_puzzles = (
            set(QUOTED_PATTERN.findall(locked_match.group(1))) if locked_match else set()
        )
        for puzzle in puzzles.values():
            if puzzle["id"] not in locked_puzzles:
                puzzle["fen"] = naturalize(puzzle, natural_positions.get(puzzle["id"]))
    return puzzles


def squares_between(move):
    from_file = chess.square_file(move.from_square)
    to_file = chess.square_file(move.to_square)
    from_rank = chess.square_rank(move.from_square)
    to_rank = chess.square_rank(move.to_square)
    file_step = (to_file > from_file) - (to_file < from_file)
    rank_step = (to_rank > from_rank) - (to_rank < from_rank)
    squares = []
    file_index = from_file + file_step
    rank_index = from_rank + rank_step
    while file_index != to_file or rank_index != to_rank:
        squares.append(chess.square(file_index, rank_index))
        file_index += file_step
        rank_index += rank_step
    return squares


def naturalize(puzzle, natural_fen):
    if not natural_fen:
        return puzzle["fen"]
    tactical = chess.Board(puzzle["fen"])
    replay = tactical.copy()
    routes = set()
    for move_key in puzzle["line"]:
        move = chess.Move.from_uci(move_key)
        piece = replay.piece_at(move.from_square)
        if piece and piece.piece_type in SLIDERS:
            routes.update(squares_between(move))
        if move not in replay.legal_moves:
            return puzzle["fen"]
        replay.push(move)

    natural = chess.Board(natural_fen)
    for square in routes:
        if tactical.piece_at(square) is None and natural.piece_at(square) is not None:
            natural.remove_piece_at(square)

    replay = natural.copy()
    for move_key in puzzle["line"]:
        move = chess.Move.from_uci(move_key)
        if move not in replay.legal_moves:
            return puzzle["fen"]
        replay.push(move)
    return natural.fen() if replay.is_checkmate() else puzzle["fen"]


def score_text(score):
    if score.is_mate():
        return f"#{score.mate():+d}"
    return f"{score.score():+d}"


def equivalent_scores(first, second, centipawn_tolerance):
    if first.is_mate() or second.is_mate():
        return first.is_mate() and second.is_mate() and first.mate() == second.mate()
    return abs(first.score() - second.score()) <= centipawn_tolerance


def numeric_score(score):
    return score.score(mate_score=100000)


def audit_puzzle(engine, puzzle, limit, centipawn_tolerance):
    board = chess.Board(puzzle["fen"])
    findings = []
    for ply, move_key in enumerate(puzzle["line"]):
        move = chess.Move.from_uci(move_key)
        if move not in board.legal_moves:
            findings.append((ply, "illegal", move_key, "", ""))
            break

        side = board.turn
        infos = engine.analyse(board, limit, multipv=3)
        best_move = infos[0]["pv"][0]
        best_score = infos[0]["score"].pov(side)
        scripted_info = next((info for info in infos if info["pv"][0] == move), None)
        if scripted_info is None:
            scripted_info = engine.analyse(board, limit, root_moves=[move])
        scripted_score = scripted_info["score"].pov(side)

        scripted_is_worse = numeric_score(scripted_score) < (
            numeric_score(best_score) - centipawn_tolerance
        )
        if move != best_move and scripted_is_worse:
            findings.append(
                (
                    ply,
                    "weaker",
                    move_key,
                    best_move.uci(),
                    f"{score_text(scripted_score)} vs {score_text(best_score)}",
                )
            )
        elif (
            ply % 2 == 0
            and len(infos) > 1
            and infos[1]["pv"][0] != move
            and equivalent_scores(
                best_score,
                infos[1]["score"].pov(side),
                centipawn_tolerance,
            )
        ):
            findings.append(
                (
                    ply,
                    "nonunique",
                    move_key,
                    infos[1]["pv"][0].uci(),
                    score_text(best_score),
                )
            )
        board.push(move)

    if len(board.move_stack) == len(puzzle["line"]) and not board.is_checkmate():
        findings.append((len(puzzle["line"]), "not_mate", "", "", ""))
    return findings


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--app", default="app.js")
    parser.add_argument("--stockfish", default="/opt/homebrew/bin/stockfish")
    parser.add_argument("--depth", type=int, default=16)
    parser.add_argument("--cp-tolerance", type=int, default=12)
    parser.add_argument("--no-naturalization", action="store_true")
    args = parser.parse_args()

    source = Path(args.app).read_text()
    puzzles = parse_puzzles(source, not args.no_naturalization)
    engine = chess.engine.SimpleEngine.popen_uci(args.stockfish)
    all_findings = {}
    try:
        for index, puzzle in enumerate(puzzles.values(), start=1):
            findings = audit_puzzle(
                engine,
                puzzle,
                chess.engine.Limit(depth=args.depth),
                args.cp_tolerance,
            )
            if findings:
                all_findings[puzzle["id"]] = findings
            print(f"[{index:02d}/{len(puzzles)}] {puzzle['id']}: {len(findings)} finding(s)")
    finally:
        engine.quit()

    print("\nFindings")
    for puzzle_id, findings in all_findings.items():
        for ply, kind, scripted, best, score in findings:
            print(
                f"{puzzle_id} ply {ply + 1}: {kind}; "
                f"scripted={scripted or '-'} best/alternate={best or '-'} {score}"
            )
    print(f"\n{len(all_findings)} of {len(puzzles)} puzzles need review.")


if __name__ == "__main__":
    main()
