import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserSettings } from "@/lib/data/settings";
import { SettingsForm } from "@/components/settings/SettingsForm";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  let settings: {
    username: string;
    email: string | null;
    hasPassword: boolean;
  } | null = null;

  try {
    settings = await getUserSettings(session.user.id);
  } catch (err) {
    console.error("Settings fetch error:", err);
  }

  if (!settings) {
    return (
      <div className="p-6 lg:p-10 max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <div className="bg-nd-card border border-nd-border rounded-2xl p-8 text-center mt-8">
          <div className="text-4xl mb-3">{"\u2699\uFE0F"}</div>
          <p className="text-slate-400">
            Unable to load settings. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="text-slate-400 text-sm mb-8">
        Manage your profile and preferences.
      </p>
      <SettingsForm
        initialUsername={settings.username}
        email={settings.email}
        hasPassword={settings.hasPassword}
      />
    </div>
  );
}
