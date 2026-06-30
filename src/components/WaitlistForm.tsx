"use client";

import { useState } from "react";
import { Icon } from "./Icon";

/** Future-app waitlist CTA. Local-only in beta — wire to your email provider. */
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-harbor-700 px-4 py-3 text-sm text-harbor-50">
        <Icon name="check" size={18} /> You&apos;re on the list. We&apos;ll reach out gently — no spam.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="flex-1 rounded-full border border-harbor-600 bg-harbor-700 px-4 py-3 text-sm text-white placeholder:text-harbor-200 outline-none focus:border-gold-400"
      />
      <button type="submit" className="btn-gold">Join the waitlist</button>
    </form>
  );
}
