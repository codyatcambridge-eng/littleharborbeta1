import type { Metadata } from "next";
import { PhoneMockup, AppIconConcept } from "@/components/PhoneMockup";
import { Icon } from "@/components/Icon";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SafetyBanner } from "@/components/Safety";

export const metadata: Metadata = {
  title: "The Future App",
  description: "A look ahead at the Little Harbor mobile app — safe, parent-oriented meetups, built carefully.",
};

export default function FutureAppPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="bg-harbor-800 py-16 text-white">
        <div className="section grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="pill border-harbor-600 bg-harbor-700 text-harbor-50">
              <Icon name="phone" size={14} /> Coming soon
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              The Little Harbor app is on the horizon.
            </h1>
            <p className="mt-4 max-w-xl leading-relaxed text-harbor-100">
              The beta website builds support and connection first. The future
              Little Harbor app will offer a more advanced experience — including
              safe, parent-oriented local play date meetup discovery so children
              can have friends they connect with safely. Every meetup, and every
              sharing of personal details, will sit behind careful safety
              verification.
            </p>
            <p className="mt-4 leading-relaxed text-harbor-100">
              We&apos;re designing it carefully — not recklessly.
            </p>
            <div className="mt-7">
              <WaitlistForm />
            </div>
          </div>
          <div className="flex flex-col items-center gap-8">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* App icon concept */}
      <section className="section py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="pill"><Icon name="anchor" size={14} /> App icon concept</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">A mark that feels like a harbor</h2>
            <p className="mt-4 leading-relaxed text-mist-700">
              The icon brings together gentle harbor symbolism — a lighthouse for
              guidance, calm waves for steadiness — in a soft blue, gold, and cream
              palette. Minimal, clean, memorable, and parent-friendly.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-mist-700">
              <li className="flex items-center gap-2"><Icon name="check" size={16} /> Lighthouse = guidance &amp; safety</li>
              <li className="flex items-center gap-2"><Icon name="check" size={16} /> Waves = calm, anchored steadiness</li>
              <li className="flex items-center gap-2"><Icon name="check" size={16} /> Soft palette = warmth, not clinical</li>
            </ul>
          </div>
          <div className="flex items-center justify-center gap-6">
            <AppIconConcept size={120} />
            <div className="flex gap-3">
              <AppIconConcept size={64} />
              <AppIconConcept size={44} />
            </div>
          </div>
        </div>
      </section>

      {/* What's coming */}
      <section className="bg-white py-14">
        <div className="section">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">What&apos;s coming</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-mist-700">
            A careful roadmap — each feature gated by safety, not speed.
          </p>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {COMING.map((f) => (
              <div key={f.title} className="flex items-start gap-3 rounded-xl border border-mist-200 p-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-harbor-100 text-harbor-600">
                  <Icon name={f.icon as any} size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-harbor-900">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-mist-700">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety-first commitment */}
      <section className="section py-14">
        <div className="mx-auto max-w-3xl">
          <SafetyBanner icon="shield" tone="warm">
            To be clear: the meetup features do <strong>not</strong> exist yet. The
            beta is about building the support foundation and the trust that has to
            come first. We will not enable in-person connection until verification
            and moderation are genuinely ready and legally reviewed.
          </SafetyBanner>
        </div>
      </section>
    </div>
  );
}

const COMING = [
  { icon: "shield", title: "Verified parent matching", body: "Connect with parents whose verification and trust signals you can see." },
  { icon: "users", title: "Safe meetup planning flow", body: "A staged, opt-in process for play dates — never exposing exact locations early." },
  { icon: "hands", title: "Support circles", body: "Small, private groups for parents on similar journeys." },
  { icon: "heart", title: "Child friendship goals", body: "Parent-guided pathways for children to build safe friendships and have more ordinary social moments." },
  { icon: "chat", title: "Topic-based groups", body: "Deeper spaces around specific conditions, stages, and needs." },
  { icon: "map", title: "Local event discovery", body: "Find inclusive, accessible events nearby — broadly, never address-level." },
  { icon: "lock", title: "Safety verification process", body: "Identity and parent checks before any meetup or personal sharing." },
  { icon: "check", title: "Privacy controls", body: "Granular control over what you share, with whom, and when." },
  { icon: "star", title: "Parent trust indicators", body: "Clear, honest signals that help you decide who to connect with." },
];
