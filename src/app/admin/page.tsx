import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { profileById } from "@/data/profiles";
import { SafetyBanner } from "@/components/Safety";

export const metadata: Metadata = {
  title: "Moderator Dashboard (Mockup)",
  description: "A simple mockup of the Little Harbor moderation tooling.",
};

/** Mock moderation queue — illustrates the moderation-ready architecture. */
const QUEUE = [
  { id: "r-1", target: "post", reason: "Possible personal details shared (phone number)", reporter: "p-priya", status: "open" as const },
  { id: "r-2", target: "message", reason: "User asked to move off-platform very quickly", reporter: "p-james", status: "reviewing" as const },
  { id: "r-3", target: "profile", reason: "Requesting verification review", reporter: "p-elena", status: "open" as const },
];

const VERIFY_QUEUE = ["p-elena", "p-sam"];

export default function AdminPage() {
  return (
    <div className="section py-10 lg:py-14">
      <header className="mb-6">
        <span className="pill"><Icon name="shield" size={14} /> Internal mockup</span>
        <h1 className="mt-3 text-3xl font-bold text-harbor-900">Moderator Dashboard</h1>
        <p className="mt-2 max-w-2xl text-mist-700">
          A simple mockup of the tooling that keeps Little Harbor safe. In
          production this is role-gated (moderator / admin) and backed by the
          <code className="mx-1 rounded bg-mist-100 px-1">reports</code> and
          <code className="mx-1 rounded bg-mist-100 px-1">moderation_actions</code> tables.
        </p>
      </header>

      <div className="mb-6">
        <SafetyBanner icon="info">
          This page is a non-functional mockup. Buttons don&apos;t persist changes in
          the beta — they show where real moderation actions will live.
        </SafetyBanner>
      </div>

      {/* Stat row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <StatCard label="Open reports" value="3" icon="flag" />
        <StatCard label="Pending verifications" value="2" icon="shield" />
        <StatCard label="Auto-flagged messages" value="1" icon="lock" />
        <StatCard label="Active members" value="1,284" icon="users" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Report queue */}
        <section className="card overflow-hidden">
          <h2 className="border-b border-mist-200 px-5 py-3 text-sm font-semibold text-harbor-900">
            Report queue
          </h2>
          <ul className="divide-y divide-mist-100">
            {QUEUE.map((r) => (
              <li key={r.id} className="px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="pill capitalize">{r.target}</span>
                  <span className={`text-xs font-semibold ${r.status === "open" ? "text-gold-500" : "text-harbor-600"}`}>
                    {r.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-mist-700">{r.reason}</p>
                <p className="mt-1 text-xs text-mist-500">
                  Reported by {profileById(r.reporter)?.displayName ?? "a parent"}
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="btn-secondary px-3 py-1.5 text-xs">Review</button>
                  <button className="btn-ghost px-3 py-1.5 text-xs">Hide content</button>
                  <button className="btn-ghost px-3 py-1.5 text-xs">Dismiss</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Verification queue */}
        <section className="card overflow-hidden">
          <h2 className="border-b border-mist-200 px-5 py-3 text-sm font-semibold text-harbor-900">
            Verification queue
          </h2>
          <ul className="divide-y divide-mist-100">
            {VERIFY_QUEUE.map((id) => {
              const p = profileById(id);
              return (
                <li key={id} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-harbor-900">{p?.displayName}</p>
                    <p className="text-xs text-mist-500">{p?.stateCode} · awaiting review</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-primary px-3 py-1.5 text-xs">Approve</button>
                    <button className="btn-ghost px-3 py-1.5 text-xs">Decline</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="px-5 py-3 text-xs text-mist-500">
            Verification logic is a placeholder — see{" "}
            <code className="rounded bg-mist-100 px-1">src/lib/verification.ts</code>.
          </p>
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-harbor-100 text-harbor-600">
        <Icon name={icon} size={20} />
      </span>
      <div>
        <p className="text-lg font-bold text-harbor-900">{value}</p>
        <p className="text-xs text-mist-500">{label}</p>
      </div>
    </div>
  );
}
