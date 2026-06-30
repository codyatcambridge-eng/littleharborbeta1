import Link from "next/link";

/**
 * Little Harbor brand mark — an abstract lighthouse + gentle wave inside a
 * soft circle. Doubles as the app-icon concept. Pure SVG, no asset needed.
 */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Little Harbor logo: a lighthouse above calm waves"
    >
      <defs>
        <linearGradient id="lh-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dcebf1" />
          <stop offset="100%" stopColor="#bdd8e4" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#lh-bg)" stroke="#3f7c98" strokeWidth="1.5" />
      {/* Lighthouse */}
      <path d="M21 30l1-12h4l1 12z" fill="#fdfbf6" stroke="#2f5568" strokeWidth="1" />
      <path d="M22 22h4M21.5 26h5" stroke="#3f7c98" strokeWidth="1" />
      <rect x="22.2" y="14" width="3.6" height="4" rx="0.8" fill="#dab85f" stroke="#c79f3e" strokeWidth="0.7" />
      {/* Light beams */}
      <path d="M22 16l-4-2M26 16l4-2" stroke="#dab85f" strokeWidth="1.2" strokeLinecap="round" />
      {/* Waves */}
      <path d="M10 33c2 0 2-1.6 4-1.6s2 1.6 4 1.6 2-1.6 4-1.6 2 1.6 4 1.6 2-1.6 4-1.6 2 1.6 4 1.6"
        fill="none" stroke="#3f7c98" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 37c2 0 2-1.4 4-1.4s2 1.4 4 1.4 2-1.4 4-1.4 2 1.4 4 1.4 2-1.4 4-1.4"
        fill="none" stroke="#5e99b3" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Little Harbor home">
      <LogoMark />
      <span className="text-lg font-bold text-harbor-800">
        Little <span className="text-harbor-500">Harbor</span>
      </span>
    </Link>
  );
}
