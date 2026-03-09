interface XPBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
}

export function XPBar({ currentXP, nextLevelXP, level }: XPBarProps) {
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-nd-orange-dim border border-nd-orange">
        <span className="font-mono font-bold text-nd-orange text-sm">
          L{level}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-xs font-mono text-slate-400">
            {currentXP.toLocaleString()} XP
          </span>
          <span className="text-xs font-mono text-slate-500">
            {nextLevelXP.toLocaleString()} XP
          </span>
        </div>
        <div className="w-full h-2.5 bg-nd-surface rounded-full border border-nd-border overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-nd-orange to-nd-orange-hi shadow-glow-orange transition-all duration-700"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
