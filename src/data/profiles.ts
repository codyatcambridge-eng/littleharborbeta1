import { Profile } from "@/lib/types";

/**
 * Mock parent profiles. Display names are first-name + initial only — modeling
 * the privacy posture we want users to adopt. No child full names, no schools,
 * no addresses anywhere in seed data.
 */
export const PROFILES: Profile[] = [
  {
    id: "p-maya",
    userId: "u-maya",
    displayName: "Maya R.",
    avatarUrl: null,
    bio: "Mom of two, one with a complex heart condition. Coffee-fueled, fiercely hopeful. Here to listen as much as to talk.",
    stateCode: "GA",
    role: "parent",
    verifiedParentStatus: "verified",
    childAgeRanges: ["3–5", "8–10"],
    supportTopics: ["Chronic Illness", "Hospital Stays", "Emotional Support"],
    postsCount: 34,
    createdAt: "2025-11-02",
  },
  {
    id: "p-darnell",
    userId: "u-darnell",
    displayName: "Darnell W.",
    avatarUrl: null,
    bio: "Dad navigating an autism diagnosis and a lot of IEP meetings. Learning to advocate without burning out.",
    stateCode: "FL",
    role: "parent",
    verifiedParentStatus: "verified",
    childAgeRanges: ["6–8"],
    supportTopics: ["Developmental Support", "School & IEP", "Daily Wins"],
    postsCount: 21,
    createdAt: "2026-01-14",
  },
  {
    id: "p-elena",
    userId: "u-elena",
    displayName: "Elena S.",
    avatarUrl: null,
    bio: "Caregiver to a kiddo with a rare genetic condition. I journal to stay grounded. Ask me about respite care.",
    stateCode: "TX",
    role: "parent",
    verifiedParentStatus: "pending",
    childAgeRanges: ["0–2"],
    supportTopics: ["Rare Conditions", "Respite Care", "Practical Resources"],
    postsCount: 12,
    createdAt: "2026-03-08",
  },
  {
    id: "p-james",
    userId: "u-james",
    displayName: "James P.",
    avatarUrl: null,
    bio: "Single dad, son has cerebral palsy. Big believer in adaptive everything. Always happy to share gear that worked for us.",
    stateCode: "OH",
    role: "parent",
    verifiedParentStatus: "verified",
    childAgeRanges: ["8–10"],
    supportTopics: ["Disability & Accessibility", "Adaptive Equipment"],
    postsCount: 41,
    createdAt: "2025-12-19",
  },
  {
    id: "p-priya",
    userId: "u-priya",
    displayName: "Priya N.",
    avatarUrl: null,
    bio: "Mom + pediatric nurse, but here strictly as a parent. Type 1 diabetes household. Gentle days to you all.",
    stateCode: "CA",
    role: "moderator",
    verifiedParentStatus: "verified",
    childAgeRanges: ["11–13"],
    supportTopics: ["Chronic Illness", "Emotional Support", "Community Care"],
    postsCount: 88,
    createdAt: "2025-10-01",
  },
  {
    id: "p-sam",
    userId: "u-sam",
    displayName: "Sam T.",
    avatarUrl: null,
    bio: "Parent of a sensory-sensitive preschooler. Still figuring it out, one calm-down corner at a time.",
    stateCode: "GA",
    role: "parent",
    verifiedParentStatus: "unverified",
    childAgeRanges: ["3–5"],
    supportTopics: ["Sensory Needs", "Developmental Support"],
    postsCount: 6,
    createdAt: "2026-05-21",
  },
];

export const profileById = (id: string) =>
  PROFILES.find((p) => p.id === id);

/** The "logged in" mock user, used to gate messaging UI in the beta. */
export const CURRENT_USER = PROFILES[0];
