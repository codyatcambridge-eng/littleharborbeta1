import Image from "next/image";

type Tone = "water" | "sand" | "sky" | "evening";

const tones: Record<Tone, string> = {
  water: "from-harbor-200 via-harbor-100 to-sand-100",
  sand: "from-sand-200 via-sand-100 to-harbor-50",
  sky: "from-harbor-100 via-sand-50 to-sand-100",
  evening: "from-harbor-300 via-harbor-200 to-gold-300/40",
};

export function ImagePlaceholder({
  src,
  alt,
  note,
  tone = "water",
  aspect = "aspect-[4/3]",
  rounded = "rounded-2xl",
  className = "",
}: {
  src?: string;
  alt: string;
  note?: string;
  tone?: Tone;
  aspect?: string;
  rounded?: string;
  className?: string;
}) {
  if (src) {
    return (
      <figure
        className={`relative w-full overflow-hidden border border-mist-200 bg-mist-100 shadow-soft ${aspect} ${rounded} ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority={src.includes("home-hero")}
        />
      </figure>
    );
  }

  return (
    <figure
      role="img"
      aria-label={alt}
      className={`relative flex w-full items-end overflow-hidden border border-mist-200 bg-gradient-to-br ${tones[tone]} ${aspect} ${rounded} ${className}`}
    >
      {/* Subtle horizon line to evoke a coastline */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/40" />
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-harbor-700">
        Image
      </span>
      <figcaption className="relative z-10 m-3 rounded-xl bg-white/75 p-3 text-xs leading-relaxed text-harbor-800 backdrop-blur-sm">
        <span className="font-semibold">Art direction:</span> {note}
      </figcaption>
    </figure>
  );
}
