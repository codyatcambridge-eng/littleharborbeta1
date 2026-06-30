"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { STATES } from "@/data/states";

/**
 * Auth form (beta is UI-only). Wire `onSubmit` to Supabase auth later:
 *   supabase.auth.signInWithPassword / signUp, then create a profile row.
 */
export function AuthForm() {
  const [mode, setMode] = useState<"signin" | "join">("join");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="card p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-harbor-100 text-harbor-600">
          <Icon name="check" size={24} />
        </span>
        <h2 className="mt-4 text-xl font-bold text-harbor-900">You&apos;re all set (demo).</h2>
        <p className="mt-2 text-sm text-mist-700">
          This is a beta preview — no account was created. Connect Supabase auth to
          make this real.
        </p>
        <button className="btn-secondary mt-5" onClick={() => setDone(false)}>Back</button>
      </div>
    );
  }

  return (
    <div className="card p-7">
      <div className="mb-6 flex rounded-full border border-mist-200 bg-mist-50 p-1 text-sm">
        <button
          onClick={() => setMode("join")}
          className={`flex-1 rounded-full px-4 py-2 font-medium ${mode === "join" ? "bg-harbor-500 text-white" : "text-mist-700"}`}
        >
          Join the beta
        </button>
        <button
          onClick={() => setMode("signin")}
          className={`flex-1 rounded-full px-4 py-2 font-medium ${mode === "signin" ? "bg-harbor-500 text-white" : "text-mist-700"}`}
        >
          Sign in
        </button>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
        {mode === "join" && (
          <Field label="Display name">
            <input required placeholder="e.g. Maya R." className="lh-input" />
            <p className="mt-1 text-xs text-mist-500">First name + initial is perfect. No full names needed.</p>
          </Field>
        )}

        <Field label="Email">
          <input type="email" required placeholder="you@example.com" className="lh-input" />
        </Field>

        <Field label="Password">
          <input type="password" required placeholder="••••••••" className="lh-input" />
        </Field>

        {mode === "join" && (
          <Field label="Your state">
            <select className="lh-input" defaultValue="GA">
              {STATES.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
            </select>
          </Field>
        )}

        {mode === "join" && (
          <label className="flex items-start gap-2 text-xs text-mist-700">
            <input type="checkbox" required className="mt-0.5" />
            <span>
              I am a parent or caregiver, I&apos;m 18+, and I agree to keep the
              community safe (no harassment, no sharing others&apos; personal details).
            </span>
          </label>
        )}

        <button type="submit" className="btn-primary w-full">
          {mode === "join" ? "Create my parent account" : "Sign in"}
        </button>
      </form>

      <style>{`.lh-input{width:100%;border:1px solid #dde2e6;border-radius:0.75rem;padding:0.625rem 0.875rem;font-size:0.875rem;outline:none;}.lh-input:focus{border-color:#90bccf;}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-mist-700">{label}</span>
      {children}
    </label>
  );
}
