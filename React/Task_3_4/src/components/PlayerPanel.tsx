import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Board from "./Board";
import Chat from "./Chat";

interface Props {
    player: "X" | "O";
}

export default function PlayerPanel({ player }: Props) {
    const winner = useSelector((state: RootState) => state.game.winner);
    const currentTurn = useSelector(
        (state: RootState) => state.game.currentTurn
    );

    let status = "Game started! Your turn.";
    let statusClass = "text-yellow-400";

    if (winner === "draw") {
        status = "Draw!";
    } else if (winner === player) {
        status = "You win!";
        statusClass = "text-green-400";
    } else if (winner && winner !== player) {
        status="You lost!";
        statusClass = "text-red-400";
    } else if (currentTurn && currentTurn !== player) {
        status= "Opponent's turn";
        statusClass = "text-gray-300";
    }

    return (
        <div
            className={`p-4 flex flex-col gap-4  bg-[#1a1a1a]`}
        >
            <div className={`text-center text-base ${statusClass}`}>{status}</div>
            <Board player={player} />
            <Chat player={player} />
        </div>
    );
}