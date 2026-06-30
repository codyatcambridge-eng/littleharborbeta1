import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { MedicalDisclaimer, SafetyBanner } from "@/components/Safety";

export const metadata: Metadata = {
  title: "Safety & Verification",
  description: "How Little Harbor protects parents: moderation, reporting, privacy, and our verification goals.",
};

export default function SafetyPage() {
  return (
    <div className="section py-10 lg:py-14">
      <header className="mx-auto max-w-3xl text-center">
        <span className="pill mx-auto"><Icon name="shield" size={14} /> Safety &amp; verification</span>
        <h1 className="mt-4 text-3xl font-bold text-harbor-900 sm:text-4xl">
          A community built around your safety
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-mist-700">
          Little Harbor is designed with privacy and parent safety in mind. Here&apos;s
          what that means today in the beta — and what we&apos;re building toward as
          parents connect with similar peers and, eventually, help children form
          safe friendships.
        </p>
      </header>

      <div className="mx-auto mt-8 max-w-3xl space-y-4">
        <MedicalDisclaimer />
        <SafetyBanner icon="shield" tone="warm">
          Do not post exact personal details — addresses, phone numbers, school
          names, or a child&apos;s full name — in public discussions.
        </SafetyBanner>
      </div>

      {/* Core principles */}
      <section className="mx-auto mt-12 max-w-4xl">
        <h2 className="text-2xl font-bold text-harbor-900">Our community standards</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="card p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-harbor-100 text-harbor-600">
                <Icon name={p.icon as any} size={20} />
              </span>
              <h3 className="mt-3 text-base font-semibold text-harbor-900">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-mist-700">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Verification */}
      <section className="mx-auto mt-12 max-w-3xl calm-prose">
        <h2>Parent verification (our goal)</h2>
        <p>
          A core goal for Little Harbor is a trustworthy parent-verification
          process, shown as a visible badge on profiles. In the current beta,
          verification status is a <strong>placeholder</strong> — a clear signal of
          where we&apos;re headed, not a completed safety control. We&apos;ll be honest
          about that distinction at every step.
        </p>
        <p>
          As verification matures, more sensitive actions — like the future app&apos;s
          meetup features — will require it. No exact locations or contact details
          will ever be shared until every participant is verified and has opted in.
        </p>

        <h2 id="report">Reporting &amp; contacting a moderator</h2>
        <p>
          Every post, comment, message, and profile has report and block options.
          If something feels unsafe, tell us — a moderator will review it. In an
          emergency, contact your physician or emergency services first.
        </p>
        <div className="not-prose">
          <SafetyBanner icon="flag">
            To report something now: use the <strong>Report</strong> button on any post,
            profile, or message. In the production build this routes to the
            moderation queue (see the moderator dashboard mockup).
          </SafetyBanner>
        </div>

        <h2 id="privacy">Privacy (placeholder)</h2>
        <p>
          We collect only what we need to run a supportive community. We never ask
          for a child&apos;s full name, birthdate, school, address, or medical records.
          A full, legally reviewed privacy policy will live here before any public
          launch.
        </p>

        <h2 id="terms">Terms of use (placeholder)</h2>
        <p>
          No harassment, bullying, predatory behavior, or unsafe conduct of any
          kind. No sharing of others&apos; identifying details. Little Harbor is for
          parents and caregivers — there are no child or teen accounts in the beta.
          Full, legally reviewed terms will be published before public launch.
        </p>
      </section>
    </div>
  );
}

const PRINCIPLES = [
  { icon: "hands", title: "Peer support, not medical advice", body: "We share experience and encouragement. We never diagnose or replace professional care." },
  { icon: "shield", title: "No unsafe sharing", body: "Keep addresses, phone numbers, school names, and a child's full name out of public posts." },
  { icon: "flag", title: "Report & block, always", body: "Every surface has reporting and blocking. Harassment and predatory behavior are not tolerated." },
  { icon: "lock", title: "Careful private messaging", body: "Messaging is parent-to-parent only, with gentle warnings before personal details are exchanged." },
  { icon: "users", title: "Parents only in beta", body: "There are no child or teen accounts. The community is built for caregivers." },
  { icon: "heart", title: "Child connection stays parent-guided", body: "Future friendship and meetup features must be controlled by verified parents, with safety checks before any personal sharing." },
  { icon: "check", title: "Moderation-ready", body: "Architecture supports human review, flags, and moderation actions from day one." },
];
