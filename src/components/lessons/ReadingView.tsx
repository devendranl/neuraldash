"use client";

import { useState, useEffect } from "react";
import type { ReadingContent } from "@/lib/types/module-content";
import { OrangeBtn } from "@/components/ui/OrangeBtn";

interface ReadingViewProps {
  content: ReadingContent;
  onStart: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export function ReadingView({
  content,
  onStart,
  onComplete,
  isCompleted,
}: ReadingViewProps) {
  const [sectionsRead, setSectionsRead] = useState<Set<number>>(new Set());
  const [started, setStarted] = useState(false);

  const sections = content.sections ?? [];
  const allRead = sections.length > 0 && sectionsRead.size >= sections.length;

  useEffect(() => {
    if (!started) {
      setStarted(true);
      onStart();
    }
  }, [started, onStart]);

  const markSectionRead = (idx: number) => {
    setSectionsRead((prev) => new Set(prev).add(idx));
  };

  return (
    <div>
      <div className="space-y-6 mb-6">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className={`bg-nd-card border rounded-2xl p-5 transition-all ${
              sectionsRead.has(idx)
                ? "border-nd-green/30"
                : "border-nd-border"
            }`}
            onMouseEnter={() => markSectionRead(idx)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-nd-cyan">{section.heading}</h3>
              {sectionsRead.has(idx) && (
                <span className="text-xs text-nd-green font-mono">
                  {"\u2713"} Read
                </span>
              )}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      {!isCompleted && (
        <div className="flex justify-center">
          <OrangeBtn onClick={onComplete} disabled={!allRead}>
            {allRead ? "Mark as Complete" : "Read all sections first"}
          </OrangeBtn>
        </div>
      )}
    </div>
  );
}
