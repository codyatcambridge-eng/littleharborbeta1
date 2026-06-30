"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/community", label: "Community" },
  { href: "/states", label: "States" },
  { href: "/messages", label: "Messages" },
  { href: "/community-input", label: "Parent Input" },
  { href: "/about", label: "About" },
  { href: "/safety", label: "Safety" },
  { href: "/future-app", label: "Future App" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-mist-200 bg-sand-50/85 backdrop-blur">
      <nav className="section flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(l.href)
                  ? "bg-harbor-100 text-harbor-800"
                  : "text-mist-700 hover:bg-harbor-50 hover:text-harbor-700"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/profile/p-maya" className="btn-ghost" aria-label="Your profile">
            <Icon name="users" size={18} /> Profile
          </Link>
          <Link href="/auth" className="btn-primary">
            Sign In / Join
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="btn-ghost lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-mist-200 bg-sand-50 lg:hidden">
          <div className="section flex flex-col gap-1 py-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
                  isActive(l.href)
                    ? "bg-harbor-100 text-harbor-800"
                    : "text-mist-700 hover:bg-harbor-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Link href="/profile/p-maya" onClick={() => setOpen(false)} className="btn-secondary flex-1">
                Profile
              </Link>
              <Link href="/auth" onClick={() => setOpen(false)} className="btn-primary flex-1">
                Sign In / Join
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
