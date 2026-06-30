/** Small formatting helpers shared across the UI. */

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function joinDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/** Deterministic warm avatar background from a name (for placeholder avatars). */
export function avatarTone(seed: string): string {
  const tones = [
    "bg-harbor-200 text-harbor-800",
    "bg-sand-300 text-harbor-800",
    "bg-gold-300 text-harbor-900",
    "bg-harbor-100 text-harbor-700",
    "bg-mist-200 text-mist-900",
  ];
  const i = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % tones.length;
  return tones[i];
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
