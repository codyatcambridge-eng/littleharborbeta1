import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { STATES, stateBySlug } from "@/data/states";
import { ForumView } from "@/components/ForumView";
import { Sidebar } from "@/components/Sidebar";
import { Icon } from "@/components/Icon";
import { SafetyBanner } from "@/components/Safety";

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export function generateMetadata({ params }: { params: { state: string } }): Metadata {
  const state = stateBySlug(params.state);
  return {
    title: state ? `${state.name} Parent Community` : "State Community",
    description: state
      ? `Connect with parents in ${state.name} navigating illness, disability, and support needs.`
      : undefined,
  };
}

export default function StateCommunityPage({ params }: { params: { state: string } }) {
  const state = stateBySlug(params.state);
  if (!state) notFound();

  return (
    <div className="section py-8 lg:py-12">
      <Link href="/states" className="mb-4 inline-flex items-center gap-1 text-sm text-harbor-600 hover:underline">
        <Icon name="map" size={15} /> All state communities
      </Link>

      <header className="mb-6 rounded-2xl bg-gradient-to-br from-harbor-100 to-sand-100 p-6 sm:p-8">
        <span className="pill"><Icon name="anchor" size={14} /> State community</span>
        <h1 className="mt-3 text-3xl font-bold text-harbor-900">{state.name}</h1>
        <p className="mt-2 text-mist-700">
          <span className="font-semibold text-harbor-700">{state.activeMembers}</span> active parent
          members · connecting in a broad, privacy-conscious way.
        </p>
      </header>

      <div className="mb-6">
        <SafetyBanner icon="shield" tone="warm">
          State communities help you find parents in a broad sense — never your
          exact neighborhood or address. Please keep precise personal details out
          of public posts.
        </SafetyBanner>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <ForumView lockedStateCode={state.code} />
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
