# NeuralDash — Product Requirements Document

## 1. Overview
NeuralDash is a web-based AI education platform for teenagers (13–18). It guides learners through a 5-level AI Maturity Framework — from AI awareness to building real applications — using gamification inspired by Geometry Dash, an AI tutor, and curated free courses.

## 2. Core Features (MVP — Phase 1)

### F1: Learner Onboarding (5 screens)
1. **Welcome/Splash** — Branding, 5-level journey preview, "Start Your Journey" CTA, Google Sign-In
2. **Create Account** — Role selector (Learner/Parent), username, email, password, age bracket
3. **Parent Consent Gate** — GDPR/COPPA compliance, 3 consent checkboxes, privacy summary
4. **Placement Quiz** — 4 adaptive questions, GD-style progress bar, Byte persona feedback
5. **Level Recommendation** — Score breakdown, recommended level, "What you'll build" preview

### F2: Learning Dashboard
- Current level, progress map, next step on login
- Locked levels with previews for motivation
- Streak counter, XP display, daily goal tracker
- 2-second load target

### F3: Lesson Player
- Video lessons with inline concept checks
- Reading content with highlighting
- Module completion tracking

### F4: Python Coding Sandbox
- Pyodide (WebAssembly) for Levels 1–3: browser-native Python
- Google Colab deep-links for Levels 4–5
- Starter code templates for all exercises

### F5: AI Tutor ("Byte")
- Claude API powered conversational tutor
- Context-aware: knows learner's level, module, history
- Socratic method — never gives direct answers
- Age-appropriate, encouraging tone
- Content safety filter on all responses
- Attention rescue prompts after 8+ min inactivity

### F6: Assessment Engine
- Level-up assessments: 70% pass mark
- Maturity Score across 4 dimensions (AI Awareness, ML Concepts, Python, Deployment)
- 75% maturity score required to unlock assessment
- Adaptive question difficulty

### F7: Gamification
- XP for module completion, quizzes, daily streaks
- Badge system (First Login, Level Cleared, Streak Master, etc.)
- Learning streak with shield mechanic (30-day earn)
- Geometry Dash difficulty badges per level

### F9: Parent Dashboard
- Child progress overview
- AI Tutor conversation review
- Weekly email digest
- Privacy controls

## 3. AI Maturity Levels
| Level | Name | Theme | Key Outcome |
|-------|------|-------|-------------|
| 1 | AI Aware | "The Algorithm Has Been Watching You" | Understand AI in daily life |
| 2 | AI Explorer | "How Minecraft Explains ML" | Core ML concepts |
| 3 | AI Practitioner | "Your Football Club's Data Scientists Write Python" | Python + ML basics |
| 4 | AI Developer | "MrBeast's Thumbnail Team vs. Neural Networks" | Deep learning + deployment |
| 5 | AI Builder | "The NPC That Broke the Internet" | LLMs, APIs, capstone project |

## 4. Non-Functional Requirements
- WCAG 2.1 AA compliance
- Mobile-responsive (>= 768px)
- No third-party analytics profiling minors
- All data deletable within 30 days
- AI Tutor response < 3 seconds (95th percentile)
- Dashboard load < 2 seconds
