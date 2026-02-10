// helper function to format seconds into MM:SS format
export default function formatTime(totalSeconds) {
    const mm = Math.floor(totalSeconds / 60).toString().padStart(2, "0"); // padStart ensures we always have two digits (e.g., 5 -> "05")
    const ss = (totalSeconds % 60).toString().padStart(2, "0"); // padStart ensures we always have two digits (e.g., 5 -> "05")
    return `${mm}:${ss}`;
}