"use client";

import { useState } from "react";
import { OrangeBtn } from "@/components/ui/OrangeBtn";

interface SettingsFormProps {
  initialUsername: string;
  email: string | null;
  hasPassword: boolean;
}

export function SettingsForm({
  initialUsername,
  email,
  hasPassword,
}: SettingsFormProps) {
  const [username, setUsername] = useState(initialUsername);
  const [usernameMsg, setUsernameMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [usernameSaving, setUsernameSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [passwordSaving, setPasswordSaving] = useState(false);

  async function handleUsernameSave() {
    setUsernameMsg(null);
    setUsernameSaving(true);
    try {
      const res = await fetch("/api/settings/username", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) {
        setUsernameMsg({ type: "error", text: data.error });
      } else {
        setUsernameMsg({
          type: "success",
          text: "Username updated! Refresh to see changes in sidebar.",
        });
      }
    } catch {
      setUsernameMsg({ type: "error", text: "Network error" });
    } finally {
      setUsernameSaving(false);
    }
  }

  async function handlePasswordSave() {
    setPasswordMsg(null);
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Passwords do not match" });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg({
        type: "error",
        text: "Password must be at least 8 characters",
      });
      return;
    }
    setPasswordSaving(true);
    try {
      const res = await fetch("/api/settings/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordMsg({ type: "error", text: data.error });
      } else {
        setPasswordMsg({ type: "success", text: "Password updated!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setPasswordMsg({ type: "error", text: "Network error" });
    } finally {
      setPasswordSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Username Section */}
      <section className="bg-nd-card border border-nd-border rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <div className="text-sm text-slate-300 bg-nd-surface/50 px-4 py-2.5 rounded-xl border border-nd-border/50">
              {email ?? "Not set"}
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-nd-surface border border-nd-border text-white text-sm focus:outline-none focus:border-nd-orange/50 focus:ring-1 focus:ring-nd-orange/30"
              maxLength={20}
            />
          </div>
          {usernameMsg && (
            <p
              className={`text-sm ${usernameMsg.type === "error" ? "text-nd-red" : "text-nd-green"}`}
            >
              {usernameMsg.text}
            </p>
          )}
          <OrangeBtn
            size="sm"
            onClick={handleUsernameSave}
            disabled={usernameSaving || username === initialUsername}
          >
            {usernameSaving ? "Saving..." : "Save Username"}
          </OrangeBtn>
        </div>
      </section>

      {/* Password Section */}
      {hasPassword && (
        <section className="bg-nd-card border border-nd-border rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-nd-surface border border-nd-border text-white text-sm focus:outline-none focus:border-nd-orange/50 focus:ring-1 focus:ring-nd-orange/30"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-nd-surface border border-nd-border text-white text-sm focus:outline-none focus:border-nd-orange/50 focus:ring-1 focus:ring-nd-orange/30"
                placeholder="Min 8 characters"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-nd-surface border border-nd-border text-white text-sm focus:outline-none focus:border-nd-orange/50 focus:ring-1 focus:ring-nd-orange/30"
              />
            </div>
            {passwordMsg && (
              <p
                className={`text-sm ${passwordMsg.type === "error" ? "text-nd-red" : "text-nd-green"}`}
              >
                {passwordMsg.text}
              </p>
            )}
            <OrangeBtn
              size="sm"
              onClick={handlePasswordSave}
              disabled={
                passwordSaving || !currentPassword || !newPassword
              }
            >
              {passwordSaving ? "Saving..." : "Update Password"}
            </OrangeBtn>
          </div>
        </section>
      )}
    </div>
  );
}
