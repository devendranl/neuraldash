import type { AchievementBadge } from "@/lib/data/achievements";

const BADGE_EMOJIS: Record<string, string> = {
  rocket: "\u{1F680}",
  fire: "\u{1F525}",
  brain: "\u{1F9E0}",
  star: "\u2B50",
  trophy: "\u{1F3C6}",
  diamond: "\u{1F48E}",
  handshake: "\u{1F91D}",
  sparkles: "\u2728",
};

const BADGE_GLOW_COLORS: Record<string, string> = {
  rocket: "shadow-[0_0_20px_rgba(234,88,12,0.4)]",
  fire: "shadow-[0_0_20px_rgba(239,68,68,0.4)]",
  brain: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
  star: "shadow-[0_0_20px_rgba(234,179,8,0.4)]",
  trophy: "shadow-[0_0_20px_rgba(234,88,12,0.4)]",
  diamond: "shadow-[0_0_20px_rgba(6,182,212,0.4)]",
  handshake: "shadow-[0_0_20px_rgba(34,197,94,0.4)]",
  sparkles: "shadow-[0_0_20px_rgba(37,99,235,0.4)]",
};

interface BadgeGalleryProps {
  badges: AchievementBadge[];
}

export function BadgeGallery({ badges }: BadgeGalleryProps) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Badge Collection</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div
            key={`${badge.type}:${badge.name}`}
            className={`relative p-5 rounded-2xl border text-center transition-all ${
              badge.earned
                ? `bg-nd-card border-nd-border ${BADGE_GLOW_COLORS[badge.icon] ?? ""}`
                : "bg-nd-surface/20 border-nd-border/20 opacity-40 grayscale"
            }`}
          >
            <div className="text-4xl mb-2">
              {BADGE_EMOJIS[badge.icon] ?? "\u{1F31F}"}
            </div>
            <div className="text-sm font-semibold mb-1">{badge.name}</div>
            <div className="text-xs text-slate-400">{badge.description}</div>
            {badge.earned && badge.awardedAt && (
              <div className="text-[10px] text-slate-500 mt-2 font-mono">
                {new Date(badge.awardedAt).toLocaleDateString()}
              </div>
            )}
            {!badge.earned && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl opacity-60">{"\u{1F512}"}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
