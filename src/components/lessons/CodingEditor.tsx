"use client";

import { useState, useEffect } from "react";
import type { CodingContent } from "@/lib/types/module-content";
import { OrangeBtn } from "@/components/ui/OrangeBtn";
import { GhostBtn } from "@/components/ui/GhostBtn";

interface CodingEditorProps {
  content: CodingContent;
  externalUrl: string | null;
  onStart: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export function CodingEditor({
  content,
  externalUrl,
  onStart,
  onComplete,
  isCompleted,
}: CodingEditorProps) {
  const [code, setCode] = useState(content.starterCode);
  const [started, setStarted] = useState(false);

  const url = externalUrl ?? content.externalUrl;

  useEffect(() => {
    if (!started) {
      setStarted(true);
      onStart();
    }
  }, [started, onStart]);

  return (
    <div>
      {/* Instructions */}
      <div className="bg-nd-card border border-nd-border rounded-2xl p-5 mb-6">
        <h3 className="font-bold text-sm mb-2 text-nd-cyan">Instructions</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {content.instructions}
        </p>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-xs text-nd-blue hover:text-nd-blue-hi underline font-mono"
          >
            Open external tool {"\u2197"}
          </a>
        )}
      </div>

      {/* Code Editor */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Code Editor
          </span>
          <button
            onClick={() => setCode(content.starterCode)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors font-mono"
          >
            Reset
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-80 p-4 rounded-2xl bg-nd-surface border border-nd-border font-mono text-sm text-slate-200 leading-relaxed resize-y focus:outline-none focus:border-nd-blue focus:shadow-glow transition-all"
        />
      </div>

      {/* Actions */}
      {!isCompleted && (
        <div className="flex items-center gap-3 justify-center">
          <OrangeBtn onClick={onComplete}>Mark as Complete</OrangeBtn>
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <GhostBtn>Open in External Tool</GhostBtn>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
