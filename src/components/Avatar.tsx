import { avatarTone, initials } from "@/lib/format";

/** Placeholder avatar — soft circle with initials. No external image needed. */
export function Avatar({
  name,
  size = 40,
}: {
  name: string;
  size?: number;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${avatarTone(name)}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
