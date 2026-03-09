"use client";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">{"\u{1F6A7}"}</div>
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="text-slate-400 text-sm mb-6">
          {error.message || "An unexpected error occurred. Don't worry — your progress is safe!"}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-nd-orange text-white font-semibold rounded-xl hover:bg-nd-orange-hi hover:shadow-glow-orange transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
