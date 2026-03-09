import "server-only";
import { prisma } from "@/lib/prisma";
import { LEVEL_THEMES, XP_PER_LEVEL } from "@/lib/constants/xp";
import type { DashboardData, DashboardBadge } from "@/lib/types/dashboard";
import type { BadgeType, ProgressStatus } from "@/generated/prisma/enums";

const ALL_BADGES: Array<{ type: BadgeType; name: string; icon: string }> = [
  { type: "FIRST_LOGIN", name: "First Login", icon: "rocket" },
  { type: "STREAK_MASTER", name: "7-Day Streak", icon: "fire" },
  { type: "QUIZ_ACE", name: "Quiz Ace", icon: "brain" },
  { type: "LEVEL_CLEARED", name: "Level Clear", icon: "star" },
  { type: "CODE_WARRIOR", name: "Code Warrior", icon: "trophy" },
  { type: "SPEED_LEARNER", name: "Speed Learner", icon: "diamond" },
];

export async function getLearnerDashboard(
  userId: string
): Promise<DashboardData | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
      learnerProfile: {
        select: {
          id: true,
          currentLevel: true,
          totalXP: true,
          currentStreak: true,
          longestStreak: true,
          badges: {
            select: {
              type: true,
              name: true,
              description: true,
              awardedAt: true,
            },
          },
        },
      },
    },
  });

  if (!user?.learnerProfile) return null;

  const profile = user.learnerProfile;

  // Fetch modules for the current level
  const modules = await prisma.module.findMany({
    where: { level: profile.currentLevel },
    orderBy: { order: "asc" },
    select: {
      id: true,
      title: true,
      type: true,
      estimatedMinutes: true,
      order: true,
      level: true,
      description: true,
      progress: {
        where: { learnerId: profile.id },
        select: {
          status: true,
          xpEarned: true,
          score: true,
        },
      },
    },
  });

  const dashModules = modules.map((m) => {
    const prog = m.progress[0];
    return {
      id: m.id,
      title: m.title,
      type: m.type,
      estimatedMinutes: m.estimatedMinutes,
      order: m.order,
      level: m.level,
      description: m.description,
      status: (prog?.status ?? "NOT_STARTED") as ProgressStatus,
      xpEarned: prog?.xpEarned ?? 0,
      score: prog?.score ?? null,
    };
  });

  const modulesCompleted = dashModules.filter(
    (m) => m.status === "COMPLETED"
  ).length;

  // Build badge grid - show all possible badges with earned state
  const earnedBadgeKeys = new Set(
    profile.badges.map((b) => `${b.type}:${b.name}`)
  );

  const badges: DashboardBadge[] = ALL_BADGES.map((ab) => {
    const earned = earnedBadgeKeys.has(`${ab.type}:${ab.name}`);
    const earnedBadge = profile.badges.find(
      (b) => b.type === ab.type && b.name === ab.name
    );
    return {
      type: ab.type,
      name: ab.name,
      description: earnedBadge?.description ?? "",
      earned,
      awardedAt: earnedBadge?.awardedAt ?? null,
    };
  });

  return {
    username: user.username,
    currentLevel: profile.currentLevel,
    totalXP: profile.totalXP,
    currentStreak: profile.currentStreak,
    longestStreak: profile.longestStreak,
    learnerId: profile.id,
    levelTheme: LEVEL_THEMES[profile.currentLevel] ?? "",
    modules: dashModules,
    badges,
    modulesCompleted,
    totalModules: modules.length,
  };
}

export function getXPForNextLevel(currentLevel: number): number {
  return currentLevel * XP_PER_LEVEL;
}
