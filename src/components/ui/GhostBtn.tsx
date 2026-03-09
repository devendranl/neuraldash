"use client";

interface GhostBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function GhostBtn({
  children,
  onClick,
  disabled = false,
  className = "",
}: GhostBtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 text-base font-semibold rounded-xl
        border-2 border-nd-blue text-nd-blue-hi bg-transparent
        transition-all duration-300
        hover:bg-nd-blue/10 hover:shadow-glow hover:-translate-y-0.5
        active:translate-y-0
        disabled:border-nd-border disabled:text-slate-600 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}
