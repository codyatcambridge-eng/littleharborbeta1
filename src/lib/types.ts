/**
 * Shared domain types for Little Harbor (beta).
 *
 * These mirror the database schema in /db/schema.sql so that swapping the
 * mock data layer for Supabase later is a low-friction change.
 */

export type Role = "parent" | "moderator" | "admin";

/** Trust ladder. Verification logic is intentionally a placeholder in beta. */
export type VerifiedParentStatus = "unverified" | "pending" | "verified";

export type VisibilityStatus = "visible" | "hidden" | "removed" | "under_review";

export type FlaggedStatus = "clean" | "flagged" | "auto_flagged" | "reviewed";

export interface UsState {
  code: string; // e.g. "GA"
  name: string; // e.g. "Georgia"
  slug: string; // e.g. "georgia"
  activeMembers: number; // mock metric
}

export interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** Calm icon key resolved in the UI (see components/Icon.tsx). */
  icon: string;
}

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string;
  stateCode: string;
  role: Role;
  verifiedParentStatus: VerifiedParentStatus;
  /** Optional, privacy-conscious. Never collect child full names / DOB. */
  childAgeRanges?: string[];
  supportTopics?: string[];
  postsCount: number;
  createdAt: string; // ISO date — used as "join date"
}

export interface Post {
  id: string;
  authorId: string;
  categoryId: string;
  stateCode: string;
  title: string;
  body: string;
  snippet: string;
  createdAt: string;
  updatedAt: string;
  visibilityStatus: VisibilityStatus;
  replyCount: number;
  supportCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  body: string;
  createdAt: string;
  supportCount: number;
}

export interface PrivateConversation {
  id: string;
  participantIds: string[];
  lastMessageAt: string;
  lastSnippet: string;
}

export interface PrivateMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  flaggedStatus: FlaggedStatus;
}

export type ReportTargetType = "post" | "comment" | "message" | "profile";

export interface Report {
  id: string;
  reporterId: string;
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
  createdAt: string;
  status: "open" | "reviewing" | "resolved";
}

export interface ModerationAction {
  id: string;
  moderatorId: string;
  targetType: ReportTargetType;
  targetId: string;
  action: "hide" | "remove" | "warn" | "verify" | "dismiss";
  note: string;
  createdAt: string;
}
