import { Icon } from "./Icon";
import { VerifiedParentStatus } from "@/lib/types";

/**
 * Verified-parent badge. The verification *process* is a placeholder in beta
 * (see /safety and lib/verification notes), but the UI surface is built so the
 * trust signal can be turned on without a redesign.
 */
export function VerifiedBadge({ status }: { status: VerifiedParentStatus }) {
  if (status === "verified") {
    return (
      <span className="pill border-harbor-300 bg-harbor-100 text-harbor-700" title="Verified parent">
        <Icon name="shield" size={13} /> Verified parent
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="pill border-gold-300 bg-gold-300/20 text-harbor-800" title="Verification pending">
        <Icon name="shield" size={13} /> Verification pending
      </span>
    );
  }
  return null;
}
