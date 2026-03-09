import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { username, email, password, role, ageBracket, parentEmail } = parsed.data;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      const field = existingUser.email === email ? "Email" : "Username";
      return NextResponse.json(
        { error: `${field} already taken` },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
        role,
        ageBracket: ageBracket ?? null,
        parentEmail: parentEmail ?? null,
        consentVerified: role === "PARENT",
        learnerProfile:
          role === "LEARNER"
            ? {
                create: {
                  currentLevel: 1,
                  totalXP: 0,
                },
              }
            : undefined,
      },
      select: { id: true, username: true, email: true, role: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
