/**
 * PLACEHOLDER moderation helpers for the beta.
 *
 * These are lightweight, transparent stand-ins so the product *feels* safe and
 * the architecture is moderation-ready. None of this replaces human review.
 */

/** Patterns that suggest someone is sharing exact personal contact details. */
const RISKY_PATTERNS: Array<{ label: string; re: RegExp }> = [
  { label: "phone number", re: /(\+?\d[\d\s().-]{7,}\d)/ },
  { label: "email address", re: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i },
  { label: "street address", re: /\b\d{1,5}\s+([A-Za-z]+\s){1,3}(st|street|ave|avenue|rd|road|blvd|ln|lane|dr|drive)\b/i },
  { label: "social handle", re: /(?:^|\s)@[A-Za-z0-9_]{3,}/ },
];

export interface ContentScan {
  flagged: boolean;
  reasons: string[];
}

/**
 * Soft scan used to show a *gentle* content warning before someone shares
 * personal details too quickly. It never blocks — it nudges.
 */
export function scanForPersonalDetails(text: string): ContentScan {
  const reasons = RISKY_PATTERNS.filter((p) => p.re.test(text)).map((p) => p.label);
  return { flagged: reasons.length > 0, reasons };
}

/** PLACEHOLDER: in production this would enqueue a report for a moderator. */
export function submitReport(input: {
  reporterId: string;
  targetType: string;
  targetId: string;
  reason: string;
}): { ok: boolean; note: string } {
  return {
    ok: true,
    note: `Report received for ${input.targetType}:${input.targetId}. A moderator will review. (Placeholder.)`,
  };
}
