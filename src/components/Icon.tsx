import { SVGProps } from "react";

/**
 * A small, calm, dependency-free icon set (inline SVG). Stroke-based,
 * rounded, friendly. Keys match ForumCategory.icon and nav usage.
 */
type IconKey =
  | "wave" | "star" | "chat" | "heart" | "anchor" | "book" | "hands"
  | "leaf" | "compass" | "lighthouse" | "bell" | "shield" | "lock"
  | "users" | "map" | "mail" | "home" | "info" | "flag" | "bookmark"
  | "check" | "menu" | "close" | "search" | "phone";

const paths: Record<IconKey, JSX.Element> = {
  wave: <path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />,
  star: <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z" />,
  chat: <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z" />,
  heart: <path d="M12 20s-7-4.6-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.4 12 20 12 20z" />,
  anchor: <><circle cx="12" cy="5" r="2" /><path d="M12 7v13M5 13a7 7 0 0 0 14 0M3 13h2M19 13h2" /></>,
  book: <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5zM18 3v16" />,
  hands: <path d="M8 13l-2-2a2 2 0 0 1 3-3l3 3 3-3a2 2 0 0 1 3 3l-5 5-5-3z" />,
  leaf: <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19c3-3 6-5 9-7" />,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15 9l-2 4-4 2 2-4 4-2z" /></>,
  lighthouse: <path d="M9 21h6M10 21l1-9M14 21l-1-9M9 12h6M10 8h4M11 8l1-4 1 4M5 14l-2 1M19 14l2 1" />,
  bell: <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 19a2 2 0 0 0 4 0" />,
  shield: <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" />,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  users: <path d="M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20a5 5 0 0 1 10 0M16 11a3 3 0 1 0 0-6M14 20a5 5 0 0 1 8-3" />,
  map: <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  home: <path d="M4 11l8-7 8 7M6 10v9h12v-9" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  flag: <path d="M5 21V4h11l-1.5 4L16 12H5" />,
  bookmark: <path d="M7 4h10v16l-5-3-5 3V4z" />,
  check: <path d="M5 12l4 4 10-10" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></>,
  phone: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></>,
};

export function Icon({
  name,
  size = 20,
  ...props
}: { name: IconKey; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export type { IconKey };
