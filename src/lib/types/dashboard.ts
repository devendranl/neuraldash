import type { ModuleType, ProgressStatus, BadgeType } from "@/generated/prisma/enums";

export interface DashboardModule {
  id: string;
  title: string;
  type: ModuleType;
  estimatedMinutes: number;
  order: number;
  level: number;
  description: string;
  status: ProgressStatus;
  xpEarned: number;
  score: number | null;
}

export interface DashboardBadge {
  type: BadgeType;
  name: string;
  description: string;
  earned: boolean;
  awardedAt: Date | null;
}

export interface DashboardData {
  username: string;
  currentLevel: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  learnerId: string;
  levelTheme: string;
  modules: DashboardModule[];
  badges: DashboardBadge[];
  modulesCompleted: number;
  totalModules: number;
}
