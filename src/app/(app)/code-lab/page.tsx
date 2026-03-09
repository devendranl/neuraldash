import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CodeLabPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  // Handle case where learnerId might not be set yet
  const learnerId = session.user.learnerId;

  let codingModules: Array<{
    id: string;
    title: string;
    description: string;
    level: number;
    estimatedMinutes: number;
    progress: Array<{ status: string }>;
  }> = [];

  try {
    codingModules = await prisma.module.findMany({
      where: { type: "CODING" },
      orderBy: [{ level: "asc" }, { order: "asc" }],
      select: {
        id: true,
        title: true,
        description: true,
        level: true,
        estimatedMinutes: true,
        progress: learnerId
          ? {
              where: { learnerId },
              select: { status: true },
            }
          : { where: { learnerId: "__none__" }, select: { status: true } },
      },
    });
  } catch (err) {
    console.error("Code Lab fetch error:", err);
    // Will show empty state below
  }

  return (
    <div className="p-6 lg:p-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">Code Lab</h1>
      <p className="text-slate-400 text-sm mb-8">
        Write and run Python code right in your browser.
      </p>

      {codingModules.length === 0 ? (
        <div className="bg-nd-card border border-nd-border rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">{"\u{1F40D}"}</div>
          <p className="text-slate-400">
            No coding modules available yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {codingModules.map((mod) => {
            const status = mod.progress[0]?.status ?? "NOT_STARTED";
            const isCompleted = status === "COMPLETED";

            return (
              <Link
                key={mod.id}
                href={`/code-lab/${mod.id}`}
                className={`block p-5 rounded-2xl border transition-all hover:-translate-y-0.5 ${
                  isCompleted
                    ? "bg-nd-card border-nd-green/30"
                    : "bg-nd-card border-nd-border hover:border-nd-orange/30 hover:shadow-glow-orange"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-slate-500">
                        LVL {mod.level}
                      </span>
                      {isCompleted && (
                        <span className="text-xs text-nd-green font-mono">
                          {"\u2713"} Done
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-sm">{mod.title}</div>
                    {mod.description && (
                      <div className="text-xs text-slate-400 mt-1">
                        {mod.description}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    ~{mod.estimatedMinutes}m
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
