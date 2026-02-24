import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { resetGame } from "../store/gameSlice";
import { resetChat } from "../store/chatSlice";
import PlayerPanel from "../components/PlayerPanel.tsx";

export default function Game() {
    const dispatch = useDispatch();
    const score = useSelector((state: RootState) => state.game.score);

    const handleReset = () => {
        dispatch(resetGame());
        dispatch(resetChat());
    };
    
    return (
        <div className="min-h-screen bg-gray-300 p-6">
            <div className="max-w-6xl mx-auto bg-[#111] text-white rounded-lg shadow-lg p-20 divide-y divide-gray-700">

                <div className="flex items-center justify-between pb-5">
                    <span className="text-base text-gray-400">Player 1</span>
                    <div className="flex items-center gap-2">
                        <span className="text-base text-gray-400">Score: {score.X} : {score.O}</span>
                        <button 
                            className="bg-green-600 px-2 py-1 rounded text-base cursor-pointer hover:bg-green-700" 
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>
                    <span className="text-base text-gray-400">Player 2</span>
                </div>

                <div className="grid grid-cols-2 gap-0 divide-x divide-gray-700">
                    <PlayerPanel player="X" />
                    <PlayerPanel player="O" />
                </div>
            </div>
        </div>
    );
}