import type { Metadata } from "next";
import Link from "next/link";
import { STATES } from "@/data/states";
import { Icon } from "@/components/Icon";
import { SafetyBanner } from "@/components/Safety";

export const metadata: Metadata = {
  title: "Browse by State",
  description: "Find parents in your U.S. state navigating similar journeys.",
};

export default function StatesPage() {
  return (
    <div className="section py-10 lg:py-14">
      <header className="mx-auto max-w-2xl text-center">
        <span className="pill mx-auto"><Icon name="map" size={14} /> State communities</span>
        <h1 className="mt-4 text-3xl font-bold text-harbor-900 sm:text-4xl">Find parents in your state</h1>
        <p className="mt-3 text-mist-700">
          Connecting by state helps you find others navigating life somewhere
          near you — in a broad, safe sense. We never surface neighborhoods or
          addresses.
        </p>
      </header>

      <div className="mx-auto mt-8 max-w-2xl">
        <SafetyBanner icon="shield">
          State filtering is intentionally broad. It helps with belonging and
          local resource sharing — not exact-location discovery.
        </SafetyBanner>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STATES.map((s) => (
          <Link
            key={s.code}
            href={`/community/${s.slug}`}
            className="card flex items-center justify-between p-4 transition-shadow hover:shadow-soft"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-harbor-100 text-sm font-bold text-harbor-700">
                {s.code}
              </span>
              <span className="font-medium text-harbor-900">{s.name}</span>
            </div>
            <span className="text-xs text-mist-500">{s.activeMembers} parents</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
