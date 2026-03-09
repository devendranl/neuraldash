export default function CodeLabLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="relative mb-6">
          <span className="text-7xl inline-block animate-[float_2s_ease-in-out_infinite]">
            {"\u{1F40D}"}
          </span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-nd-green/20 rounded-full animate-[glow-pulse_2s_ease-in-out_infinite]" />
        </div>
        <h2 className="text-xl font-bold mb-2 animate-[slide-up_0.5s_ease-out]">
          Warming up the Python engine...
        </h2>
        <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto animate-[slide-up_0.5s_ease-out_0.1s_both]">
          Setting up your in-browser coding environment. This is basically
          magic.
        </p>
        <div className="flex justify-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-nd-green"
              style={{
                animation: `glow-pulse 1.4s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
