import Link from "next/link";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-mist-200 bg-harbor-800 text-harbor-50">
      <div className="section grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <LogoMark size={32} />
            <span className="text-lg font-bold text-white">Little Harbor</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-harbor-100">
            A calm, parent-centered haven for families navigating illness,
            disability, and other support needs. We connect parents with peers
            on similar journeys and build toward safe friendships for children.
          </p>
          <p className="mt-4 text-xs text-harbor-200">Beta — building the foundation first.</p>
        </div>

        <FooterCol title="Community">
          <FooterLink href="/community" label="Parent Forum" />
          <FooterLink href="/states" label="Browse by State" />
          <FooterLink href="/messages" label="Private Messages" />
          <FooterLink href="/community-input" label="Share Parent Input" />
          <FooterLink href="/auth" label="Join the Beta" />
        </FooterCol>

        <FooterCol title="Trust & Safety">
          <FooterLink href="/safety" label="Safety & Verification" />
          <FooterLink href="/safety#report" label="Report or Contact a Moderator" />
          <FooterLink href="/safety#privacy" label="Privacy (placeholder)" />
          <FooterLink href="/safety#terms" label="Terms (placeholder)" />
        </FooterCol>

        <FooterCol title="About">
          <FooterLink href="/about" label="Our Story" />
          <FooterLink href="/future-app" label="The Future App" />
          <FooterLink href="/community-input" label="Shape the Community" />
          <FooterLink href="/admin" label="Moderator Dashboard" />
        </FooterCol>
      </div>

      <div className="border-t border-harbor-700">
        <div className="section flex flex-col gap-2 py-5 text-xs text-harbor-200 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Little Harbor. A peer-support community — not a substitute for professional medical care.</p>
          <p>In an emergency, contact your physician or emergency services.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="text-sm text-harbor-100 hover:text-white">
        {label}
      </Link>
    </li>
  );
}
