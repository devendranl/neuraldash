export default function AchievementsLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="relative mb-6">
          <span className="text-7xl inline-block animate-[float_2s_ease-in-out_infinite]">
            {"\u{1F3C6}"}
          </span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-nd-yellow/10 rounded-full animate-[glow-pulse_2s_ease-in-out_infinite]" />
        </div>
        <h2 className="text-xl font-bold mb-2 animate-[slide-up_0.5s_ease-out]">
          Polishing your trophies...
        </h2>
        <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto animate-[slide-up_0.5s_ease-out_0.1s_both]">
          Counting badges, tallying XP, and admiring your progress. You&apos;ve
          been busy!
        </p>
        <div className="flex justify-center gap-3">
          {["\u{1F680}", "\u{1F525}", "\u{1F9E0}", "\u2B50", "\u{1F3C6}"].map(
            (emoji, i) => (
              <span
                key={i}
                className="text-2xl"
                style={{
                  animation: `slide-up 0.4s ease-out ${i * 0.1}s both, glow-pulse 2s ease-in-out ${i * 0.3}s infinite`,
                }}
              >
                {emoji}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
