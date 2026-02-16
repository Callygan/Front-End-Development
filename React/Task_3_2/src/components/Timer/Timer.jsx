import { useCallback, useMemo, useRef } from "react";
import useTimer from "../../hooks/useTimer";
import formatTime from "../../utils/formatTime";

export default function Timer() {
    const { seconds, isRunning, toggle } = useTimer(0, false);
    
    // track render count without forcing re-render
    const rendersRef = useRef(0);
    rendersRef.current += 1;
    
    const timeLabel = useMemo(() => formatTime(seconds), [seconds]); // memoize formatted time to avoid recomputing on unrelated renders
    const handleToggle = useCallback(() => toggle(), [toggle]); // stable handlers for play/pause and reset
    

    return (
        <div className="p-5 space-y-8">
            <div className="flex flex-col items-center justify-between text-black gap-4">
                    <p className="text-7xl font-semibold">{timeLabel}</p>
                    <p className="text-xl mt-1">
                        Number of component renders: {rendersRef.current}
                    </p>
            </div>

            <div className="h-px bg-slate-300" />

                <div className="flex flex-col gap-3 ">
                    <button
                        type="button"
                        onClick={handleToggle}
                        className={`w-1/2 mx-auto px-4 py-3 rounded-lg text-sm font-semibold ${
                            isRunning
                                ? "bg-sky-400 text-slate-900 cursor-pointer hover:bg-sky-500"
                                : "bg-emerald-400 text-slate-900 cursor-pointer hover:bg-emerald-500"
                        }`}
                        aria-pressed={isRunning}
                    >
                        {isRunning ? "\u23F8 Pause" : "\u25B6 Play"}
                    </button>
                    {/* Reset button removed by request */}
                </div>
            </div>
    );
}