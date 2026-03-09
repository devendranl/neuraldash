import "server-only";
import { prisma } from "@/lib/prisma";
import type { BadgeType } from "@/generated/prisma/enums";

export interface AchievementBadge {
  type: BadgeType;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  awardedAt: Date | null;
}

export interface LevelProgress {
  level: number;
  name: string;
  totalModules: number;
  completedModules: number;
  unlocked: boolean;
}

const ALL_BADGES: Array<{
  type: BadgeType;
  name: string;
  icon: string;
  description: string;
}> = [
  {
    type: "FIRST_LOGIN",
    name: "First Login",
    icon: "rocket",
    description: "Logged in for the first time",
  },
  {
    type: "STREAK_MASTER",
    name: "7-Day Streak",
    icon: "fire",
    description: "Maintained a 7-day learning streak",
  },
  {
    type: "QUIZ_ACE",
    name: "Quiz Ace",
    icon: "brain",
    description: "Scored 100% on a quiz",
  },
  {
    type: "LEVEL_CLEARED",
    name: "Level Clear",
    icon: "star",
    description: "Completed all modules in a level",
  },
  {
    type: "CODE_WARRIOR",
    name: "Code Warrior",
    icon: "trophy",
    description: "Completed 5 coding challenges",
  },
  {
    type: "SPEED_LEARNER",
    name: "Speed Learner",
    icon: "diamond",
    description: "Completed a module in under 5 minutes",
  },
  {
    type: "HELPING_HAND",
    name: "Helping Hand",
    icon: "handshake",
    description: "Helped a fellow learner",
  },
  {
    type: "CUSTOM",
    name: "Mystery Badge",
    icon: "sparkles",
    description: "A special achievement awaits...",
  },
];

export async function getAchievements(learnerId: string): Promise<{
  badges: AchievementBadge[];
  levels: LevelProgress[];
  totalXP: number;
  currentLevel: number;
}> {
  const profile = await prisma.learnerProfile.findUnique({
    where: { id: learnerId },
    select: {
      currentLevel: true,
      totalXP: true,
      badges: {
        select: { type: true, name: true, description: true, awardedAt: true },
      },
    },
  });

  if (!profile) {
    return { badges: [], levels: [], totalXP: 0, currentLevel: 1 };
  }

  const earnedKeys = new Set(
    profile.badges.map((b) => `${b.type}:${b.name}`)
  );

  const badges: AchievementBadge[] = ALL_BADGES.map((ab) => {
    const earned = earnedKeys.has(`${ab.type}:${ab.name}`);
    const earnedBadge = profile.badges.find(
      (b) => b.type === ab.type && b.name === ab.name
    );
    return {
      type: ab.type,
      name: ab.name,
      description: earned
        ? (earnedBadge?.description ?? ab.description)
        : ab.description,
      icon: ab.icon,
      earned,
      awardedAt: earned ? (earnedBadge?.awardedAt ?? null) : null,
    };
  });

  // Fetch level progress for all 5 levels
  const LEVEL_NAMES: Record<number, string> = {
    1: "AI Aware",
    2: "AI Explorer",
    3: "AI Practitioner",
    4: "AI Developer",
    5: "AI Builder",
  };

  const modules = await prisma.module.findMany({
    where: { level: { in: [1, 2, 3, 4, 5] } },
    select: {
      level: true,
      progress: {
        where: { learnerId },
        select: { status: true },
      },
    },
  });

  const levelMap = new Map<number, { total: number; completed: number }>();
  for (const m of modules) {
    const entry = levelMap.get(m.level) ?? { total: 0, completed: 0 };
    entry.total++;
    if (m.progress[0]?.status === "COMPLETED") entry.completed++;
    levelMap.set(m.level, entry);
  }

  const levels: LevelProgress[] = [1, 2, 3, 4, 5].map((level) => ({
    level,
    name: LEVEL_NAMES[level] ?? `Level ${level}`,
    totalModules: levelMap.get(level)?.total ?? 0,
    completedModules: levelMap.get(level)?.completed ?? 0,
    unlocked: level <= profile.currentLevel,
  }));

  return {
    badges,
    levels,
    totalXP: profile.totalXP,
    currentLevel: profile.currentLevel,
  };
}
