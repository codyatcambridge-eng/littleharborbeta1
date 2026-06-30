"use client";

import { useState } from "react";
import { CATEGORIES } from "@/data/categories";
import { STATES, stateByCode } from "@/data/states";
import { scanForPersonalDetails } from "@/lib/moderation";
import { Icon } from "./Icon";
import { SafetyBanner } from "./Safety";

/**
 * Create-post composer (beta is local-only — submitting shows a confirmation
 * rather than persisting). Demonstrates the gentle personal-details warning
 * powered by the placeholder moderation scan.
 */
export function ComposePost({
  lockedStateCode,
  onClose,
}: {
  lockedStateCode?: string;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [stateCode, setStateCode] = useState(lockedStateCode ?? "GA");
  const [submitted, setSubmitted] = useState(false);

  const scan = scanForPersonalDetails(`${title} ${body}`);

  if (submitted) {
    return (
      <div className="card flex items-center gap-3 p-5">
        <span className="text-harbor-500"><Icon name="check" size={22} /></span>
        <div>
          <p className="font-semibold text-harbor-900">Thank you for sharing.</p>
          <p className="text-sm text-mist-700">
            In the beta this is a preview — your post isn&apos;t published yet.
            Wire up Supabase to make it live.
          </p>
        </div>
        <button className="btn-ghost ml-auto" onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <form
      className="card space-y-4 p-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-harbor-900">Start a conversation</h3>
        <button type="button" className="btn-ghost" onClick={onClose} aria-label="Close composer">
          <Icon name="close" size={18} />
        </button>
      </div>

      <input
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Give it a title…"
        className="w-full rounded-xl border border-mist-200 px-3 py-2.5 text-sm outline-none focus:border-harbor-300"
      />

      <textarea
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        placeholder="Share what's on your heart. Remember: no exact addresses, phone numbers, school names, or a child's full name."
        className="w-full resize-y rounded-xl border border-mist-200 px-3 py-2.5 text-sm outline-none focus:border-harbor-300"
      />

      {scan.flagged && (
        <SafetyBanner icon="shield" tone="warm">
          It looks like your post may include {scan.reasons.join(", ")}. For your
          family&apos;s safety, please keep personal contact details out of public
          posts.
        </SafetyBanner>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-mist-700">Topic</span>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-xl border border-mist-200 px-3 py-2 outline-none focus:border-harbor-300"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-mist-700">State community</span>
          <select
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            disabled={!!lockedStateCode}
            className="w-full rounded-xl border border-mist-200 px-3 py-2 outline-none focus:border-harbor-300 disabled:bg-mist-100"
          >
            {STATES.map((s) => (
              <option key={s.code} value={s.code}>{s.name}</option>
            ))}
          </select>
          {lockedStateCode && (
            <span className="mt-1 block text-xs text-mist-500">
              Posting to {stateByCode(lockedStateCode)?.name}.
            </span>
          )}
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-primary">Post to the community</button>
      </div>
    </form>
  );
}
