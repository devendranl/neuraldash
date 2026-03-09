interface GDProgressBarProps {
  progress: number; // 0–100
  showLabel?: boolean;
  className?: string;
}

export function GDProgressBar({
  progress,
  showLabel = true,
  className = "",
}: GDProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1.5">
          <span className="text-xs font-mono text-slate-400">PROGRESS</span>
          <span className="text-xs font-mono text-nd-cyan font-bold">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
      <div className="w-full h-3 bg-nd-surface rounded-full border border-nd-border overflow-hidden">
        <div
          className="gd-progress-bar h-full"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
