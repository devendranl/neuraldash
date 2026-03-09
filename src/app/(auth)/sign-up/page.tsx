"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormData = {
  username: string;
  email: string;
  password: string;
  role: "LEARNER" | "PARENT";
  ageBracket: string;
  parentEmail: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    role: "LEARNER",
    ageBracket: "AGE_13_15",
    parentEmail: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      ...form,
      ageBracket: form.role === "LEARNER" ? form.ageBracket : undefined,
      parentEmail: form.role === "LEARNER" ? form.parentEmail || undefined : undefined,
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Registration failed");
      setLoading(false);
      return;
    }

    // Auto sign-in after registration
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Account created but sign-in failed. Please sign in manually.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="gd-card w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
          <p className="mt-1 text-sm text-slate-400">
            Start your AI learning journey
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-nd-red/30 bg-nd-red-dim p-3 text-sm text-nd-red">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selector */}
          <div className="flex gap-2">
            {(["LEARNER", "PARENT"] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => update("role", role)}
                className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                  form.role === role
                    ? "border-nd-blue bg-nd-blue/10 text-nd-blue-hi"
                    : "border-nd-border bg-nd-surface text-slate-400 hover:border-slate-500"
                }`}
              >
                {role === "LEARNER" ? "I'm a Learner" : "I'm a Parent"}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-300">
              Username
            </label>
            <input
              id="username"
              required
              value={form.username}
              onChange={(e) => update("username", e.target.value)}
              className="w-full rounded-lg border border-nd-border bg-nd-surface px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-nd-blue focus:outline-none focus:ring-1 focus:ring-nd-blue"
              placeholder="coolcoder42"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-lg border border-nd-border bg-nd-surface px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-nd-blue focus:outline-none focus:ring-1 focus:ring-nd-blue"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="w-full rounded-lg border border-nd-border bg-nd-surface px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-nd-blue focus:outline-none focus:ring-1 focus:ring-nd-blue"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-slate-500">
              Min 8 chars, 1 uppercase, 1 number
            </p>
          </div>

          {form.role === "LEARNER" && (
            <>
              <div>
                <label htmlFor="ageBracket" className="mb-1 block text-sm font-medium text-slate-300">
                  Age Range
                </label>
                <select
                  id="ageBracket"
                  value={form.ageBracket}
                  onChange={(e) => update("ageBracket", e.target.value)}
                  className="w-full rounded-lg border border-nd-border bg-nd-surface px-4 py-2.5 text-white focus:border-nd-blue focus:outline-none focus:ring-1 focus:ring-nd-blue"
                >
                  <option value="UNDER_13">Under 13</option>
                  <option value="AGE_13_15">13–15</option>
                  <option value="AGE_16_18">16–18</option>
                </select>
              </div>

              <div>
                <label htmlFor="parentEmail" className="mb-1 block text-sm font-medium text-slate-300">
                  Parent/Guardian Email{" "}
                  <span className="text-slate-500">(for consent)</span>
                </label>
                <input
                  id="parentEmail"
                  type="email"
                  value={form.parentEmail}
                  onChange={(e) => update("parentEmail", e.target.value)}
                  className="w-full rounded-lg border border-nd-border bg-nd-surface px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-nd-blue focus:outline-none focus:ring-1 focus:ring-nd-blue"
                  placeholder="parent@example.com"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-nd-orange px-4 py-2.5 font-semibold text-white transition-colors hover:bg-nd-orange-hi disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-nd-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-nd-card px-2 text-slate-500">or</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-nd-border bg-nd-surface px-4 py-2.5 font-medium text-white transition-colors hover:bg-nd-card-hover"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-nd-blue hover:text-nd-blue-hi">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
