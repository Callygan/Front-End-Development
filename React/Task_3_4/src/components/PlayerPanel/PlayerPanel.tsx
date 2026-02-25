import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Board from "../Board/Board.tsx";
import Chat from "../Chat/Chat.tsx";

interface Props {
    player: "X" | "O";
}

export default function PlayerPanel({ player }: Props) {
    const winner = useSelector((state: RootState) => state.game.winner);
    const currentTurn = useSelector(
        (state: RootState) => state.game.currentTurn
    );

    let status = "Your turn.";
    let statusClass = "text-yellow-400";

    if (winner === "draw") {
        status = "Draw!";
    } else if (winner === player) {
        status = "You win!";
        statusClass = "text-green-400";
    } else if (winner && winner !== player) {
        status = "You lost!";
        statusClass = "text-red-400";
    } else if (currentTurn === null) {
        if (player === "X") {
            status = "Game started! Your turn.";
            statusClass = "text-yellow-400";
        } else {
            status = "Game started! Wait your opponent.";
            statusClass = "text-yellow-400";
        }
    } else if (currentTurn !== player) {
        status = "Opponent's turn.";
        statusClass = "text-yellow-400";
    }

    return (
        <div
            className={`p-4 pb-0 flex flex-col gap-4  bg-[#111]`}
        >
            <div className={`text-center text-base ${statusClass}`}>{status}</div>
            <Board player={player} />
            <Chat player={player} />
        </div>
    );
}
