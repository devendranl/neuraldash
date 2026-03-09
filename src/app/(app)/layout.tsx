import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-nd-bg">
      <div className="flex">
        <Sidebar
          username={session.user.username ?? session.user.name ?? "Learner"}
          currentLevel={session.user.currentLevel ?? 1}
        />
        <main className="flex-1 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
