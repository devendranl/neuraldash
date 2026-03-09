export default function ModuleLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="relative mb-6">
          <span className="text-6xl inline-block animate-[float_1.5s_ease-in-out_infinite]">
            {"\u{1F4BB}"}
          </span>
        </div>
        <h2 className="text-lg font-bold mb-2">Loading your challenge...</h2>
        <p className="text-slate-400 text-sm">
          Preparing the code editor and Python runtime
        </p>
        <div className="mt-6 w-48 h-1.5 bg-nd-surface rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-nd-green rounded-full"
            style={{
              animation: "cube-run 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}
