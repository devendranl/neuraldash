# NeuralDash — Claude Code CLI Setup Guide

## Prerequisites

```bash
# 1. Install Node.js (v18+)
# Download from https://nodejs.org or use nvm:
nvm install 18
nvm use 18

# 2. Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# 3. Authenticate
export ANTHROPIC_API_KEY="sk-ant-your-key-here"
# OR
claude auth login
```

## Quick Start

```bash
# Clone/navigate to the project
cd neuraldash

# Install dependencies
npm install

# Start Claude Code in autonomous mode
claude

# First prompt — let Claude read the project context:
> Read CLAUDE.md and docs/PRD.md, then continue building the MVP from where the BACKLOG left off.
```

## Recommended Claude Code Prompts

### Session 1: Database & Auth
```
Read CLAUDE.md, docs/ARCHITECTURE.md, and .claude/agents/backend-agent.md.
Set up Prisma with the data model from ARCHITECTURE.md.
Then implement NextAuth.js with Google OAuth and credentials provider.
Include the parental consent gate middleware.
Run tests after each component.
```

### Session 2: Complete Onboarding Flow
```
Read CLAUDE.md and .claude/agents/frontend-agent.md.
The onboarding UI is built but needs backend wiring.
Connect the 5-screen onboarding to real API routes:
1. Account creation → POST /api/auth/register
2. Parent consent → POST /api/auth/consent
3. Placement quiz → POST /api/assessment/placement
4. Level assignment → POST /api/progress/assign-level
Follow the design system in CLAUDE.md. Run tests.
```

### Session 3: AI Tutor Integration
```
Read CLAUDE.md and .claude/agents/backend-agent.md.
Implement the AI Tutor API:
1. POST /api/tutor/chat — sends message to Claude API with context
2. Content safety middleware that filters responses
3. System prompt with Socratic method, age-appropriate tone
4. Context injection: learner level, current module, recent activity
Never give direct answers. Use the Byte persona.
Write content safety tests. Update .claude/memory/session-log.md.
```

### Session 4: Assessment Engine
```
Read CLAUDE.md and docs/PRD.md section 6.7.
Build the assessment engine:
1. Adaptive question selection based on learner responses
2. 70% pass mark for level-up
3. Maturity Score calculation across 4 dimensions
4. Gate logic: 75% maturity score unlocks assessment
5. Remediation pathway on failure
```

### Session 5: Gamification
```
Read CLAUDE.md and docs/PRD.md sections 6.8.
Implement the full gamification system:
1. XP calculation and awarding per activity type
2. Badge criteria checking and award logic
3. Streak tracking with daily reset and shield mechanic
4. Level-up animation and notification
5. Parent notification on level-up
```

### Session 6: Polish & Deploy
```
Read CLAUDE.md and .claude/agents/qa-agent.md.
Final sprint:
1. Run full accessibility audit (WCAG 2.1 AA)
2. Performance optimization — target 2s dashboard load
3. Write Playwright e2e tests for onboarding and level-up flows
4. Security review — consent gate bypass tests
5. Create Vercel deployment config
6. Update all docs and session log
```

## Autonomous Development Tips

### High Autonomy Mode
```bash
# Let Claude work with minimal interruptions
claude --dangerously-skip-permissions
```

### Resume Previous Session
```bash
# Continue where you left off
claude --resume
```

### Use Specific Agents
```
# In Claude Code session:
> Read .claude/agents/frontend-agent.md and act as the Frontend Agent.
> Build the lesson player component following the design system.
```

### Check Decision Log
```
# In Claude Code session:
> Read .claude/memory/decisions.md and resolve any pending decisions.
```

## Project Structure

```
neuraldash/
├── CLAUDE.md                    # Master instructions (read first!)
├── .claude/
│   ├── settings.json            # Autonomy & permissions config
│   ├── agents/                  # Agent definitions
│   │   ├── pm-agent.md
│   │   ├── architect-agent.md
│   │   ├── frontend-agent.md
│   │   ├── backend-agent.md
│   │   └── qa-agent.md
│   └── memory/                  # Persistent state across sessions
│       ├── decisions.md         # Pending & resolved decisions
│       └── session-log.md       # What was done each session
├── docs/
│   ├── PRD.md                   # Full product requirements
│   ├── ARCHITECTURE.md          # System design & data model
│   └── BACKLOG.md               # Sprint-based task tracking
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── page.tsx             # Landing page + onboarding
│   │   └── dashboard/page.tsx   # Learning dashboard + AI tutor
│   ├── components/
│   │   ├── ui/                  # Design system components
│   │   └── gamification/        # Game-inspired UI
│   ├── lib/                     # Utilities, API clients
│   └── data/                    # Seed data, curriculum content
└── tests/                       # Vitest + Playwright tests
```

## Key Files for Claude Code Context

When starting any session, Claude automatically reads:
1. `CLAUDE.md` — Identity, stack, rules, design system
2. `docs/PRD.md` — What to build and why
3. `docs/ARCHITECTURE.md` — How to build it

Memory files that persist between sessions:
- `.claude/memory/decisions.md` — Pending decisions
- `.claude/memory/session-log.md` — Work completed per session
