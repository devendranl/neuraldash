import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { chatMessageSchema } from "@/lib/validations/tutor";
import {
  TUTOR_MODEL,
  TUTOR_SYSTEM_PROMPT,
  MAX_MESSAGES_PER_CONVERSATION,
} from "@/lib/constants/tutor";
import { filterInput, filterOutput } from "@/lib/safety/content-filter";

const anthropic = new Anthropic();

interface StoredMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.learnerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = chatMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { message, conversationId } = parsed.data;
  const learnerId = session.user.learnerId;

  // Content filter on input
  const inputFilter = filterInput(message);
  if (!inputFilter.allowed) {
    return NextResponse.json(
      { error: inputFilter.reason },
      { status: 400 }
    );
  }

  // Load or create conversation
  let conversation;
  let messages: StoredMessage[] = [];

  if (conversationId) {
    conversation = await prisma.tutorConversation.findUnique({
      where: { id: conversationId },
      select: { id: true, learnerId: true, messages: true, safetyFlags: true },
    });

    if (!conversation || conversation.learnerId !== learnerId) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    messages = conversation.messages as unknown as StoredMessage[];

    // Check rate limit
    const userMessageCount = messages.filter((m) => m.role === "user").length;
    if (userMessageCount >= MAX_MESSAGES_PER_CONVERSATION) {
      return NextResponse.json(
        {
          error: `This conversation has reached the ${MAX_MESSAGES_PER_CONVERSATION}-message limit. Start a new conversation to continue learning!`,
        },
        { status: 429 }
      );
    }
  } else {
    conversation = await prisma.tutorConversation.create({
      data: {
        learnerId,
        messages: [],
        safetyFlags: [],
      },
    });
  }

  // Add user message
  messages.push({ role: "user", content: message });

  // Call Claude API
  try {
    const response = await anthropic.messages.create({
      model: TUTOR_MODEL,
      max_tokens: 1024,
      system: TUTOR_SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const assistantContent =
      response.content[0]?.type === "text"
        ? response.content[0].text
        : "I had trouble generating a response. Can you try rephrasing?";

    // Content filter on output
    const outputFilter = filterOutput(assistantContent);
    const finalContent = outputFilter.allowed
      ? assistantContent
      : "I need to rephrase my response. Could you ask me that in a different way?";

    // Add assistant message
    messages.push({ role: "assistant", content: finalContent });

    // Track safety flags
    const safetyFlags = (conversation.safetyFlags ?? []) as string[];
    if (inputFilter.flagged) {
      safetyFlags.push(
        `input_flagged:${new Date().toISOString()}:${message.slice(0, 50)}`
      );
    }
    if (!outputFilter.allowed) {
      safetyFlags.push(
        `output_blocked:${new Date().toISOString()}`
      );
    }

    // Persist conversation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await prisma.tutorConversation.update({
      where: { id: conversation.id },
      data: {
        messages: messages as any,
        safetyFlags: safetyFlags as any,
      },
    });

    return NextResponse.json({
      conversationId: conversation.id,
      reply: finalContent,
    });
  } catch (err) {
    console.error("Claude API error:", err);
    return NextResponse.json(
      { error: "AI Tutor is temporarily unavailable. Please try again." },
      { status: 503 }
    );
  }
}
