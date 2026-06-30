import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROFILES, profileById, CURRENT_USER } from "@/data/profiles";
import { POSTS } from "@/data/posts";
import { stateByCode } from "@/data/states";
import { joinDate } from "@/lib/format";
import { canSendMessages } from "@/lib/verification";
import { Avatar } from "@/components/Avatar";
import { Icon } from "@/components/Icon";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { PostCard } from "@/components/PostCard";
import { SafetyBanner } from "@/components/Safety";

export function generateStaticParams() {
  return PROFILES.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = profileById(params.id);
  return { title: p ? `${p.displayName}` : "Parent profile" };
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const profile = profileById(params.id);
  if (!profile) notFound();

  const state = stateByCode(profile.stateCode);
  const isSelf = profile.id === CURRENT_USER.id;
  const messagingAllowed = canSendMessages(CURRENT_USER) && !isSelf;
  const posts = POSTS.filter((p) => p.authorId === profile.id);

  return (
    <div className="section grid gap-8 py-10 lg:grid-cols-[340px_1fr]">
      {/* Profile card */}
      <div className="space-y-5">
        <div className="card p-6 text-center">
          <div className="flex justify-center">
            <Avatar name={profile.displayName} size={88} />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-harbor-900">{profile.displayName}</h1>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {state && (
              <span className="pill"><Icon name="map" size={13} /> {state.name}</span>
            )}
            <VerifiedBadge status={profile.verifiedParentStatus} />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-mist-700">{profile.bio}</p>

          <div className="mt-5 grid grid-cols-2 gap-3 text-center">
            <Stat label="Posts" value={profile.postsCount} />
            <Stat label="Member since" value={joinDate(profile.createdAt)} />
          </div>

          {/* Actions */}
          <div className="mt-5 space-y-2">
            {isSelf ? (
              <Link href="/profile/p-maya" className="btn-secondary w-full">Edit profile (mock)</Link>
            ) : messagingAllowed ? (
              <Link href="/messages" className="btn-primary w-full">
                <Icon name="mail" size={18} /> Send a private message
              </Link>
            ) : (
              <button className="btn-secondary w-full cursor-not-allowed opacity-70" disabled>
                <Icon name="lock" size={16} /> Messaging unavailable
              </button>
            )}
            {!isSelf && (
              <div className="flex gap-2">
                <button className="btn-ghost flex-1 text-mist-700">Mute</button>
                <button className="btn-ghost flex-1 text-mist-700">Block</button>
                <button className="btn-ghost flex-1 text-mist-700">
                  <Icon name="flag" size={15} /> Report
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Areas of experience */}
        {profile.supportTopics && profile.supportTopics.length > 0 && (
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-harbor-900">Areas of experience</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.supportTopics.map((t) => (
                <span key={t} className="pill">{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Child age ranges (optional, privacy-conscious) */}
        {profile.childAgeRanges && profile.childAgeRanges.length > 0 && (
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-harbor-900">Child age range(s)</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.childAgeRanges.map((r) => (
                <span key={r} className="pill border-sand-300 bg-sand-100 text-harbor-800">{r}</span>
              ))}
            </div>
            <p className="mt-3 text-xs text-mist-500">
              Age ranges only — we never collect a child&apos;s full name, birthdate, school, or medical details.
            </p>
          </div>
        )}
      </div>

      {/* Activity */}
      <div className="space-y-5">
        {!isSelf && (
          <SafetyBanner icon="lock">
            Connecting privately? Take your time. Little Harbor encourages
            trust-building before exchanging off-platform contact information.
          </SafetyBanner>
        )}
        <h2 className="text-lg font-semibold text-harbor-900">
          {isSelf ? "Your recent posts" : `Recent posts from ${profile.displayName}`}
        </h2>
        {posts.length > 0 ? (
          <div className="grid gap-4">
            {posts.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        ) : (
          <div className="card p-8 text-center text-sm text-mist-700">
            No posts yet — and that&apos;s perfectly okay. Reading and reacting count too.
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-harbor-50 p-3">
      <p className="text-sm font-bold text-harbor-900">{value}</p>
      <p className="text-xs text-mist-500">{label}</p>
    </div>
  );
}
