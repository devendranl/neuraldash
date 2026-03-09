const BLOCKED_PATTERNS = [
  // Violence & weapons
  /\b(kill|murder|weapon|gun|bomb|explo[ds]e|shoot|stab)\b/i,
  // Self-harm
  /\b(suicide|self[- ]?harm|cut myself|end my life)\b/i,
  // Sexual content
  /\b(sex|porn|nude|naked|nsfw)\b/i,
  // Drugs & substances
  /\b(drugs?|cocaine|heroin|meth|weed|marijuana)\b/i,
  // Personal info solicitation
  /\b(phone number|home address|where do you live|social security)\b/i,
  // Prompt injection attempts
  /\b(ignore previous|ignore all|system prompt|you are now|pretend to be)\b/i,
];

const FLAGGED_PATTERNS = [
  // Mild concern — log but allow
  /\b(hate|stupid|dumb|idiot)\b/i,
  /\b(cheat|hack|crack|bypass)\b/i,
];

export interface FilterResult {
  allowed: boolean;
  flagged: boolean;
  reason: string | null;
}

export function filterInput(text: string): FilterResult {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      return {
        allowed: false,
        flagged: true,
        reason: "Message contains content that isn't appropriate for our learning environment.",
      };
    }
  }

  let flagged = false;
  for (const pattern of FLAGGED_PATTERNS) {
    if (pattern.test(text)) {
      flagged = true;
      break;
    }
  }

  return { allowed: true, flagged, reason: null };
}

export function filterOutput(text: string): FilterResult {
  // Apply same filters to AI output as a safety net
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      return {
        allowed: false,
        flagged: true,
        reason: "Response filtered for safety.",
      };
    }
  }

  return { allowed: true, flagged: false, reason: null };
}
