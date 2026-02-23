import PlayerPanel from "../components/PlayerPanel";

export default function Game() {
    return (
        <div className="min-h-screen bg-gray-300 p-6">
            <div className="max-w-6xl mx-auto bg-[#111] text-white rounded-lg shadow-lg p-6">
                <h1 className="text-gray-400 mb-4">Tic Tac Toe</h1>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-400">Player 1</span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Score: 0 : 0</span>
                        <button className="bg-green-600 px-2 py-1 rounded text-sm">
                            Reset
                        </button>
                    </div>
                    <span className="text-sm text-gray-400">Player 2</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <PlayerPanel player="X" />
                    <PlayerPanel player="O" />
                </div>
            </div>
        </div>
    );
}