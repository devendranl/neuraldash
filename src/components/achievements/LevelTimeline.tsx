import type { LevelProgress } from "@/lib/data/achievements";

const LEVEL_COLORS: Record<number, string> = {
  1: "bg-nd-green",
  2: "bg-nd-cyan",
  3: "bg-nd-blue",
  4: "bg-nd-orange",
  5: "bg-nd-red",
};

const LEVEL_BORDER_COLORS: Record<number, string> = {
  1: "border-nd-green/40",
  2: "border-nd-cyan/40",
  3: "border-nd-blue/40",
  4: "border-nd-orange/40",
  5: "border-nd-red/40",
};

interface LevelTimelineProps {
  levels: LevelProgress[];
  currentLevel: number;
}

export function LevelTimeline({ levels, currentLevel }: LevelTimelineProps) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Level Progression</h2>
      <div className="space-y-4">
        {levels.map((level) => {
          const isCurrent = level.level === currentLevel;
          const pct =
            level.totalModules > 0
              ? Math.round(
                  (level.completedModules / level.totalModules) * 100
                )
              : 0;

          return (
            <div
              key={level.level}
              className={`p-4 rounded-2xl border transition-all ${
                level.unlocked
                  ? `bg-nd-card ${LEVEL_BORDER_COLORS[level.level] ?? "border-nd-border"} ${isCurrent ? "ring-1 ring-nd-orange/30" : ""}`
                  : "bg-nd-surface/20 border-nd-border/20 opacity-50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm text-white ${LEVEL_COLORS[level.level] ?? "bg-nd-blue"}`}
                  >
                    {level.level}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{level.name}</div>
                    {isCurrent && (
                      <span className="text-[10px] font-mono text-nd-orange uppercase tracking-wider">
                        Current
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {level.unlocked
                    ? `${level.completedModules}/${level.totalModules}`
                    : "Locked"}
                </div>
              </div>
              {level.unlocked && level.totalModules > 0 && (
                <div className="h-2 bg-nd-surface rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${LEVEL_COLORS[level.level] ?? "bg-nd-blue"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
