interface Props {
  value: "X" | "O" | null;
  disabled?: boolean;
  highlight?: boolean;
  onClick: () => void;
}

export default function Cell({ value, disabled, highlight, onClick }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-14 h-14 rounded text-5xl font-bold
        ${
          highlight || disabled
            ? "bg-[#1f1f1f] cursor-not-allowed text-yellow-400"
            : "bg-[#2a2a2a] hover:bg-[#333] text-yellow-400"
        }`}
    >
      {value}
    </button>
  );
}