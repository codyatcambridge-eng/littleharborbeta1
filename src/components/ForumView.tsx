"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Post } from "@/lib/types";
import { POSTS } from "@/data/posts";
import { CATEGORIES } from "@/data/categories";
import { STATES, stateByCode } from "@/data/states";
import { PostCard } from "./PostCard";
import { Icon } from "./Icon";
import { PublicDetailsNotice } from "./Safety";
import { ComposePost } from "./ComposePost";

type Sort = "recent" | "active" | "trending";

/**
 * The core community feed. Reused on /community (all states) and on each
 * /community/[state] page (locked to one state).
 */
export function ForumView({
  lockedStateCode,
}: {
  /** When set, the feed is fixed to a single state and the state filter hides. */
  lockedStateCode?: string;
}) {
  const [query, setQuery] = useState("");
  const [stateCode, setStateCode] = useState<string>(lockedStateCode ?? "ALL");
  const [categoryId, setCategoryId] = useState<string>("ALL");
  const [sort, setSort] = useState<Sort>("recent");
  const [composeOpen, setComposeOpen] = useState(false);

  const filtered = useMemo(() => {
    let list: Post[] = POSTS.filter((p) => p.visibilityStatus === "visible");

    const effectiveState = lockedStateCode ?? stateCode;
    if (effectiveState !== "ALL") list = list.filter((p) => p.stateCode === effectiveState);
    if (categoryId !== "ALL") list = list.filter((p) => p.categoryId === categoryId);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
      );
    }

    const sorted = [...list];
    if (sort === "recent") sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    if (sort === "active") sorted.sort((a, b) => b.replyCount - a.replyCount);
    if (sort === "trending") sorted.sort((a, b) => b.supportCount - a.supportCount);
    return sorted;
  }, [query, stateCode, categoryId, sort, lockedStateCode]);

  return (
    <div className="space-y-5">
      <PublicDetailsNotice />

      {/* Search + compose */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search the forum</span>
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mist-500">
            <Icon name="search" size={18} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations…"
            className="w-full rounded-full border border-mist-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-harbor-300"
          />
        </label>
        <button className="btn-primary" onClick={() => setComposeOpen((v) => !v)}>
          <Icon name="chat" size={18} /> Create post
        </button>
      </div>

      {composeOpen && (
        <ComposePost
          lockedStateCode={lockedStateCode}
          onClose={() => setComposeOpen(false)}
        />
      )}

      {/* Sort tabs */}
      <div className="flex items-center gap-1 rounded-full border border-mist-200 bg-white p-1 text-sm">
        {(["recent", "active", "trending"] as Sort[]).map((s) => (
          <button
            key={s}
            onClick={() => setSort(s)}
            className={`flex-1 rounded-full px-3 py-1.5 font-medium capitalize transition-colors ${
              sort === s ? "bg-harbor-500 text-white" : "text-mist-700 hover:bg-harbor-50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {!lockedStateCode && (
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-mist-500">
              Filter by state
            </label>
            <select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              className="w-full rounded-xl border border-mist-200 bg-white px-3 py-2 text-sm outline-none focus:border-harbor-300 sm:w-72"
            >
              <option value="ALL">All states</option>
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-mist-500">
            Filter by topic
          </label>
          <div className="flex flex-wrap gap-2">
            <FilterPill active={categoryId === "ALL"} onClick={() => setCategoryId("ALL")}>
              All topics
            </FilterPill>
            {CATEGORIES.map((c) => (
              <FilterPill key={c.id} active={categoryId === c.id} onClick={() => setCategoryId(c.id)}>
                {c.name}
              </FilterPill>
            ))}
          </div>
        </div>
      </div>

      {/* Active state context line */}
      {lockedStateCode && (
        <p className="text-sm text-mist-500">
          Showing conversations from parents in{" "}
          <span className="font-semibold text-harbor-700">
            {stateByCode(lockedStateCode)?.name}
          </span>.
        </p>
      )}

      {/* Feed */}
      {filtered.length > 0 ? (
        <div className="grid gap-4">
          {filtered.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      ) : (
        <EmptyState lockedStateCode={lockedStateCode} onCompose={() => setComposeOpen(true)} />
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-harbor-500 text-white"
          : "border border-harbor-200 bg-harbor-50 text-harbor-700 hover:bg-harbor-100"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({
  lockedStateCode,
  onCompose,
}: {
  lockedStateCode?: string;
  onCompose: () => void;
}) {
  const stateName = lockedStateCode ? stateByCode(lockedStateCode)?.name : null;
  return (
    <div className="card flex flex-col items-center gap-4 p-10 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-harbor-100 text-harbor-500">
        <Icon name="wave" size={26} />
      </span>
      <div>
        <h3 className="text-lg font-semibold text-harbor-900">
          {stateName ? `Be the first voice in ${stateName}` : "No conversations match yet"}
        </h3>
        <p className="mt-1.5 max-w-sm text-sm text-mist-700">
          Quiet harbors fill one boat at a time. Share an introduction or a
          question, and others will find their way to you.
        </p>
      </div>
      <button className="btn-primary" onClick={onCompose}>Start a conversation</button>
      <Link href="/safety" className="text-xs text-mist-500 underline underline-offset-2">
        A reminder on keeping personal details private
      </Link>
    </div>
  );
}
