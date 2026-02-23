import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../store/store";
import { makeMove, setWinner, clearBoardOnly } from "../store/gameSlice";
import { checkWinner } from "../utils/checkWinner";
import Cell from "./Cell";

interface Props {
    player: "X" | "O";
}

export default function Board({ player }: Props) {
    const dispatch = useDispatch();
    const board = useSelector((state: RootState) => state.game.board);
    const currentTurn = useSelector(
        (state:RootState) => state.game.currentTurn
    );
    const winner = useSelector((state: RootState) => state.game.winner);

    const isDisabled = 
        winner !== null || (currentTurn !== null && currentTurn !== player);

    useEffect(() => {
        const result = checkWinner(board);
        if (result && !winner) {
            dispatch(setWinner(result));

            setTimeout(() => {
                dispatch(clearBoardOnly());
            }, 5000);
        }
    }, [board, winner, dispatch]);

    return (
        <div className="grid grid-cols-3 gap-2 w-48 mx-auto">
            {board.map((cell, i) => (
                <Cell
                    key={i}
                    value={cell}
                    disabled={isDisabled || !!cell}
                    onClick={() => dispatch(makeMove(i))}
                />
            ))}
        </div>
    );
}