"use client";

import { useState, useEffect } from "react";
import type { VideoContent, ConceptCheck } from "@/lib/types/module-content";
import { OrangeBtn } from "@/components/ui/OrangeBtn";

interface VideoPlayerProps {
  content: VideoContent;
  onStart: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

export function VideoPlayer({
  content,
  onStart,
  onComplete,
  isCompleted,
}: VideoPlayerProps) {
  const [checkIndex, setCheckIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [checksComplete, setChecksComplete] = useState(false);
  const [started, setStarted] = useState(false);

  const embedUrl = getYouTubeEmbedUrl(content.videoUrl);
  const checks = content.conceptChecks ?? [];
  const currentCheck: ConceptCheck | undefined = checks[checkIndex];

  useEffect(() => {
    if (!started) {
      setStarted(true);
      onStart();
    }
  }, [started, onStart]);

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
  };

  const handleNext = () => {
    if (checkIndex < checks.length - 1) {
      setCheckIndex(checkIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setChecksComplete(true);
    }
  };

  return (
    <div>
      {/* Video Embed */}
      <div className="rounded-2xl overflow-hidden border border-nd-border mb-6 bg-black">
        {embedUrl ? (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={embedUrl}
              title="Video lesson"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-slate-500">
            <div className="text-center">
              <div className="text-4xl mb-2">{"\u{1F3AC}"}</div>
              <p className="text-sm">Video coming soon</p>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      {content.summary && (
        <div className="bg-nd-card border border-nd-border rounded-2xl p-5 mb-6">
          <h3 className="font-bold text-sm mb-2 text-nd-cyan">Key Takeaway</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {content.summary}
          </p>
        </div>
      )}

      {/* Concept Checks */}
      {checks.length > 0 && !isCompleted && !checksComplete && currentCheck && (
        <div className="bg-nd-card border border-nd-border rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">
              Concept Check {checkIndex + 1}/{checks.length}
            </h3>
            <span className="text-xs font-mono text-slate-500">
              Quick check
            </span>
          </div>
          <p className="text-sm mb-4">{currentCheck.question}</p>
          <div className="space-y-2">
            {currentCheck.options.map((opt, idx) => {
              let btnClass =
                "w-full text-left p-3 rounded-xl border text-sm transition-all ";
              if (showResult) {
                if (idx === currentCheck.answer) {
                  btnClass +=
                    "bg-nd-green-dim border-nd-green text-nd-green";
                } else if (idx === selectedAnswer) {
                  btnClass += "bg-nd-red-dim border-nd-red text-nd-red";
                } else {
                  btnClass += "bg-nd-surface border-nd-border text-slate-400";
                }
              } else {
                btnClass +=
                  "bg-nd-surface border-nd-border text-slate-300 hover:border-nd-blue hover:bg-nd-blue/5 cursor-pointer";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={btnClass}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {showResult && (
            <div className="mt-4 flex justify-end">
              <OrangeBtn size="sm" onClick={handleNext}>
                {checkIndex < checks.length - 1 ? "Next" : "Done"}
              </OrangeBtn>
            </div>
          )}
        </div>
      )}

      {/* Complete Button */}
      {!isCompleted && (checksComplete || checks.length === 0) && (
        <div className="flex justify-center">
          <OrangeBtn onClick={onComplete}>Mark as Complete</OrangeBtn>
        </div>
      )}
    </div>
  );
}
