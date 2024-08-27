interface IPulsatingDotProps {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

function PulsatingDot({
  top,
  right,
  bottom,
  left,
}: IPulsatingDotProps) {
  return (
    <div
      className={`absolute ${
        top + " " + right + " " + bottom + " " + left
      }`}
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
      </span>
    </div>
  );
}

export default PulsatingDot;
