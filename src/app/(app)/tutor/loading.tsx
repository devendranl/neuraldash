export default function TutorLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="relative mb-6">
          <span className="text-7xl inline-block animate-[float_2s_ease-in-out_infinite]">
            {"\u{1F916}"}
          </span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-nd-cyan rounded-full animate-[glow-pulse_1s_ease-in-out_infinite]" />
        </div>
        <h2 className="text-xl font-bold mb-2 animate-[slide-up_0.5s_ease-out]">
          Byte is booting up...
        </h2>
        <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto animate-[slide-up_0.5s_ease-out_0.1s_both]">
          Your AI tutor is loading previous conversations and getting
          ready to help you learn.
        </p>
        <div className="flex justify-center gap-2">
          {["H", "e", "l", "l", "o", "!"].map((char, i) => (
            <span
              key={i}
              className="text-nd-cyan font-mono font-bold text-lg"
              style={{
                animation: `float 1.2s ease-in-out ${i * 0.1}s infinite`,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
