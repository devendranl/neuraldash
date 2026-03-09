import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { usernameSchema } from "@/lib/validations/settings";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = usernameSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid username" },
      { status: 400 }
    );
  }

  const { username } = parsed.data;

  // Check uniqueness
  const existing = await prisma.user.findFirst({
    where: {
      username,
      NOT: { id: session.user.id },
    },
    select: { id: true },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Username is already taken" },
      { status: 409 }
    );
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username },
  });

  return NextResponse.json({ username });
}
