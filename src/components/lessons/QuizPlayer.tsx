"use client";

import { useState, useEffect } from "react";
import type { QuizContent } from "@/lib/types/module-content";
import { OrangeBtn } from "@/components/ui/OrangeBtn";

interface QuizPlayerProps {
  content: QuizContent;
  onStart: () => void;
  onComplete: (score: number) => void;
  isCompleted: boolean;
}

export function QuizPlayer({
  content,
  onStart,
  onComplete,
  isCompleted,
}: QuizPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [started, setStarted] = useState(false);

  const questions = content.questions ?? [];
  const current = questions[currentIdx];
  const totalQuestions = questions.length;

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
    if (idx === current.answer) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizDone(true);
    }
  };

  const handleSubmit = () => {
    const score = totalQuestions > 0 ? correctCount / totalQuestions : 0;
    onComplete(score);
  };

  if (isCompleted) return null;

  if (quizDone) {
    const score = totalQuestions > 0 ? correctCount / totalQuestions : 0;
    const percentage = Math.round(score * 100);

    return (
      <div className="bg-nd-card border border-nd-border rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">
          {percentage === 100
            ? "\u{1F31F}"
            : percentage >= 70
            ? "\u{1F389}"
            : "\u{1F4AA}"}
        </div>
        <h3 className="text-xl font-bold mb-2">Quiz Complete!</h3>
        <p className="text-3xl font-mono font-bold text-nd-cyan mb-1">
          {percentage}%
        </p>
        <p className="text-sm text-slate-400 mb-4">
          {correctCount}/{totalQuestions} correct
        </p>
        {percentage === 100 && (
          <p className="text-xs text-nd-green mb-4 font-mono">
            Perfect score! +50% XP bonus
          </p>
        )}
        <OrangeBtn onClick={handleSubmit}>Claim XP</OrangeBtn>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-slate-500">
          Question {currentIdx + 1} of {totalQuestions}
        </span>
        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx < currentIdx
                  ? "bg-nd-green"
                  : idx === currentIdx
                  ? "bg-nd-orange"
                  : "bg-nd-border"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-nd-card border border-nd-border rounded-2xl p-6 mb-6">
        <p className="text-lg font-medium mb-6">{current.question}</p>
        <div className="space-y-3">
          {current.options.map((opt, idx) => {
            let btnClass =
              "w-full text-left p-4 rounded-xl border text-sm transition-all ";
            if (showResult) {
              if (idx === current.answer) {
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
                <span className="font-mono text-xs text-slate-500 mr-3">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {showResult && current.explanation && (
          <div className="mt-4 p-3 rounded-xl bg-nd-blue/5 border border-nd-blue/20">
            <p className="text-xs text-slate-400">
              <span className="text-nd-blue font-mono font-bold">
                Explanation:
              </span>{" "}
              {current.explanation}
            </p>
          </div>
        )}

        {showResult && (
          <div className="mt-4 flex justify-end">
            <OrangeBtn size="sm" onClick={handleNext}>
              {currentIdx < totalQuestions - 1 ? "Next Question" : "See Results"}
            </OrangeBtn>
          </div>
        )}
      </div>
    </div>
  );
}
