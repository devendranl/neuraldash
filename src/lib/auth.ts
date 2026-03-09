import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    // Keep non-credentials providers from config
    ...authConfig.providers.filter(
      (p) => (p as { id?: string }).id !== "credentials" && (p as { name?: string }).name !== "credentials"
    ),
    // Override credentials with real authorize function (needs Prisma/bcrypt — Node.js only)
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user?.hashedPassword) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            role: true,
            username: true,
            consentVerified: true,
            learnerProfile: {
              select: { id: true, currentLevel: true, onboardingCompleted: true },
            },
          },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.username = dbUser.username;
          token.consentVerified = dbUser.consentVerified;
          token.learnerId = dbUser.learnerProfile?.id;
          token.currentLevel = dbUser.learnerProfile?.currentLevel;
          token.onboardingCompleted = dbUser.learnerProfile?.onboardingCompleted;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "LEARNER" | "PARENT";
        session.user.username = (token.username as string) ?? "";
        session.user.consentVerified = (token.consentVerified as boolean) ?? false;
        session.user.learnerId = token.learnerId as string | undefined;
        session.user.currentLevel = token.currentLevel as number | undefined;
        session.user.onboardingCompleted = token.onboardingCompleted as boolean | undefined;
      }
      return session;
    },
  },
});
