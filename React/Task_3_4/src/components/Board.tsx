import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../store/store";
import { makeMove, setWinner, clearBoardOnly } from "../store/gameSlice";
import { checkWinner } from "../utils/checkWinner";
import Cell from "./Cell";

interface Props {
  player: "X" | "O";
}

function getWinLineClass(line: number[]) {
  const key = line.join(",");

  switch (key) {
    // horizontal
    case "0,1,2":
      return "top-[25px] left-0 right-0 h-[4px]";
    case "3,4,5":
      return "top-1/2 -translate-y-1/2 left-0 right-0 h-[4px]";
    case "6,7,8":
      return "bottom-[25px] left-0 right-0 h-[4px]";

    // vertical
    case "0,3,6":
      return "left-[25px] top-0 bottom-0 w-[4px]";
    case "1,4,7":
      return "left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px]";
    case "2,5,8":
      return "right-[25px] top-0 bottom-0 w-[4px]";

    // diagonal
    case "0,4,8":
      return "top-1/2 left-0 right-0 h-[4px] rotate-45";
    case "2,4,6":
      return "top-1/2 left-0 right-0 h-[4px] -rotate-45";

    default:
      return "";
  }
}

export default function Board({ player }: Props) {
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.game.board);
  const currentTurn = useSelector(
    (state: RootState) => state.game.currentTurn
  );
  const winner = useSelector((state: RootState) => state.game.winner);
  const winningLine = useSelector(
    (state: RootState) => state.game.winningLine
  );

  const isDisabled =
    winner !== null ||
    (currentTurn !== null && currentTurn !== player) ||
    (currentTurn === null && player !== "X");

  // Detect winner once per move (only on the X panel to avoid double dispatch)
  useEffect(() => {
    if (player !== "X") return;

    const result = checkWinner(board);
    if (result && !winner) {
      dispatch(setWinner(result));
    }
  }, [board, winner, dispatch, player]);

  // Auto-clear board 5s after game ends; cancelled if user resets (winner becomes null)
  useEffect(() => {
    if (player !== "X") return;
    if (!winner) return;

    const timeoutId = setTimeout(() => {
      dispatch(clearBoardOnly());
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [winner, dispatch, player]);

  return (
    <div className="relative w-48 mx-auto">
        {winningLine && (
            <div
            className={`absolute bg-white rounded
                transition-all duration-300 ${getWinLineClass(winningLine)}`}
            />
        )}

        <div className="grid grid-cols-3 gap-2">
            {board.map((cell, i) => (
                <Cell
                key={i}
                value={cell}
                disabled={isDisabled || !!cell}
                highlight={winningLine?.includes(i)}
                onClick={() => dispatch(makeMove(i))}
                />
            ))}
        </div>
    </div>
  );
}