import Link from "next/link";
import { Icon, IconKey } from "./Icon";

/**
 * Reusable safety / disclaimer components used throughout the site.
 * Consistent, gentle, and always present where parents make decisions.
 */

export function SafetyBanner({
  children,
  icon = "lock",
  tone = "calm",
}: {
  children: React.ReactNode;
  icon?: IconKey;
  tone?: "calm" | "warm";
}) {
  const styles =
    tone === "warm"
      ? "border-gold-300 bg-gold-300/15 text-harbor-900"
      : "border-harbor-200 bg-harbor-50 text-harbor-800";
  return (
    <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed ${styles}`}>
      <span className="mt-0.5 shrink-0 text-harbor-500">
        <Icon name={icon} size={18} />
      </span>
      <p>{children}</p>
    </div>
  );
}

/** The standard "not medical advice" disclaimer. */
export function MedicalDisclaimer() {
  return (
    <SafetyBanner icon="info">
      Little Harbor is a community support space, not a substitute for
      professional medical care. If you are facing an emergency, contact your
      physician or emergency services.
    </SafetyBanner>
  );
}

/** The standard "don't post exact personal details" notice for public areas. */
export function PublicDetailsNotice() {
  return (
    <SafetyBanner icon="shield" tone="warm">
      Please don&apos;t post exact personal details — addresses, phone numbers,
      school names, or a child&apos;s full name — in public discussions. Building
      trust first keeps everyone safer.{" "}
      <Link href="/safety" className="font-semibold underline underline-offset-2">
        Read our safety guide
      </Link>
      .
    </SafetyBanner>
  );
}

/** The messaging-specific safety reminder banner. */
export function MessagingSafetyBanner() {
  return (
    <SafetyBanner icon="lock">
      Please use care when sharing personal details. Little Harbor encourages
      trust-building before exchanging off-platform contact information.
    </SafetyBanner>
  );
}
