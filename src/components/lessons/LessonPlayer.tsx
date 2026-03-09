"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { ModuleType, ProgressStatus } from "@/generated/prisma/enums";
import type { ModuleContent } from "@/lib/types/module-content";
import { VideoPlayer } from "./VideoPlayer";
import { ReadingView } from "./ReadingView";
import { QuizPlayer } from "./QuizPlayer";
import { CodingEditor } from "./CodingEditor";
import { OrangeBtn } from "@/components/ui/OrangeBtn";
import { LEVEL_NAMES } from "@/lib/constants/xp";

interface LessonPlayerProps {
  moduleId: string;
  title: string;
  description: string;
  type: ModuleType;
  content: ModuleContent;
  estimatedMinutes: number;
  theme: string;
  level: number;
  order: number;
  baseXP: number;
  initialStatus: ProgressStatus;
  externalUrl: string | null;
}

export function LessonPlayer({
  moduleId,
  title,
  description,
  type,
  content,
  estimatedMinutes,
  theme,
  level,
  order,
  baseXP,
  initialStatus,
  externalUrl,
}: LessonPlayerProps) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [xpAwarded, setXpAwarded] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const markStarted = useCallback(async () => {
    if (status !== "NOT_STARTED") return;
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, action: "start" }),
      });
      setStatus("IN_PROGRESS");
    } catch {
      // Silently continue - starting is not critical
    }
  }, [moduleId, status]);

  const markCompleted = useCallback(
    async (score?: number) => {
      if (status === "COMPLETED" || isSubmitting) return;
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            moduleId,
            action: "complete",
            score,
          }),
        });
        const data = await res.json();
        setStatus("COMPLETED");
        setXpAwarded(data.xpEarned ?? baseXP);
      } catch {
        // Allow retry
      } finally {
        setIsSubmitting(false);
      }
    },
    [moduleId, status, isSubmitting, baseXP]
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm text-slate-400 hover:text-white transition-colors mb-4 inline-flex items-center gap-1"
        >
          {"\u2190"} Back to Dashboard
        </button>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-nd-orange">
            Level {level}: {LEVEL_NAMES[level]}
          </span>
          <span className="text-xs text-slate-600">|</span>
          <span className="text-xs font-mono text-slate-500">
            Module {order}
          </span>
          <span className="text-xs text-slate-600">|</span>
          <span className="text-xs font-mono text-slate-500">{type}</span>
          <span className="text-xs text-slate-600">|</span>
          <span className="text-xs text-slate-500">
            {estimatedMinutes} min
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-slate-400">{description}</p>
        {theme && (
          <p className="text-xs font-mono text-nd-orange/60 mt-1 italic">
            &quot;{theme}&quot;
          </p>
        )}
      </div>

      {/* Completion Banner */}
      {status === "COMPLETED" && xpAwarded !== null && (
        <div className="mb-6 p-4 rounded-2xl bg-nd-green-dim border border-nd-green/30 flex items-center justify-between">
          <div>
            <div className="font-bold text-nd-green text-sm">
              {"\u2713"} Module Completed!
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              You earned {xpAwarded} XP
            </div>
          </div>
          <OrangeBtn size="sm" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </OrangeBtn>
        </div>
      )}

      {/* Content Renderers */}
      {type === "VIDEO" && (
        <VideoPlayer
          content={content as import("@/lib/types/module-content").VideoContent}
          onStart={markStarted}
          onComplete={() => markCompleted()}
          isCompleted={status === "COMPLETED"}
        />
      )}

      {type === "READING" && (
        <ReadingView
          content={
            content as import("@/lib/types/module-content").ReadingContent
          }
          onStart={markStarted}
          onComplete={() => markCompleted()}
          isCompleted={status === "COMPLETED"}
        />
      )}

      {type === "QUIZ" && (
        <QuizPlayer
          content={content as import("@/lib/types/module-content").QuizContent}
          onStart={markStarted}
          onComplete={(score) => markCompleted(score)}
          isCompleted={status === "COMPLETED"}
        />
      )}

      {type === "CODING" && (
        <CodingEditor
          content={
            content as import("@/lib/types/module-content").CodingContent
          }
          externalUrl={externalUrl}
          onStart={markStarted}
          onComplete={() => markCompleted()}
          isCompleted={status === "COMPLETED"}
        />
      )}
    </div>
  );
}
