import type { ModuleType } from "@/generated/prisma/enums";

export const XP_BY_MODULE_TYPE: Record<ModuleType, number> = {
  VIDEO: 100,
  READING: 80,
  QUIZ: 120,
  CODING: 150,
};

export const QUIZ_PERFECT_BONUS = 0.5; // +50% for perfect score

export const XP_PER_LEVEL = 1000;

export const LEVEL_NAMES: Record<number, string> = {
  1: "AI Aware",
  2: "AI Explorer",
  3: "AI Practitioner",
  4: "AI Developer",
  5: "AI Builder",
};

export const LEVEL_THEMES: Record<number, string> = {
  1: "The Algorithm Has Been Watching You",
  2: "How Minecraft Explains ML",
  3: "Python Meets Intelligence",
  4: "Deploy or Die Trying",
  5: "Build the Future",
};
