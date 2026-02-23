interface Props {
    value: "X" | "O" | null;
    disabled?: boolean;
    onClick: () => void;
}

export default function Cell({ value, disabled, onClick }: Props) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`w-14 h-14 rounded text-3xl font-bold text-yellow-400 ${disabled ? "bg-[#1f1f1f] cursor-not-allowed" : "bg-[#2a2a2a] hover:bg-[#333]"}`}
        >
            {value}
        </button>
    );
}