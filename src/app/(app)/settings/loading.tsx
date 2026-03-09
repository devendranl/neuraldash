export default function SettingsLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="relative mb-6">
          <span
            className="text-6xl inline-block"
            style={{
              animation: "float 3s ease-in-out infinite",
            }}
          >
            {"\u2699\uFE0F"}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-2 animate-[slide-up_0.5s_ease-out]">
          Loading your settings...
        </h2>
        <p className="text-slate-400 text-sm max-w-xs mx-auto animate-[slide-up_0.5s_ease-out_0.1s_both]">
          Fetching your profile and preferences.
        </p>
      </div>
    </div>
  );
}
