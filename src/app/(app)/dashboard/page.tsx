import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getLearnerDashboard, getXPForNextLevel } from "@/lib/data/learner";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { GDProgressBar } from "@/components/ui/GDProgressBar";
import { XPBar } from "@/components/ui/XPBar";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ModuleList } from "@/components/dashboard/ModuleList";
import { BadgeGrid } from "@/components/dashboard/BadgeGrid";
import { LEVEL_NAMES } from "@/lib/constants/xp";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const data = await getLearnerDashboard(session.user.id);
  if (!data) redirect("/sign-in");

  const nextLevelXP = getXPForNextLevel(data.currentLevel);
  const xpInLevel = data.totalXP % nextLevelXP;

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-nd-border lg:border-none">
        <div className="lg:hidden">
          <span className="font-bold text-lg">NeuralDash</span>
        </div>
        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold px-6 pt-6">
            Welcome back, {data.username}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nd-orange-dim border border-nd-orange/30">
            <span className="text-sm">{"\u{1F525}"}</span>
            <span className="font-mono font-bold text-nd-orange text-sm">
              {data.currentStreak}
            </span>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 max-w-5xl">
        <StatsGrid
          currentLevel={data.currentLevel}
          currentStreak={data.currentStreak}
          longestStreak={data.longestStreak}
          modulesCompleted={data.modulesCompleted}
          totalModules={data.totalModules}
          totalXP={data.totalXP}
        />

        {/* XP Bar */}
        <div className="bg-nd-card border border-nd-border rounded-2xl p-5 mb-8">
          <XPBar
            currentXP={xpInLevel}
            nextLevelXP={nextLevelXP}
            level={data.currentLevel}
          />
        </div>

        {/* Level Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold">
                Level {data.currentLevel}: {LEVEL_NAMES[data.currentLevel]}
              </h2>
              <DifficultyBadge level={Math.min(5, Math.max(1, data.currentLevel)) as 1 | 2 | 3 | 4 | 5} size="sm" />
            </div>
            {data.levelTheme && (
              <span className="text-xs font-mono text-nd-orange italic">
                &quot;{data.levelTheme}&quot;
              </span>
            )}
          </div>
          <GDProgressBar
            progress={
              data.totalModules > 0
                ? (data.modulesCompleted / data.totalModules) * 100
                : 0
            }
          />
        </div>

        <ModuleList modules={data.modules} />

        <BadgeGrid badges={data.badges} />
      </div>
    </>
  );
}
