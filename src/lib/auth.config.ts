import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    // Credentials authorize is defined in the full auth.ts (server-only)
    // This placeholder is needed so NextAuth knows credentials provider exists
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: () => null,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublic = ["/", "/sign-in", "/sign-up"].some(
        (p) => nextUrl.pathname === p || nextUrl.pathname.startsWith(p + "/")
      );
      const isAuthApi = nextUrl.pathname.startsWith("/api/auth");

      if (isPublic || isAuthApi) return true;
      if (!isLoggedIn) return false;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as "LEARNER" | "PARENT";
        session.user.username = (token.username as string) ?? session.user.name ?? "";
        session.user.consentVerified = (token.consentVerified as boolean) ?? false;
        session.user.learnerId = token.learnerId as string | undefined;
        session.user.currentLevel = token.currentLevel as number | undefined;
        session.user.onboardingCompleted = token.onboardingCompleted as boolean | undefined;
      }
      return session;
    },
  },
};
