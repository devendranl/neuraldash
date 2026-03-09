import type { DashboardBadge } from "@/lib/types/dashboard";

const BADGE_ICONS: Record<string, string> = {
  "First Login": "\u{1F680}",
  "7-Day Streak": "\u{1F525}",
  "Quiz Ace": "\u{1F9E0}",
  "Level Clear": "\u2B50",
  "Code Warrior": "\u{1F3C6}",
  "Speed Learner": "\u{1F48E}",
};

interface BadgeGridProps {
  badges: DashboardBadge[];
}

export function BadgeGrid({ badges }: BadgeGridProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-4">Badges</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {badges.map((b) => (
          <div
            key={b.name}
            className={`text-center p-4 rounded-2xl border ${
              b.earned
                ? "bg-nd-card border-nd-border"
                : "bg-nd-surface/30 border-nd-border/30 opacity-40"
            }`}
          >
            <div className="text-2xl mb-1">
              {BADGE_ICONS[b.name] ?? "\u{1F31F}"}
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              {b.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
