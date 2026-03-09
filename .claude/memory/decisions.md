# Pending Decisions

## Decision #1: AI Tutor LLM Provider
**Context:** AI Tutor needs an LLM API. Claude API is primary, GPT-4 is fallback.
**Recommendation:** Start with Claude API (Anthropic SDK). Build abstraction layer for future provider swaps.
**Status:** Accepted — proceeding with Claude API primary

## Decision #2: Database Provider
**Context:** Need PostgreSQL hosting for MVP.
**Options:**
1. Supabase (free tier, 500MB)
2. Neon (free tier, 3GB, serverless)
3. Railway ($5/mo, unlimited)

**Recommendation:** Neon — generous free tier, native serverless, easy Vercel integration.
**Status:** Awaiting human input

## Decision #3: Python Sandbox Approach
**Context:** Levels 1–3 need browser-based Python execution.
**Decision:** Pyodide (WebAssembly) for full browser-native execution. No server-side code execution.
**Status:** Accepted per PRD

---

# Resolved Decisions
(none yet)
