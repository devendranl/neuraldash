import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChatInterface } from "@/components/tutor/ChatInterface";

interface StoredMessage {
  role: "user" | "assistant";
  content: string;
}

export default async function TutorPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const learnerId = session.user.learnerId;

  let messages: StoredMessage[] = [];
  let conversationId: string | undefined;

  if (learnerId) {
    try {
      const recentConversation = await prisma.tutorConversation.findFirst({
        where: { learnerId },
        orderBy: { updatedAt: "desc" },
        select: { id: true, messages: true },
      });

      if (recentConversation) {
        messages = recentConversation.messages as unknown as StoredMessage[];
        conversationId = recentConversation.id;
      }
    } catch (err) {
      console.error("Tutor fetch error:", err);
      // Continue with empty state
    }
  }

  return (
    <div className="p-6 lg:p-10 max-w-3xl h-full">
      <h1 className="text-2xl font-bold mb-2">AI Tutor</h1>
      <p className="text-slate-400 text-sm mb-6">
        Chat with Byte, your personal AI learning companion.
      </p>
      <ChatInterface
        initialMessages={messages}
        initialConversationId={conversationId}
      />
    </div>
  );
}
