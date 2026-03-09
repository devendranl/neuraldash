import type { Role } from "@/generated/prisma/enums";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: Role;
      username: string;
      consentVerified: boolean;
      learnerId?: string;
      currentLevel?: number;
      onboardingCompleted?: boolean;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: Role;
    username: string;
    consentVerified: boolean;
    learnerId?: string;
    currentLevel?: number;
    onboardingCompleted?: boolean;
  }
}
