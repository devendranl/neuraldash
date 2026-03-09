"use client";

import { useState, useEffect } from "react";
import { usePyodide } from "@/hooks/use-pyodide";
import { OrangeBtn } from "@/components/ui/OrangeBtn";

interface PyodideWorkspaceProps {
  moduleId: string;
  moduleTitle: string;
  instructions: string;
  starterCode: string;
}

export function PyodideWorkspace({
  moduleId,
  moduleTitle,
  instructions,
  starterCode,
}: PyodideWorkspaceProps) {
  const [code, setCode] = useState(starterCode);
  const [completed, setCompleted] = useState(false);
  const { loading, ready, output, error, running, initialize, runCode } =
    usePyodide();

  useEffect(() => {
    initialize();
  }, [initialize]);

  async function handleRun() {
    await runCode(code);
  }

  async function handleComplete() {
    // Run the code first
    await runCode(code);

    // Mark module as complete via progress API
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, action: "complete" }),
      });
      setCompleted(true);
    } catch {
      // Silently fail — progress will sync later
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-nd-card border border-nd-border rounded-2xl p-5">
        <h2 className="text-lg font-bold mb-2">{moduleTitle}</h2>
        <p className="text-sm text-slate-400 whitespace-pre-wrap">
          {instructions}
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-nd-card border border-nd-border rounded-2xl p-8 text-center">
          <div className="animate-glow-pulse text-4xl mb-3">{"\u{1F40D}"}</div>
          <div className="text-sm text-slate-400">
            Loading Python environment...
          </div>
          <div className="text-xs text-slate-500 mt-1">
            First load may take a moment (~10MB)
          </div>
        </div>
      )}

      {/* Editor */}
      {(ready || (!loading && !error)) && (
        <div className="bg-nd-card border border-nd-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-nd-border bg-nd-surface/50">
            <span className="text-xs font-mono text-slate-400">
              {"\u{1F40D}"} Python Editor
            </span>
            <div className="flex gap-2">
              <OrangeBtn
                size="sm"
                onClick={handleRun}
                disabled={running || !ready}
              >
                {running ? "Running..." : "Run"}
              </OrangeBtn>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full min-h-[300px] p-4 bg-nd-bg text-nd-green font-mono text-sm resize-y focus:outline-none"
            spellCheck={false}
          />
        </div>
      )}

      {/* Output */}
      {(output || error) && (
        <div className="bg-nd-card border border-nd-border rounded-2xl overflow-hidden">
          <div className="px-4 py-2 border-b border-nd-border bg-nd-surface/50">
            <span className="text-xs font-mono text-slate-400">Output</span>
          </div>
          <pre className="p-4 text-sm font-mono overflow-auto max-h-[300px]">
            {output && <span className="text-nd-green">{output}</span>}
            {error && <span className="text-nd-red">{error}</span>}
          </pre>
        </div>
      )}

      {/* Complete button */}
      {ready && !completed && (
        <div className="flex justify-end">
          <OrangeBtn onClick={handleComplete} disabled={running}>
            Complete & Earn XP
          </OrangeBtn>
        </div>
      )}

      {completed && (
        <div className="bg-nd-green/10 border border-nd-green/30 rounded-2xl p-4 text-center">
          <span className="text-nd-green font-semibold">
            {"\u2705"} Module completed! +150 XP earned.
          </span>
        </div>
      )}
    </div>
  );
}
