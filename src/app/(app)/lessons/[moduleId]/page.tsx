import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getModuleWithProgress } from "@/lib/data/modules";
import { LessonPlayer } from "@/components/lessons/LessonPlayer";
import { XP_BY_MODULE_TYPE } from "@/lib/constants/xp";

interface LessonPageProps {
  params: Promise<{ moduleId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { moduleId } = await params;
  const session = await auth();
  if (!session?.user?.learnerId) redirect("/sign-in");

  const mod = await getModuleWithProgress(moduleId, session.user.learnerId);
  if (!mod) notFound();

  return (
    <div className="px-6 py-6 max-w-4xl mx-auto">
      <LessonPlayer
        moduleId={mod.id}
        title={mod.title}
        description={mod.description}
        type={mod.type}
        content={mod.content}
        estimatedMinutes={mod.estimatedMinutes}
        theme={mod.theme}
        level={mod.level}
        order={mod.order}
        baseXP={XP_BY_MODULE_TYPE[mod.type]}
        initialStatus={mod.progress?.status ?? "NOT_STARTED"}
        externalUrl={mod.externalUrl}
      />
    </div>
  );
}
