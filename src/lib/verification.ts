/**
 * PLACEHOLDER verification logic for the beta.
 *
 * Verification is intentionally NOT implemented for real yet. This module
 * defines the *shape* of the trust system so the UI and future backend can be
 * wired up without a redesign. Do not treat any of this as a real safety
 * control until a proper process + human review is built and legally reviewed.
 *
 * ── Future child/teen safety architecture notes ───────────────────────────
 *  - The beta is PARENT-ONLY. There are no child or teen accounts, and the
 *    messaging beta must never allow them.
 *  - Any future feature involving minors (or meetups) must layer:
 *      1. Identity / parent verification (document or third-party check)
 *      2. Background-screening review where legally appropriate
 *      3. Explicit, revocable consent flows
 *      4. Staged disclosure: NO exact location/contact data until all parties
 *         are verified AND have opted in
 *      5. Human moderation in the loop before any in-person connection
 *  - Treat these as hard gates, not toggles.
 */

import { Profile, VerifiedParentStatus } from "@/lib/types";

/** Can this user start a private conversation in the beta? */
export function canSendMessages(user: Profile | null): boolean {
  if (!user) return false;
  // Beta rule: must be a registered parent. We *prefer* verified/pending users.
  return user.role !== "admin" ? user.verifiedParentStatus !== "unverified" : true;
}

/** Trust level used to gate sensitive actions in the UI. */
export function trustLevel(status: VerifiedParentStatus): 0 | 1 | 2 {
  return status === "verified" ? 2 : status === "pending" ? 1 : 0;
}

/** PLACEHOLDER: a real flow would kick off document/third-party verification. */
export function requestVerification(userId: string): { ok: boolean; note: string } {
  return {
    ok: true,
    note: `Verification requested for ${userId}. (Placeholder — no real check performed.)`,
  };
}
