import Link from "next/link";
import { STATES } from "@/data/states";
import { POSTS } from "@/data/posts";
import { Icon } from "./Icon";
import { AppIconConcept } from "./PhoneMockup";

/** Optional right rail: state quick filter, safety reminder, featured, teaser. */
export function Sidebar() {
  const featured = [...POSTS].sort((a, b) => b.supportCount - a.supportCount).slice(0, 3);
  const quickStates = STATES.filter((s) =>
    ["CA", "TX", "FL", "GA", "NY", "OH"].includes(s.code)
  );

  return (
    <aside className="space-y-5">
      {/* Quick state filter */}
      <div className="card p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-harbor-900">
          <Icon name="map" size={16} /> Quick state filter
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {quickStates.map((s) => (
            <Link key={s.code} href={`/community/${s.slug}`} className="pill hover:bg-harbor-100">
              {s.name}
            </Link>
          ))}
        </div>
        <Link href="/states" className="mt-3 inline-block text-xs font-medium text-harbor-600 hover:underline">
          See all states →
        </Link>
      </div>

      {/* Safety reminder */}
      <div className="card border-gold-300/60 bg-gold-300/10 p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-harbor-900">
          <Icon name="shield" size={16} /> A gentle reminder
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-harbor-800">
          Do not post exact personal details in public discussions. Little Harbor
          is a community support space, not a substitute for professional medical
          care.
        </p>
        <Link href="/safety" className="mt-2 inline-block text-xs font-medium text-harbor-600 hover:underline">
          Read the safety guide →
        </Link>
      </div>

      {/* Featured discussions */}
      <div className="card p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-harbor-900">
          <Icon name="star" size={16} /> Featured discussions
        </h3>
        <ul className="mt-3 space-y-3">
          {featured.map((p) => (
            <li key={p.id}>
              <Link href="/community" className="block text-sm font-medium text-harbor-800 hover:underline">
                {p.title}
              </Link>
              <span className="text-xs text-mist-500">{p.supportCount} support · {p.replyCount} replies</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Future app teaser */}
      <div className="card overflow-hidden">
        <div className="bg-harbor-800 p-5 text-white">
          <div className="flex items-center gap-3">
            <AppIconConcept size={52} />
            <div>
              <h3 className="text-sm font-semibold text-white">The future app</h3>
              <p className="text-xs text-harbor-100">Safe, parent-oriented meetups — later.</p>
            </div>
          </div>
          <Link href="/future-app" className="btn-gold mt-4 w-full">Join the waitlist</Link>
        </div>
      </div>
    </aside>
  );
}
