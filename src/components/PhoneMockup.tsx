import { LogoMark } from "./Logo";
import { Icon } from "./Icon";

/**
 * App icon concept + phone mockup for the "Future App" / Coming Soon page.
 * Everything is rendered with CSS/SVG so the teaser looks real without assets.
 */

export function AppIconConcept({ size = 96 }: { size?: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex items-center justify-center rounded-[22%] bg-gradient-to-br from-harbor-100 to-harbor-200 shadow-soft ring-1 ring-harbor-300/50"
        style={{ width: size, height: size }}
      >
        <LogoMark size={size * 0.72} />
      </div>
      <span className="text-xs font-medium text-mist-500">App icon concept</span>
    </div>
  );
}

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px]">
      {/* Device frame */}
      <div className="rounded-[2.5rem] border-[10px] border-harbor-900 bg-harbor-900 shadow-soft">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-sand-50">
          {/* Notch */}
          <div className="absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-harbor-900" />

          {/* App header */}
          <div className="flex items-center gap-2 bg-harbor-500 px-4 pb-3 pt-7 text-white">
            <LogoMark size={26} />
            <span className="text-sm font-semibold">Little Harbor</span>
          </div>

          {/* Screen body: a safe meetup discovery teaser */}
          <div className="space-y-3 p-3">
            <div className="rounded-xl bg-white p-3 shadow-card">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-harbor-700">
                <Icon name="shield" size={13} /> Verified parents near you
              </div>
              <p className="mt-1 text-[11px] leading-snug text-mist-500">
                Safety steps complete before any details are shared.
              </p>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-card">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-harbor-700">
                <Icon name="users" size={13} /> Play date — Saturday morning
              </div>
              <p className="mt-1 text-[11px] leading-snug text-mist-500">
                Sensory-friendly park meetup · 3 families interested
              </p>
              <span className="mt-2 inline-block rounded-full bg-gold-300/40 px-2 py-0.5 text-[10px] font-medium text-harbor-800">
                Pending safety verification
              </span>
            </div>

            <div className="rounded-xl bg-harbor-50 p-3">
              <p className="text-[10px] leading-snug text-harbor-700">
                Exact locations are never shown until every parent has completed
                verification and opted in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
