"use client";

import { useState } from "react";
import { Icon } from "./Icon";

export function CommunityInputForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-harbor-200 bg-harbor-50 p-5 text-harbor-900">
        <div className="flex items-center gap-2 font-semibold">
          <Icon name="check" size={18} /> Thank you for sharing.
        </div>
        <p className="mt-2 text-sm leading-relaxed text-mist-700">
          Your response is captured in this beta experience. The next production
          step is wiring this form to an email inbox or form service.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="card p-5 sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-harbor-900">Name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            className="mt-1 w-full rounded-xl border border-mist-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-harbor-400 focus:ring-2 focus:ring-harbor-100"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-harbor-900">Email or contact information</span>
          <input
            name="contact"
            type="text"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-mist-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-harbor-400 focus:ring-2 focus:ring-harbor-100"
            placeholder="Email, phone, or preferred contact"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-semibold text-harbor-900">
          What should this community have?
        </span>
        <textarea
          name="community-needs"
          required
          rows={7}
          className="mt-1 w-full resize-y rounded-xl border border-mist-200 bg-white px-3.5 py-3 text-sm leading-relaxed outline-none transition focus:border-harbor-400 focus:ring-2 focus:ring-harbor-100"
          placeholder="Share the support, features, safeguards, resources, events, or parent tools you believe Little Harbor should include."
        />
      </label>

      <label className="mt-4 flex items-start gap-3 rounded-xl bg-sand-50 p-3 text-sm leading-relaxed text-mist-700">
        <input
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-mist-300 text-harbor-600 focus:ring-harbor-500"
        />
        <span>
          I understand this beta form is for community input, not urgent medical,
          safety, or crisis support.
        </span>
      </label>

      <button type="submit" className="btn-primary mt-5">
        <Icon name="mail" size={18} /> Send community input
      </button>
    </form>
  );
}
