import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Board from "./Board";
import Chat from "./Chat";

interface Props {
    player: "X" | "O";
}

export default function PlayerPanel({ player }: Props) {
    const winner = useSelector((state: RootState) => state.game.winner);

    let status = "Game started! Your turn.";

    if (winner === "draw") {
        status= "Draw!";
    } else if (winner === player) {
        status = "You won!";
    } else if (winner && winner !== player) {
        status = "You lost!";
    }

    return (
        <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col gap-4">
            <div className="text-center text-yellow-400 text-sm">{status}</div>
            <Board player={player} />
            <Chat player={player} />
        </div>
    );
}