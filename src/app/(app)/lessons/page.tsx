import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LEVEL_NAMES, XP_BY_MODULE_TYPE } from "@/lib/constants/xp";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import Link from "next/link";

export default async function LessonsPage() {
  const session = await auth();
  if (!session?.user?.learnerId) redirect("/sign-in");

  const learnerId = session.user.learnerId;

  const modules = await prisma.module.findMany({
    orderBy: [{ level: "asc" }, { order: "asc" }],
    select: {
      id: true,
      title: true,
      type: true,
      level: true,
      order: true,
      estimatedMinutes: true,
      description: true,
      theme: true,
      progress: {
        where: { learnerId },
        select: { status: true },
      },
    },
  });

  // Group by level
  const levels = new Map<number, typeof modules>();
  for (const mod of modules) {
    const group = levels.get(mod.level) ?? [];
    group.push(mod);
    levels.set(mod.level, group);
  }

  return (
    <>
      <header className="px-6 py-4 border-b border-nd-border lg:border-none">
        <h1 className="text-2xl font-bold lg:px-6 lg:pt-6">All Lessons</h1>
      </header>

      <div className="px-6 py-6 max-w-5xl space-y-10">
        {Array.from(levels.entries()).map(([level, mods]) => (
          <div key={level}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-bold">
                Level {level}: {LEVEL_NAMES[level]}
              </h2>
              <DifficultyBadge
                level={Math.min(5, Math.max(1, level)) as 1 | 2 | 3 | 4 | 5}
                size="sm"
              />
            </div>

            <div className="space-y-3">
              {mods.map((m) => {
                const status = m.progress[0]?.status ?? "NOT_STARTED";
                const isCompleted = status === "COMPLETED";
                const isInProgress = status === "IN_PROGRESS";

                return (
                  <Link
                    key={m.id}
                    href={`/lessons/${m.id}`}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all hover:border-nd-blue/50 ${
                      isCompleted
                        ? "bg-nd-surface border-nd-border"
                        : isInProgress
                        ? "bg-nd-card border-nd-orange shadow-glow-orange"
                        : "bg-nd-surface/50 border-nd-border/50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm ${
                        isCompleted
                          ? "bg-nd-green-dim border border-nd-green text-nd-green"
                          : isInProgress
                          ? "bg-nd-orange-dim border border-nd-orange text-nd-orange"
                          : "bg-nd-surface border border-nd-border text-slate-500"
                      }`}
                    >
                      {isCompleted ? "\u2713" : m.order}
                    </div>

                    <div className="flex-1">
                      <div className="font-medium text-sm">{m.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {m.description}
                      </div>
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

                    {isCompleted && (
                      <span className="text-xs font-mono text-nd-green">
                        Done
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
