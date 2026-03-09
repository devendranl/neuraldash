import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getAchievements } from "@/lib/data/achievements";
import { BadgeGallery } from "@/components/achievements/BadgeGallery";
import { LevelTimeline } from "@/components/achievements/LevelTimeline";

export default async function AchievementsPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const learnerId = session.user.learnerId;

  // Gracefully handle missing learnerId
  if (!learnerId) {
    return (
      <div className="p-6 lg:p-10 max-w-3xl">
        <h1 className="text-2xl font-bold mb-2">Achievements</h1>
        <div className="bg-nd-card border border-nd-border rounded-2xl p-8 text-center mt-8">
          <div className="text-4xl mb-3">{"\u{1F3C6}"}</div>
          <p className="text-slate-400">
            Complete your profile setup to start earning achievements!
          </p>
        </div>
      </div>
    );
  }

  const data = await getAchievements(learnerId);

  return (
    <div className="p-6 lg:p-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">Achievements</h1>
      <p className="text-slate-400 text-sm mb-8">
        {data.totalXP.toLocaleString()} XP earned across your journey.
      </p>
      <div className="space-y-10">
        <BadgeGallery badges={data.badges} />
        <LevelTimeline levels={data.levels} currentLevel={data.currentLevel} />
      </div>
    </div>
  );
}
