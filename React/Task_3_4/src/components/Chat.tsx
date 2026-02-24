import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { sendMessage } from "../store/chatSlice";
import sendIcon from "../assets/send_icon.png";

interface Props {
    player: "X" | "O";
}

export default function Chat({ player }: Props) {
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.chat.messages);
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;

        dispatch(sendMessage({ player, text }));
        setText("");
    };

    return (
        <div className="bg-[#111] rounded p-2 flex flex-col gap-2 h-40">
            <div className="flex-1 overflow-y-auto text-sm text-gray-300 space-y-1">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`rounded px-2 py-1 w-fit max-w-[80%] ${
                            m.player === player
                            ? "bg-green-700 self-end ml-auto"
                            : "bg-gray-700"
                        }`}
                    >
                        <span className="text-xs opacity-70 mr-1">{m.player}:</span>
                        {m.text}
                    </div>
                ))}
            </div>

            <div className="relative">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full bg-[#222] text-white rounded px-2 pr-10 py-3 text-sm outline-none"
                    placeholder="Message"
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 rounded text-sm cursor-pointer"
                >
                    <img src={sendIcon} alt="Send Icon" className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}