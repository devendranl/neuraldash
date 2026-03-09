interface DifficultyBadgeProps {
  level: 1 | 2 | 3 | 4 | 5;
  size?: "sm" | "md" | "lg";
}

const levelConfig = {
  1: { label: "Easy", color: "text-nd-green bg-nd-green-dim border-nd-green", stars: 1 },
  2: { label: "Normal", color: "text-nd-cyan bg-cyan-950 border-nd-cyan", stars: 2 },
  3: { label: "Hard", color: "text-nd-yellow bg-nd-yellow-dim border-nd-yellow", stars: 3 },
  4: { label: "Harder", color: "text-nd-orange bg-nd-orange-dim border-nd-orange", stars: 4 },
  5: { label: "Insane", color: "text-nd-red bg-nd-red-dim border-nd-red", stars: 5 },
};

export function DifficultyBadge({ level, size = "md" }: DifficultyBadgeProps) {
  const config = levelConfig[level];
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-mono font-bold rounded-lg border
        ${config.color} ${sizeClasses[size]}
      `}
    >
      <span className="flex gap-0.5">
        {Array.from({ length: config.stars }).map((_, i) => (
          <span key={i} className="text-current">&#9733;</span>
        ))}
      </span>
      {config.label}
    </span>
  );
}
