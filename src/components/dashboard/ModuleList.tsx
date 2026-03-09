"use client";

import Link from "next/link";
import { OrangeBtn } from "@/components/ui/OrangeBtn";
import type { DashboardModule } from "@/lib/types/dashboard";
import { XP_BY_MODULE_TYPE } from "@/lib/constants/xp";

interface ModuleListProps {
  modules: DashboardModule[];
}

export function ModuleList({ modules }: ModuleListProps) {
  return (
    <div className="space-y-3 mb-8">
      {modules.map((m, idx) => {
        const isCurrent =
          m.status === "IN_PROGRESS" ||
          (m.status === "NOT_STARTED" &&
            modules
              .slice(0, idx)
              .every((prev) => prev.status === "COMPLETED"));
        const isLocked =
          m.status === "NOT_STARTED" && !isCurrent;
        const isCompleted = m.status === "COMPLETED";

        return (
          <div
            key={m.id}
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
              isCurrent
                ? "bg-nd-card border-nd-orange shadow-glow-orange"
                : isCompleted
                ? "bg-nd-surface border-nd-border"
                : "bg-nd-surface/50 border-nd-border/50 opacity-60"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm ${
                isCompleted
                  ? "bg-nd-green-dim border border-nd-green text-nd-green"
                  : isCurrent
                  ? "bg-nd-orange-dim border border-nd-orange text-nd-orange"
                  : "bg-nd-surface border border-nd-border text-slate-500"
              }`}
            >
              {isCompleted
                ? "\u2713"
                : isLocked
                ? "\u{1F512}"
                : m.order}
            </div>

            <div className="flex-1">
              <div className="font-medium text-sm">{m.title}</div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs font-mono text-slate-500">
                  {m.type}
                </span>
                <span className="text-xs text-slate-600">
                  {m.estimatedMinutes} min
                </span>
                <span className="text-xs font-mono text-nd-cyan">
                  +{XP_BY_MODULE_TYPE[m.type]} XP
                </span>
              </div>
            </div>

            {isCurrent && (
              <Link href={`/lessons/${m.id}`}>
                <OrangeBtn size="sm">
                  {m.status === "IN_PROGRESS" ? "Continue" : "Start"}
                </OrangeBtn>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
