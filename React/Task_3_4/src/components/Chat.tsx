interface Props {
    player: "X" | "O";
}

export default function Chat({ player }: Props) {
    return (
        <div className="bg-[#111] rounded p-2 flex flex-col gap-2 h-40">
            <div className="flex-1 overflow-y-auto text-sm text-gray-300">
                <div className="bg-gray-700 rounded px-2 py-1 w-fit">
                    Hey, want to play a quick game of TIC Tac Toe?
                </div>
            </div>

            <div className="flex gap-2">
                <input 
                    className="flex-1 bg-[#222] text-white rounded px-2 py-1 text-sm outline-none"
                    placeholder="Message"
                />
                <button className="bg-green-600 px-3 rounded text-sm">Arrow</button>
            </div>
        </div>
    );
}