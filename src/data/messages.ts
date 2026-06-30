import { PrivateConversation, PrivateMessage } from "@/lib/types";

/** Mock inbox for the current user (p-maya). Messaging is parent-to-parent only. */
export const CONVERSATIONS: PrivateConversation[] = [
  {
    id: "conv-1",
    participantIds: ["p-maya", "p-priya"],
    lastMessageAt: "2026-06-29T02:10:00Z",
    lastSnippet: "Thinking of you before the appointment. You've got this.",
  },
  {
    id: "conv-2",
    participantIds: ["p-maya", "p-james"],
    lastMessageAt: "2026-06-27T18:30:00Z",
    lastSnippet: "Totally — happy to share what worked for the travel setup.",
  },
];

export const MESSAGES: Record<string, PrivateMessage[]> = {
  "conv-1": [
    {
      id: "m-1",
      conversationId: "conv-1",
      senderId: "p-priya",
      content: "Saw your post about the cardiology check. Sending calm your way.",
      createdAt: "2026-06-28T20:01:00Z",
      flaggedStatus: "clean",
    },
    {
      id: "m-2",
      conversationId: "conv-1",
      senderId: "p-maya",
      content: "Thank you. The night-before nerves are real. Appreciate you.",
      createdAt: "2026-06-28T20:14:00Z",
      flaggedStatus: "clean",
    },
    {
      id: "m-3",
      conversationId: "conv-1",
      senderId: "p-priya",
      content: "Thinking of you before the appointment. You've got this.",
      createdAt: "2026-06-29T02:10:00Z",
      flaggedStatus: "clean",
    },
  ],
  "conv-2": [
    {
      id: "m-4",
      conversationId: "conv-2",
      senderId: "p-maya",
      content: "Hi James — your adaptive stroller post was so helpful. Mind if I ask a couple questions?",
      createdAt: "2026-06-27T18:02:00Z",
      flaggedStatus: "clean",
    },
    {
      id: "m-5",
      conversationId: "conv-2",
      senderId: "p-james",
      content: "Totally — happy to share what worked for the travel setup.",
      createdAt: "2026-06-27T18:30:00Z",
      flaggedStatus: "clean",
    },
  ],
};
