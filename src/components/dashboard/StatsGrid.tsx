import { LEVEL_NAMES } from "@/lib/constants/xp";

interface StatsGridProps {
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  modulesCompleted: number;
  totalModules: number;
  totalXP: number;
}

export function StatsGrid({
  currentLevel,
  currentStreak,
  longestStreak,
  modulesCompleted,
  totalModules,
  totalXP,
}: StatsGridProps) {
  const stats = [
    {
      label: "Current Level",
      value: `Level ${currentLevel}`,
      sub: LEVEL_NAMES[currentLevel] ?? "",
      icon: "\u{1F3AF}",
    },
    {
      label: "Streak",
      value: `${currentStreak} days`,
      sub: `Best: ${longestStreak}`,
      icon: "\u{1F525}",
    },
    {
      label: "Modules Done",
      value: `${modulesCompleted}/${totalModules}`,
      sub: `Level ${currentLevel}`,
      icon: "\u{1F4DA}",
    },
    {
      label: "Total XP",
      value: totalXP.toLocaleString(),
      sub: "Keep going!",
      icon: "\u26A1",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-nd-card border border-nd-border rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              {stat.label}
            </span>
            <span className="text-lg">{stat.icon}</span>
          </div>
          <div className="text-xl font-bold font-mono">{stat.value}</div>
          <div className="text-xs text-slate-500 mt-0.5">{stat.sub}</div>
        </div>
      ))}
    </div>
  );
}
