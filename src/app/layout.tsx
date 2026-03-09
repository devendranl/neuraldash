import type { Metadata } from "next";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeuralDash — AI Learning Companion",
  description:
    "Your personalised AI education journey. Go from AI awareness to building real AI applications.",
  keywords: ["AI education", "teens", "machine learning", "Python", "coding"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-nd-bg font-sans">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
