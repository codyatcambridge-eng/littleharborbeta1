"use client";

import { useMemo, useState } from "react";
import { CONVERSATIONS, MESSAGES } from "@/data/messages";
import { profileById, CURRENT_USER } from "@/data/profiles";
import { PrivateMessage } from "@/lib/types";
import { scanForPersonalDetails } from "@/lib/moderation";
import { timeAgo } from "@/lib/format";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import { MessagingSafetyBanner, SafetyBanner } from "./Safety";

/**
 * Private messaging UI: inbox list + conversation thread.
 * - Messaging is parent-to-parent only (gated upstream by canSendMessages).
 * - A persistent safety banner sits above the thread.
 * - Typing personal contact details triggers a gentle, non-blocking warning.
 * - Block / mute / report live in the thread header.
 */
export function Messenger() {
  const [activeId, setActiveId] = useState(CONVERSATIONS[0]?.id ?? null);
  // Local-only message state so the demo feels responsive.
  const [drafts, setDrafts] = useState<Record<string, PrivateMessage[]>>(MESSAGES);
  const [input, setInput] = useState("");

  const active = CONVERSATIONS.find((c) => c.id === activeId);
  const partner = active
    ? profileById(active.participantIds.find((id) => id !== CURRENT_USER.id) ?? "")
    : null;
  const thread = activeId ? drafts[activeId] ?? [] : [];
  const scan = useMemo(() => scanForPersonalDetails(input), [input]);

  function send() {
    if (!input.trim() || !activeId) return;
    const msg: PrivateMessage = {
      id: `m-${Date.now()}`,
      conversationId: activeId,
      senderId: CURRENT_USER.id,
      content: input.trim(),
      createdAt: new Date().toISOString(),
      flaggedStatus: scan.flagged ? "auto_flagged" : "clean",
    };
    setDrafts((d) => ({ ...d, [activeId]: [...(d[activeId] ?? []), msg] }));
    setInput("");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      {/* Inbox list */}
      <div className="card overflow-hidden">
        <div className="border-b border-mist-200 px-4 py-3">
          <h2 className="text-sm font-semibold text-harbor-900">Inbox</h2>
        </div>
        <ul>
          {CONVERSATIONS.map((c) => {
            const other = profileById(c.participantIds.find((id) => id !== CURRENT_USER.id) ?? "");
            const isActive = c.id === activeId;
            return (
              <li key={c.id}>
                <button
                  onClick={() => setActiveId(c.id)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                    isActive ? "bg-harbor-50" : "hover:bg-mist-50"
                  }`}
                >
                  {other && <Avatar name={other.displayName} size={40} />}
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-harbor-900">
                        {other?.displayName}
                      </span>
                      <span className="shrink-0 text-xs text-mist-500">{timeAgo(c.lastMessageAt)}</span>
                    </span>
                    <span className="block truncate text-xs text-mist-500">{c.lastSnippet}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Conversation thread */}
      <div className="card flex min-h-[28rem] flex-col">
        {partner ? (
          <>
            {/* Thread header with safety actions */}
            <div className="flex items-center justify-between border-b border-mist-200 px-4 py-3">
              <div className="flex items-center gap-3">
                <Avatar name={partner.displayName} size={36} />
                <div>
                  <p className="text-sm font-semibold text-harbor-900">{partner.displayName}</p>
                  <p className="text-xs text-mist-500">Registered parent</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-mist-700">
                <button className="btn-ghost px-2 py-1">Mute</button>
                <button className="btn-ghost px-2 py-1">Block</button>
                <button className="btn-ghost px-2 py-1"><Icon name="flag" size={14} /> Report</button>
              </div>
            </div>

            {/* Persistent safety banner */}
            <div className="px-4 pt-3">
              <MessagingSafetyBanner />
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {thread.map((m) => {
                const mine = m.senderId === CURRENT_USER.id;
                return (
                  <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                        mine
                          ? "rounded-br-sm bg-harbor-500 text-white"
                          : "rounded-bl-sm bg-mist-100 text-mist-900"
                      }`}
                    >
                      <p>{m.content}</p>
                      <p className={`mt-1 text-[10px] ${mine ? "text-harbor-100" : "text-mist-500"}`}>
                        {timeAgo(m.createdAt)}
                        {m.flaggedStatus === "auto_flagged" && " · flagged for review"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Composer */}
            <div className="border-t border-mist-200 p-3">
              {scan.flagged && (
                <div className="mb-2">
                  <SafetyBanner icon="shield" tone="warm">
                    It looks like you&apos;re about to share {scan.reasons.join(", ")}.
                    Please be sure you trust this person before sharing off-platform
                    contact details.
                  </SafetyBanner>
                </div>
              )}
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  rows={1}
                  placeholder="Write a message…"
                  className="max-h-32 flex-1 resize-none rounded-2xl border border-mist-200 px-4 py-2.5 text-sm outline-none focus:border-harbor-300"
                />
                <button className="btn-primary" onClick={send} disabled={!input.trim()}>
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-8 text-center text-sm text-mist-700">
            Select a conversation to begin.
          </div>
        )}
      </div>
    </div>
  );
}
