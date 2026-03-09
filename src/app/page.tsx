"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CubeField } from "@/components/gamification/CubeField";
import { Logo } from "@/components/ui/Logo";
import { OrangeBtn } from "@/components/ui/OrangeBtn";
import { GhostBtn } from "@/components/ui/GhostBtn";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";

const levels = [
  {
    num: 1 as const,
    name: "AI Aware",
    theme: "The Algorithm Has Been Watching You",
    desc: "Understand how AI already shapes your Spotify, YouTube, and social feeds.",
    modules: 5,
  },
  {
    num: 2 as const,
    name: "AI Explorer",
    theme: "How Minecraft Accidentally Explains Machine Learning",
    desc: "Discover the concepts behind ML — no code needed yet.",
    modules: 6,
  },
  {
    num: 3 as const,
    name: "AI Practitioner",
    theme: "Your Football Club's Data Scientists Write Python. So Will You.",
    desc: "Start coding in Python and build your first ML models — right in the browser.",
    modules: 7,
  },
  {
    num: 4 as const,
    name: "AI Developer",
    theme: "MrBeast's Thumbnail Team vs. a Neural Network",
    desc: "Train deep learning models and deploy them for real.",
    modules: 6,
  },
  {
    num: 5 as const,
    name: "AI Builder",
    theme: "The NPC That Broke the Internet",
    desc: "Build with LLMs, APIs, and ship your capstone project.",
    modules: 6,
  },
];

