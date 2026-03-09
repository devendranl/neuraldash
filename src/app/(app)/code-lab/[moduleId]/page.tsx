import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PyodideWorkspace } from "@/components/code-lab/PyodideWorkspace";

interface CodingContent {
  starterCode?: string;
  instructions?: string;
  externalUrl?: string;
}

export default async function CodeLabModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const { moduleId } = await params;
  const learnerId = session.user.learnerId;

  const mod = await prisma.module.findUnique({
    where: { id: moduleId },
    select: {
      id: true,
      title: true,
      type: true,
      content: true,
      level: true,
    },
  });

  if (!mod || mod.type !== "CODING") notFound();

  const content = mod.content as CodingContent;

  // Mark as in-progress (only if learnerId exists)
  if (learnerId) {
    try {
      await prisma.progress.upsert({
        where: {
          learnerId_moduleId: {
            learnerId,
            moduleId: mod.id,
          },
        },
        create: {
          learnerId,
          moduleId: mod.id,
          status: "IN_PROGRESS",
        },
        update: {},
      });
    } catch (err) {
      console.error("Progress upsert error:", err);
    }
  }

  // If it has an external URL (e.g. Teachable Machine), show link instead
  if (content.externalUrl && !content.starterCode) {
    return (
      <div className="p-6 lg:p-10 max-w-3xl">
        <Link
          href="/code-lab"
          className="text-sm text-slate-400 hover:text-white mb-4 inline-block"
        >
          {"\u2190"} Back to Code Lab
        </Link>
        <div className="bg-nd-card border border-nd-border rounded-2xl p-8 text-center">
          <h2 className="text-lg font-bold mb-3">{mod.title}</h2>
          {content.instructions && (
            <p className="text-sm text-slate-400 mb-6">
              {content.instructions}
            </p>
          )}
          <a
            href={content.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-nd-orange text-white font-semibold rounded-xl hover:bg-nd-orange-hi hover:shadow-glow-orange transition-all"
          >
            Open External Tool {"\u2197"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <Link
        href="/code-lab"
        className="text-sm text-slate-400 hover:text-white mb-4 inline-block"
      >
        {"\u2190"} Back to Code Lab
      </Link>
      <PyodideWorkspace
        moduleId={mod.id}
        moduleTitle={mod.title}
        instructions={content.instructions ?? "Complete the coding challenge below."}
        starterCode={content.starterCode ?? "# Write your Python code here\n"}
      />
    </div>
  );
}
