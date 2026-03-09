import "server-only";
import { prisma } from "@/lib/prisma";
import type { ModuleType, ProgressStatus } from "@/generated/prisma/enums";
import type { ModuleContent } from "@/lib/types/module-content";

export interface ModuleWithProgress {
  id: string;
  title: string;
  description: string;
  type: ModuleType;
  level: number;
  order: number;
  estimatedMinutes: number;
  content: ModuleContent;
  externalUrl: string | null;
  theme: string;
  progress: {
    status: ProgressStatus;
    score: number | null;
    xpEarned: number;
  } | null;
}

export async function getModuleWithProgress(
  moduleId: string,
  learnerId: string
): Promise<ModuleWithProgress | null> {
  const mod = await prisma.module.findUnique({
    where: { id: moduleId },
    include: {
      progress: {
        where: { learnerId },
        select: {
          status: true,
          score: true,
          xpEarned: true,
        },
      },
    },
  });

  if (!mod) return null;

  return {
    id: mod.id,
    title: mod.title,
    description: mod.description,
    type: mod.type,
    level: mod.level,
    order: mod.order,
    estimatedMinutes: mod.estimatedMinutes,
    content: mod.content as unknown as ModuleContent,
    externalUrl: mod.externalUrl,
    theme: mod.theme,
    progress: mod.progress[0] ?? null,
  };
}

export async function getNextModule(
  learnerId: string,
  currentLevel: number
): Promise<string | null> {
  // Find the first module at the current level that's not completed
  const modules = await prisma.module.findMany({
    where: { level: currentLevel },
    orderBy: { order: "asc" },
    select: {
      id: true,
      progress: {
        where: { learnerId },
        select: { status: true },
      },
    },
  });

  for (const mod of modules) {
    const status = mod.progress[0]?.status;
    if (status !== "COMPLETED") return mod.id;
  }

  return null;
}
