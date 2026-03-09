"use client";

interface OrangeBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
}

export function OrangeBtn({
  children,
  onClick,
  disabled = false,
  size = "md",
  className = "",
  type = "button",
}: OrangeBtnProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        bg-nd-orange text-white font-semibold rounded-xl
        transition-all duration-300
        hover:bg-nd-orange-hi hover:shadow-glow-orange hover:-translate-y-0.5
        active:translate-y-0 active:shadow-none
        disabled:bg-nd-orange-dim disabled:text-slate-500 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none
        ${className}
      `}
    >
      {children}
    </button>
  );
}
