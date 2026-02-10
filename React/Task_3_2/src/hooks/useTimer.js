import { useEffect, useRef, useState } from "react";

export default function useTimer(initialSeconds = 0, autoStart = false) {
    const [seconds, setSeconds] = useState(initialSeconds); // local ticking time in seconds
    const [isRunning, setIsRunning] = useState(autoStart); // controls play/pause state
    const intervalRef = useRef(null); // keep interval id without causing re-renders

    useEffect(() => {
        if (!isRunning) return;
        intervalRef.current = setInterval(() => {
            setSeconds((prev) => prev + 1); //increment at each second
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts or when isRunning changes
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    const toggle = () => setIsRunning((prev) => !prev); // toggle between play and pause
    const reset = () => setSeconds(0); // reset time back to zero
    const pause = () => setIsRunning(false); // helper to pause the timer without toggling

    return { seconds, isRunning, toggle, reset, pause };
}