import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { progressSchema } from "@/lib/validations/progress";
import { XP_BY_MODULE_TYPE, QUIZ_PERFECT_BONUS } from "@/lib/constants/xp";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.learnerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = progressSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { moduleId, action, score, timeSpentSeconds } = parsed.data;
  const learnerId = session.user.learnerId;

  // Verify the module exists
  const mod = await prisma.module.findUnique({
    where: { id: moduleId },
    select: { id: true, type: true, level: true },
  });

  if (!mod) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }

  if (action === "start") {
    // Upsert progress to IN_PROGRESS
    const progress = await prisma.progress.upsert({
      where: { learnerId_moduleId: { learnerId, moduleId } },
      create: { learnerId, moduleId, status: "IN_PROGRESS" },
      update: { status: "IN_PROGRESS" },
    });

    return NextResponse.json({ progress });
  }

  // action === "complete"
  // Calculate XP
  let xpEarned = XP_BY_MODULE_TYPE[mod.type];
  if (mod.type === "QUIZ" && score !== undefined && score === 1) {
    xpEarned = Math.round(xpEarned * (1 + QUIZ_PERFECT_BONUS));
  }

  // Update progress
  const progress = await prisma.progress.upsert({
    where: { learnerId_moduleId: { learnerId, moduleId } },
    create: {
      learnerId,
      moduleId,
      status: "COMPLETED",
      score: score ?? null,
      xpEarned,
      completedAt: new Date(),
      timeSpentSeconds: timeSpentSeconds ?? 0,
    },
    update: {
      status: "COMPLETED",
      score: score ?? null,
      xpEarned,
      completedAt: new Date(),
      timeSpentSeconds: timeSpentSeconds ?? 0,
    },
  });

  // Update learner profile: XP + streak
  const profile = await prisma.learnerProfile.findUnique({
    where: { id: learnerId },
    select: {
      totalXP: true,
      currentStreak: true,
      longestStreak: true,
      lastActiveDate: true,
    },
  });

  if (profile) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastActive = profile.lastActiveDate
      ? new Date(
          profile.lastActiveDate.getFullYear(),
          profile.lastActiveDate.getMonth(),
          profile.lastActiveDate.getDate()
        )
      : null;

    let newStreak = profile.currentStreak;
    if (lastActive) {
      const diffDays = Math.round(
        (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays === 1) {
        newStreak = profile.currentStreak + 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
      // diffDays === 0 → same day, no change
    } else {
      newStreak = 1;
    }

    const newLongest = Math.max(newStreak, profile.longestStreak);

    await prisma.learnerProfile.update({
      where: { id: learnerId },
      data: {
        totalXP: profile.totalXP + xpEarned,
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastActiveDate: now,
      },
    });

    // Award streak badge if 7-day streak reached
    if (newStreak >= 7) {
      await prisma.badge.upsert({
        where: {
          learnerId_type_name: {
            learnerId,
            type: "STREAK_MASTER",
            name: "7-Day Streak",
          },
        },
        create: {
          learnerId,
          type: "STREAK_MASTER",
          name: "7-Day Streak",
          description: "Maintained a 7-day learning streak",
        },
        update: {},
      });
    }

    // Award quiz ace badge for perfect quiz score
    if (mod.type === "QUIZ" && score === 1) {
      await prisma.badge.upsert({
        where: {
          learnerId_type_name: {
            learnerId,
            type: "QUIZ_ACE",
            name: "Quiz Ace",
          },
        },
        create: {
          learnerId,
          type: "QUIZ_ACE",
          name: "Quiz Ace",
          description: "Scored 100% on a quiz",
        },
        update: {},
      });
    }

    // Check if all modules in this level are completed
    const levelModules = await prisma.module.findMany({
      where: { level: mod.level },
      select: {
        id: true,
        progress: {
          where: { learnerId },
          select: { status: true },
        },
      },
    });

    const allCompleted = levelModules.every(
      (m) => m.progress[0]?.status === "COMPLETED"
    );

    if (allCompleted) {
      await prisma.badge.upsert({
        where: {
          learnerId_type_name: {
            learnerId,
            type: "LEVEL_CLEARED",
            name: "Level Clear",
          },
        },
        create: {
          learnerId,
          type: "LEVEL_CLEARED",
          name: "Level Clear",
          description: `Completed all modules in Level ${mod.level}`,
        },
        update: {},
      });
    }
  }

  return NextResponse.json({ progress, xpEarned });
}
