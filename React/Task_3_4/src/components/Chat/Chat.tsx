import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { sendMessage } from "../../store/chatSlice";
import sendIcon from "../../assets/send_icon.png";

interface Props {
    player: "X" | "O";
}

export default function Chat({ player }: Props) {
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.chat.messages);
    const [text, setText] = useState("");
    const label = player === "X" ? "Player 1" : "Player 2";

    const handleSend = () => {
        if (!text.trim()) return;

        dispatch(sendMessage({ player, text, timestamp: Date.now() }));
        setText("");
    };

    return (
        <div>
            <h2 className="bg-[#222222] p-2 rounded-t-md">
                <span className="text-yellow-500 font-bold bg-[#313131] rounded-[50%] p-[3px] px-2">
                {player}
                </span>{" "}
                {label} :
            </h2>

            <div className="bg-[#313131] p-2 flex flex-col gap-2 h-70 pb-4">
                <div className="flex-1 overflow-y-auto text-sm text-gray-300 space-y-1 pr-2 pl-2 chat-scroll">
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`flex flex-col rounded px-2 py-1 w-fit max-w-[80%] ${
                                m.player === player
                                ? "bg-[#00AE1C] self-end ml-auto"
                                : "bg-[#737373]"
                            }`}
                        >
                            <span>{m.text}</span>
                            <span className="text-[11px] text-gray-200 self-end">
                                {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="relative pl-2 pr-2">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full bg-[#424242] border border-[#8B8B8B] text-white rounded px-2 pr-10 py-3 text-sm outline-none"
                        placeholder="Message"
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-1 top-1/2 -translate-y-1/2 px-5 rounded text-sm cursor-pointer"
                    >
                        <img src={sendIcon} alt="Send Icon" className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