export default function Home() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (showOnboarding) {
    return <OnboardingFlow onBack={() => setShowOnboarding(false)} />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <CubeField />

      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 py-4 border-b border-nd-border/50 backdrop-blur-sm">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <GhostBtn onClick={() => router.push("/sign-in")}>
              Sign In
            </GhostBtn>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-nd-blue/50 bg-nd-blue/10">
            <span className="text-xs font-mono font-bold text-nd-cyan tracking-wider">
              FREE AI EDUCATION FOR TEENS
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-nd-blue-hi via-nd-cyan to-nd-orange bg-clip-text text-transparent">
              From AI Curious
            </span>
            <br />
            <span className="text-white">to AI Builder</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A structured, gamified journey through 5 levels of AI mastery.
            Guided by an AI tutor. Powered by free courses. Built for
            teenagers who want to understand and build AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <OrangeBtn size="lg" onClick={() => router.push("/sign-up")}>
              Start Your Journey
            </OrangeBtn>
            <GhostBtn onClick={() => document.getElementById("levels")?.scrollIntoView({ behavior: "smooth" })}>
              See the 5 Levels
            </GhostBtn>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { num: "5", label: "Mastery Levels" },
              { num: "26+", label: "Learning Modules" },
              { num: "100%", label: "Free Courses" },
              { num: "0", label: "Install Required" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-nd-surface/80 border border-nd-border rounded-xl p-4 backdrop-blur-sm"
              >
                <div className="text-2xl font-mono font-bold text-nd-cyan">
                  {s.num}
                </div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Levels Section */}
        <section id="levels" className="max-w-5xl mx-auto px-6 pb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold text-nd-orange tracking-widest uppercase">
              YOUR AI JOURNEY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              5 Levels. 1 Mission.
            </h2>
            <p className="text-slate-400 mt-3 max-w-lg mx-auto">
              Each level builds on the last. No prior coding knowledge needed.
              Start wherever you fit.
            </p>
          </div>

          <div className="space-y-4">
            {levels.map((level) => (
              <div key={level.num} className="gd-card group">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-nd-surface border border-nd-border font-mono font-bold text-xl text-nd-blue-hi">
                      {level.num}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold">{level.name}</h3>
                        <DifficultyBadge level={level.num} size="sm" />
                      </div>
                      <p className="text-sm text-nd-orange font-mono italic">
                        &quot;{level.theme}&quot;
                      </p>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <p className="text-sm text-slate-400 max-w-xs">
                      {level.desc}
                    </p>
                    <span className="text-xs font-mono text-slate-500 mt-1 block">
                      {level.modules} modules
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🤖",
                title: "AI Tutor — Byte",
                desc: "Your personal AI guide that knows your level, adapts to your pace, and never gives away the answer.",
              },
              {
                icon: "🐍",
                title: "Code in Browser",
                desc: "Write and run Python directly in your browser. No downloads, no setup — just click and code.",
              },
              {
                icon: "🎮",
                title: "Gamified Progress",
                desc: "XP, badges, streaks, and Geometry Dash-inspired difficulty ratings. Learning should feel like a game.",
              },
              {
                icon: "👨‍👩‍👧",
                title: "Parent Dashboard",
                desc: "Parents see progress, review AI conversations, and get weekly reports. Full transparency, zero tracking.",
              },
              {
                icon: "📚",
                title: "Curated Free Courses",
                desc: "Every external resource is 100% free. We curate, structure, and contextualise the best content out there.",
              },
              {
                icon: "🔒",
                title: "Privacy First",
                desc: "No ads, no tracking pixels, no profiling minors. Username only. All data deletable within 30 days.",
              },
            ].map((f) => (
              <div key={f.title} className="gd-card">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
          <div className="bg-gradient-to-br from-nd-blue/20 to-nd-orange/20 border border-nd-border rounded-3xl p-10">
            <h2 className="text-3xl font-bold mb-4">Ready to dash?</h2>
            <p className="text-slate-400 mb-8">
              Take the 5-minute placement quiz and find your starting level.
            </p>
            <OrangeBtn size="lg" onClick={() => router.push("/sign-up")}>
              Start Your Journey
            </OrangeBtn>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-nd-border/50 py-8 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Logo size="sm" />
            <p className="text-xs text-slate-500">
              Built for teenagers. Trusted by parents. No ads. No tracking. Ever.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* ============================
   ONBOARDING FLOW (5 Screens)
   ============================ */

function OnboardingFlow({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    role: "learner",
    username: "",
    email: "",
    password: "",
    ageBracket: "",
    parentName: "",
    parentEmail: "",
    consent: [false, false, false],
  });
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);

  const steps = ["Welcome", "Account", "Consent", "Quiz", "Level"];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <CubeField />
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top bar */}
        <nav className="flex items-center justify-between px-6 py-4 border-b border-nd-border/50 backdrop-blur-sm">
          <Logo size="sm" />
          <button
            onClick={onBack}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            &larr; Back to home
          </button>
        </nav>

        {/* Step dots */}
        <div className="flex justify-center gap-2 py-6">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                  i === step
                    ? "bg-nd-orange text-white shadow-glow-orange"
                    : i < step
                    ? "bg-nd-green text-white"
                    : "bg-nd-surface border border-nd-border text-slate-500"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 h-0.5 ${
                    i < step ? "bg-nd-green" : "bg-nd-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-6 pb-10">
          <div className="w-full max-w-lg animate-slide-up">
            {step === 0 && <WelcomeStep onNext={() => setStep(1)} />}
            {step === 1 && (
              <AccountStep
                formData={formData}
                setFormData={setFormData}
                onNext={() => {
                  if (formData.ageBracket === "under13") {
                    alert("Sorry, NeuralDash is for learners aged 13 and above.");
                    return;
                  }
                  if (formData.ageBracket === "13-15") {
                    setStep(2); // needs consent
                  } else {
                    setStep(3); // skip consent
                  }
                }}
              />
            )}
            {step === 2 && (
              <ConsentStep
                formData={formData}
                setFormData={setFormData}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && (
              <QuizStep
                quizIndex={quizIndex}
                setQuizIndex={setQuizIndex}
                quizAnswers={quizAnswers}
                setQuizAnswers={setQuizAnswers}
                onComplete={() => setStep(4)}
              />
            )}
            {step === 4 && (
              <LevelRecommendation
                answers={quizAnswers}
                username={formData.username || "Explorer"}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* --- Screen 1: Welcome --- */
function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center">
      <Logo size="lg" />
      <h1 className="text-3xl font-bold mt-8 mb-4">
        Your AI Journey Starts Here
      </h1>
      <p className="text-slate-400 mb-8 leading-relaxed">
        5 levels. From &quot;What is AI?&quot; to &quot;I built an AI app.&quot;
        <br />
        Guided by Byte, your AI tutor. 100% free.
      </p>

      <div className="flex flex-col gap-3 mb-8">
        {[
          { level: "1", label: "AI Aware", color: "text-nd-green" },
          { level: "2", label: "AI Explorer", color: "text-nd-cyan" },
          { level: "3", label: "AI Practitioner", color: "text-nd-yellow" },
          { level: "4", label: "AI Developer", color: "text-nd-orange" },
          { level: "5", label: "AI Builder", color: "text-nd-red" },
        ].map((l) => (
          <div
            key={l.level}
            className="flex items-center gap-3 bg-nd-surface/60 rounded-xl px-4 py-2.5 border border-nd-border/50"
          >
            <span className={`font-mono font-bold ${l.color}`}>
              L{l.level}
            </span>
            <span className="text-sm text-slate-300">{l.label}</span>
          </div>
        ))}
      </div>

      <OrangeBtn size="lg" onClick={onNext} className="w-full">
        Start Your Journey
      </OrangeBtn>

      <button className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-nd-border bg-nd-surface text-white font-medium hover:bg-nd-card transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}

/* --- Screen 2: Account --- */
type FormData = {
  role: string;
  username: string;
  email: string;
  password: string;
  ageBracket: string;
  parentName: string;
  parentEmail: string;
  consent: boolean[];
};

function AccountStep({
  formData,
  setFormData,
  onNext,
}: {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
}) {
  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
      <p className="text-slate-400 text-sm mb-6">
        Choose your role and set up your profile.
      </p>

      {/* Role selector */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {["learner", "parent"].map((role) => (
          <button
            key={role}
            onClick={() => update("role", role)}
            className={`p-4 rounded-xl border text-center font-medium transition-all ${
              formData.role === role
                ? "border-nd-orange bg-nd-orange/10 text-nd-orange-hi"
                : "border-nd-border bg-nd-surface text-slate-400 hover:border-nd-blue"
            }`}
          >
            <div className="text-2xl mb-1">
              {role === "learner" ? "🎓" : "👨‍👩‍👧"}
            </div>
            <div className="capitalize">{role}</div>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => update("username", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-nd-surface border border-nd-border text-white placeholder-slate-500 focus:outline-none focus:border-nd-blue focus:shadow-glow transition-all"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-nd-surface border border-nd-border text-white placeholder-slate-500 focus:outline-none focus:border-nd-blue focus:shadow-glow transition-all"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => update("password", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-nd-surface border border-nd-border text-white placeholder-slate-500 focus:outline-none focus:border-nd-blue focus:shadow-glow transition-all"
        />

        <div>
          <label className="text-xs font-mono text-slate-400 mb-2 block">
            AGE BRACKET
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: "under13", label: "Under 13" },
              { value: "13-15", label: "13–15" },
              { value: "16-17", label: "16–17" },
              { value: "18+", label: "18+" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => update("ageBracket", opt.value)}
                className={`py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  formData.ageBracket === opt.value
                    ? "border-nd-cyan bg-nd-cyan/10 text-nd-cyan"
                    : "border-nd-border bg-nd-surface text-slate-400 hover:border-nd-blue"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <OrangeBtn
        size="md"
        className="w-full mt-6"
        onClick={onNext}
        disabled={
          !formData.username || !formData.email || !formData.password || !formData.ageBracket
        }
      >
        Continue
      </OrangeBtn>
    </div>
  );
}

/* --- Screen 3: Parent Consent --- */
function ConsentStep({
  formData,
  setFormData,
  onNext,
}: {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
}) {
  const update = (field: string, value: string | boolean[]) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const toggleConsent = (i: number) => {
    const next = [...formData.consent];
    next[i] = !next[i];
    update("consent", next);
  };

  const allConsented = formData.consent.every(Boolean);

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">🛡️</span>
        <h2 className="text-2xl font-bold">Parent / Guardian Consent</h2>
      </div>
      <p className="text-slate-400 text-sm mb-6">
        Because you&apos;re under 16, we need your parent&apos;s permission before you
        can access content. This keeps you safe and us compliant.
      </p>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Parent / Guardian Full Name"
          value={formData.parentName}
          onChange={(e) => update("parentName", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-nd-surface border border-nd-border text-white placeholder-slate-500 focus:outline-none focus:border-nd-blue focus:shadow-glow transition-all"
        />
        <input
          type="email"
          placeholder="Parent / Guardian Email"
          value={formData.parentEmail}
          onChange={(e) => update("parentEmail", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-nd-surface border border-nd-border text-white placeholder-slate-500 focus:outline-none focus:border-nd-blue focus:shadow-glow transition-all"
        />
      </div>

      <div className="space-y-3 mb-6">
        {[
          "I consent to my child using NeuralDash and understand their learning data will be stored securely.",
          "I understand NeuralDash uses AI tutoring that is age-gated and content-filtered for safety.",
          "I understand I can review all AI conversations, request data deletion within 30 days, and revoke consent at any time.",
        ].map((text, i) => (
          <label
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl bg-nd-surface border border-nd-border cursor-pointer hover:border-nd-blue transition-colors"
          >
            <input
              type="checkbox"
              checked={formData.consent[i]}
              onChange={() => toggleConsent(i)}
              className="mt-1 accent-nd-orange"
            />
            <span className="text-sm text-slate-300 leading-relaxed">
              {text}
            </span>
          </label>
        ))}
      </div>

      <div className="bg-nd-green-dim border border-nd-green/30 rounded-xl p-4 mb-6">
        <h4 className="text-sm font-bold text-nd-green mb-2">
          Privacy Protection
        </h4>
        <ul className="text-xs text-slate-400 space-y-1">
          <li>No advertising or tracking</li>
          <li>AI conversations are age-gated and filtered</li>
          <li>Only username displayed — no real names</li>
          <li>All data deletable within 30 days on request</li>
        </ul>
      </div>

      <OrangeBtn
        size="md"
        className="w-full"
        onClick={onNext}
        disabled={!allConsented || !formData.parentName || !formData.parentEmail}
      >
        Submit Consent &amp; Continue
      </OrangeBtn>
    </div>
  );
}

/* --- Screen 4: Placement Quiz --- */
const quizQuestions = [
  {
    category: "AI Awareness",
    question: "Which of these is an example of AI you use every day?",
    options: [
      "A calculator app",
      "Spotify's Discover Weekly playlist",
      "A basic alarm clock",
      "A paper dictionary",
    ],
    correct: 1,
    feedback: {
      correct: "Spot on! Spotify uses AI to learn what you like and recommend new music.",
      wrong: "Not quite — Spotify's Discover Weekly is powered by AI that learns your listening habits!",
    },
  },
  {
    category: "ML Concepts",
    question:
      "In machine learning, what does 'training' a model mean?",
    options: [
      "Writing the code for the model",
      "Feeding it data so it learns patterns",
      "Testing the model on new data",
      "Deploying it to users",
    ],
    correct: 1,
    feedback: {
      correct: "Exactly! Training means feeding a model data so it can learn patterns.",
      wrong: "Training is when you feed the model data so it can learn patterns — like showing thousands of cat photos so it learns what a cat looks like.",
    },
  },
  {
    category: "AI in the Wild",
    question:
      "What technology lets your phone unlock with your face?",
    options: [
      "Blockchain",
      "Computer vision (a type of AI)",
      "Quantum computing",
      "Cloud storage",
    ],
    correct: 1,
    feedback: {
      correct: "Yes! Face unlock uses computer vision, a branch of AI that understands images.",
      wrong: "It's computer vision — AI that can 'see' and understand images, including your face!",
    },
  },
  {
    category: "Python Check",
    question: "What does this Python code print?\n\nprint(len([1, 2, 3]))",
    options: ["[1, 2, 3]", "6", "3", "Error"],
    correct: 2,
    feedback: {
      correct: "Nice! len() counts the items in the list, which is 3.",
      wrong: "len() counts the number of items in a list. [1, 2, 3] has 3 items, so it prints 3.",
    },
  },
];

function QuizStep({
  quizIndex,
  setQuizIndex,
  quizAnswers,
  setQuizAnswers,
  onComplete,
}: {
  quizIndex: number;
  setQuizIndex: (n: number) => void;
  quizAnswers: number[];
  setQuizAnswers: (a: number[]) => void;
  onComplete: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const q = quizQuestions[quizIndex];
  const progress = ((quizIndex + (showFeedback ? 1 : 0)) / quizQuestions.length) * 100;

  const handleSelect = (optIndex: number) => {
    if (showFeedback) return;
    setSelected(optIndex);
    setShowFeedback(true);
    setQuizAnswers([...quizAnswers, optIndex]);
  };

  const handleNext = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      onComplete();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-nd-orange tracking-wider">
          PLACEMENT QUIZ
        </span>
        <span className="text-xs font-mono text-slate-500">
          {quizIndex + 1} / {quizQuestions.length}
        </span>
      </div>

      {/* GD-style progress bar */}
      <div className="w-full h-2 bg-nd-surface rounded-full mb-6 overflow-hidden border border-nd-border">
        <div
          className="gd-progress-bar h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Running cube indicator */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-nd-orange rounded-sm animate-cube-run" />
        <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          {q.category}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-6 whitespace-pre-line">
        {q.question}
      </h3>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => {
          let borderColor = "border-nd-border hover:border-nd-blue";
          if (showFeedback) {
            if (i === q.correct) borderColor = "border-nd-green bg-nd-green-dim";
            else if (i === selected && i !== q.correct)
              borderColor = "border-nd-red bg-nd-red-dim";
            else borderColor = "border-nd-border opacity-50";
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showFeedback}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${borderColor} bg-nd-surface`}
            >
              <span className="font-mono text-slate-500 mr-3">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div
          className={`p-4 rounded-xl border mb-6 animate-slide-up ${
            selected === q.correct
              ? "bg-nd-green-dim border-nd-green/30"
              : "bg-nd-orange-dim border-nd-orange/30"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono font-bold text-sm">
              {selected === q.correct ? "🤖 Byte says:" : "🤖 Byte says:"}
            </span>
          </div>
          <p className="text-sm text-slate-300">
            {selected === q.correct ? q.feedback.correct : q.feedback.wrong}
          </p>
        </div>
      )}

      {showFeedback && (
        <OrangeBtn size="md" className="w-full" onClick={handleNext}>
          {quizIndex < quizQuestions.length - 1 ? "Next Question" : "See My Level"}
        </OrangeBtn>
      )}
    </div>
  );
}

/* --- Screen 5: Level Recommendation --- */
function LevelRecommendation({
  answers,
  username,
}: {
  answers: number[];
  username: string;
}) {
  const scores = {
    awareness: answers[0] === quizQuestions[0].correct ? 100 : 30,
    ml: answers[1] === quizQuestions[1].correct ? 100 : 25,
    wild: answers[2] === quizQuestions[2].correct ? 100 : 20,
    python: answers[3] === quizQuestions[3].correct ? 100 : 0,
  };

  const avg =
    (scores.awareness + scores.ml + scores.wild + scores.python) / 4;

  let recommendedLevel: 1 | 2 | 3 | 4 | 5;
  if (avg >= 90) recommendedLevel = 3;
  else if (avg >= 60) recommendedLevel = 2;
  else recommendedLevel = 1;

  const levelNames: Record<number, string> = {
    1: "AI Aware",
    2: "AI Explorer",
    3: "AI Practitioner",
    4: "AI Developer",
    5: "AI Builder",
  };

  const dimensions = [
    { label: "AI Awareness", score: scores.awareness, color: "bg-nd-blue" },
    { label: "ML Concepts", score: scores.ml, color: "bg-nd-cyan" },
    { label: "AI in the Wild", score: scores.wild, color: "bg-nd-green" },
    { label: "Python Coding", score: scores.python, color: "bg-nd-orange" },
  ];

  return (
    <div className="text-center">
      <div className="text-4xl mb-4">🎯</div>
      <h2 className="text-2xl font-bold mb-2">
        Welcome, {username}!
      </h2>
      <p className="text-slate-400 mb-8">
        Based on your quiz, here&apos;s where we think you should start.
      </p>

      {/* Score breakdown */}
      <div className="space-y-3 mb-8 text-left">
        {dimensions.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-mono text-slate-400">
                {d.label}
              </span>
              <span className="text-xs font-mono text-slate-300 font-bold">
                {d.score}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-nd-surface rounded-full border border-nd-border overflow-hidden">
              <div
                className={`h-full rounded-full ${d.color} transition-all duration-700`}
                style={{ width: `${d.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recommended level */}
      <div className="bg-nd-surface border-2 border-nd-orange rounded-2xl p-6 mb-6">
        <span className="text-xs font-mono text-nd-orange tracking-widest uppercase block mb-2">
          RECOMMENDED START
        </span>
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-4xl font-mono font-bold text-nd-orange">
            L{recommendedLevel}
          </span>
          <span className="text-2xl font-bold">
            {levelNames[recommendedLevel]}
          </span>
        </div>
        <DifficultyBadge level={recommendedLevel} />

        <div className="mt-4 text-left">
          <span className="text-xs font-mono text-slate-500 block mb-2">
            WHAT YOU&apos;LL BUILD AT THIS LEVEL:
          </span>
          {recommendedLevel === 1 && (
            <p className="text-sm text-slate-300">
              Understand how AI powers your favourite apps — from Spotify
              recommendations to TikTok&apos;s algorithm. No coding required.
            </p>
          )}
          {recommendedLevel === 2 && (
            <p className="text-sm text-slate-300">
              Explore how machines learn using concepts from games like
              Minecraft. Build your first simple ML model visually.
            </p>
          )}
          {recommendedLevel === 3 && (
            <p className="text-sm text-slate-300">
              Start coding in Python! Build real ML models that predict
              football scores and classify images — all in your browser.
            </p>
          )}
        </div>
      </div>

      <OrangeBtn size="lg" className="w-full mb-4">
        Start Level {recommendedLevel}
      </OrangeBtn>
      <button className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
        Choose a different level
      </button>
    </div>
  );
}
