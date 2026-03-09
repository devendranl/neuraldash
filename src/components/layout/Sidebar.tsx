"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const NAV_ITEMS = [
  { href: "/dashboard", icon: "\u{1F4CA}", label: "Dashboard" },
  { href: "/lessons", icon: "\u{1F4DA}", label: "Lessons" },
  { href: "/code-lab", icon: "\u{1F40D}", label: "Code Lab" },
  { href: "/tutor", icon: "\u{1F916}", label: "AI Tutor" },
  { href: "/achievements", icon: "\u{1F3C6}", label: "Achievements" },
  { href: "/settings", icon: "\u2699\uFE0F", label: "Settings" },
];

interface SidebarProps {
  username: string;
  currentLevel: number;
}

export function Sidebar({ username, currentLevel }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 min-h-screen flex-col border-r border-nd-border bg-nd-surface/50">
      <div className="p-6">
        <Logo size="sm" />
      </div>

      <nav className="flex-1 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href !== "#" && pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all ${
                isActive
                  ? "bg-nd-orange/10 text-nd-orange border border-nd-orange/30"
                  : "text-slate-400 hover:text-white hover:bg-nd-card"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-nd-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-nd-orange flex items-center justify-center font-mono font-bold text-sm text-white">
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-medium">{username}</div>
            <div className="text-xs text-slate-500">Level {currentLevel}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
