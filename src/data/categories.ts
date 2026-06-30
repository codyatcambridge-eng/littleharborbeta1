import { ForumCategory } from "@/lib/types";

export const CATEGORIES: ForumCategory[] = [
  {
    id: "cat-intros",
    name: "Introductions",
    slug: "introductions",
    description: "New here? Say a gentle hello. No pressure, share only what feels right.",
    icon: "wave",
  },
  {
    id: "cat-wins",
    name: "Daily Wins",
    slug: "daily-wins",
    description: "The small victories that deserve to be celebrated out loud.",
    icon: "star",
  },
  {
    id: "cat-questions",
    name: "Questions for Other Parents",
    slug: "questions",
    description: "Ask the people who get it. Peer perspective, never medical advice.",
    icon: "chat",
  },
  {
    id: "cat-chronic",
    name: "Chronic Illness Support",
    slug: "chronic-illness",
    description: "Walking the long road of ongoing health needs, together.",
    icon: "heart",
  },
  {
    id: "cat-disability",
    name: "Disability & Accessibility",
    slug: "disability-accessibility",
    description: "Navigating access, advocacy, and everyday life with dignity.",
    icon: "anchor",
  },
  {
    id: "cat-school",
    name: "School & IEP / Support Systems",
    slug: "school-iep",
    description: "IEPs, 504s, services, and finding the right people in the system.",
    icon: "book",
  },
  {
    id: "cat-emotional",
    name: "Emotional Support",
    slug: "emotional-support",
    description: "A soft place for the hard days. You don't have to be okay here.",
    icon: "hands",
  },
  {
    id: "cat-therapy",
    name: "Therapy / Developmental Support",
    slug: "therapy-development",
    description: "OT, PT, speech, behavioral and developmental journeys.",
    icon: "leaf",
  },
  {
    id: "cat-resources",
    name: "Practical Resource Sharing",
    slug: "resources",
    description: "Tools, tips, programs, and resources parents actually use.",
    icon: "compass",
  },
  {
    id: "cat-hard-seasons",
    name: "Parenting Through Hard Seasons",
    slug: "hard-seasons",
    description: "For the chapters that ask more of us than we thought we had.",
    icon: "lighthouse",
  },
  {
    id: "cat-announcements",
    name: "Moderator Announcements",
    slug: "announcements",
    description: "Updates and gentle reminders from the Little Harbor team.",
    icon: "bell",
  },
];

export const categoryById = (id: string) =>
  CATEGORIES.find((c) => c.id === id);

export const categoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);
