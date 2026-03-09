# NeuralDash — Architecture Document

## System Overview

```
Browser (Teen/Parent)
  ├── Next.js App (Vercel)
  │   ├── App Router (Server Components default)
  │   ├── Client Components (interactive: quiz, sandbox, tutor chat)
  │   └── API Routes
  │       ├── /api/auth/* (NextAuth.js)
  │       ├── /api/tutor/* (AI Tutor with safety layer)
  │       ├── /api/progress/* (XP, streaks, levels)
  │       ├── /api/assessment/* (adaptive quiz engine)
  │       └── /api/parent/* (parent dashboard data)
  ├── Prisma ORM → PostgreSQL (Neon)
  ├── Claude API (AI Tutor)
  └── Pyodide (browser-side Python sandbox)
```

## Tech Stack
| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 14 (App Router) | Server Components, Vercel deployment, API routes |
| Language | TypeScript (strict) | Type safety, developer experience |
| Styling | Tailwind CSS | Utility-first, dark theme, responsive |
| Components | shadcn/ui + custom GD components | Accessible base + game-inspired overlays |
| Database | PostgreSQL (Neon serverless) | Free tier, serverless, Prisma compatible |
| ORM | Prisma | Type-safe queries, migration management |
| Auth | NextAuth.js v5 | Google OAuth + credentials, session management |
| AI | Anthropic SDK (Claude API) | AI Tutor primary, abstraction layer for fallback |
| Python | Pyodide (WebAssembly) | Browser-native Python, no server execution |
| Testing | Vitest + Playwright | Unit + e2e coverage |
| Deploy | Vercel | Zero-config Next.js hosting |

## Data Model (Core Entities)

### User
```
id, username, email, hashedPassword, role (LEARNER|PARENT),
ageBracket, parentEmail, consentVerified, createdAt
```

### LearnerProfile
```
id, userId, currentLevel (1-5), totalXP, currentStreak,
longestStreak, streakShieldAvailable, maturityScores (JSON),
placementLevel, onboardingCompleted
```

### Module
```
id, level (1-5), order, title, theme, type (VIDEO|READING|CODING|QUIZ),
content (JSON), externalUrl, estimatedMinutes
```

### Progress
```
id, learnerId, moduleId, status (NOT_STARTED|IN_PROGRESS|COMPLETED),
score, xpEarned, completedAt, timeSpentSeconds
```

### Assessment
```
id, learnerId, level, type (PLACEMENT|LEVEL_UP),
questions (JSON), answers (JSON), score, passed, attemptNumber
```

### TutorConversation
```
id, learnerId, moduleId, messages (JSON),
safetyFlags (JSON), createdAt
```

### Badge
```
id, learnerId, type, name, description, awardedAt
```

## Security Architecture
1. **Auth:** NextAuth.js with JWT sessions, Google OAuth + credentials
2. **Consent Gate:** Middleware checks consent status before content routes
3. **AI Safety:** All Claude API responses pass through content filter before delivery
4. **Data:** Username-only display, no PII in logs, GDPR/COPPA compliant
5. **Sandbox:** Pyodide runs entirely in browser — no server code execution

## API Routes

### Auth
- `POST /api/auth/[...nextauth]` — NextAuth handlers
- `POST /api/auth/consent` — Parent consent verification

### Learning
- `GET /api/modules?level={n}` — Get modules for level
- `POST /api/progress` — Update module progress
- `GET /api/dashboard` — Dashboard data (level, XP, streak, next module)

### AI Tutor
- `POST /api/tutor/chat` — Send message, get AI response
- `GET /api/tutor/history?moduleId={id}` — Get conversation history

### Assessment
- `POST /api/assessment/start` — Start assessment
- `POST /api/assessment/answer` — Submit answer, get next question
- `GET /api/assessment/result/{id}` — Get assessment results

### Gamification
- `GET /api/xp` — Current XP and level progress
- `GET /api/badges` — Earned badges
- `GET /api/streak` — Streak status

### Parent
- `GET /api/parent/overview` — Child progress summary
- `GET /api/parent/conversations` — AI Tutor conversation logs
