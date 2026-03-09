import "server-only";
import { prisma } from "@/lib/prisma";

export async function getUserSettings(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      hashedPassword: true,
    },
  });

  if (!user) return null;

  return {
    username: user.username,
    email: user.email,
    hasPassword: !!user.hashedPassword,
  };
}
