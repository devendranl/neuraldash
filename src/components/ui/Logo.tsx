interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = { sm: 32, md: 48, lg: 64 };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <svg
        width={s}
        height={s}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="NeuralDash logo"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        {/* Hexagon */}
        <path
          d="M32 4L56.7 18V46L32 60L7.3 46V18L32 4Z"
          stroke="url(#logo-grad)"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Neural nodes */}
        <circle cx="32" cy="20" r="4" fill="#2563eb" />
        <circle cx="20" cy="38" r="4" fill="#06b6d4" />
        <circle cx="44" cy="38" r="4" fill="#ea580c" />
        <circle cx="32" cy="48" r="3" fill="#22c55e" />
        {/* Connections */}
        <line x1="32" y1="24" x2="20" y2="34" stroke="#1e3a5f" strokeWidth="1.5" />
        <line x1="32" y1="24" x2="44" y2="34" stroke="#1e3a5f" strokeWidth="1.5" />
        <line x1="20" y1="42" x2="32" y2="45" stroke="#1e3a5f" strokeWidth="1.5" />
        <line x1="44" y1="42" x2="32" y2="45" stroke="#1e3a5f" strokeWidth="1.5" />
        {/* Orbit dots */}
        <circle cx="14" cy="28" r="2" fill="#2563eb" opacity="0.5" />
        <circle cx="50" cy="28" r="2" fill="#ea580c" opacity="0.5" />
        <circle cx="32" cy="56" r="2" fill="#22c55e" opacity="0.5" />
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-bold bg-gradient-to-r from-nd-blue-hi to-nd-orange bg-clip-text text-transparent ${
              size === "lg" ? "text-3xl" : size === "md" ? "text-xl" : "text-base"
            }`}
          >
            NeuralDash
          </span>
          {size !== "sm" && (
            <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
              AI Learning Companion
            </span>
          )}
        </div>
      )}
    </div>
  );
}
