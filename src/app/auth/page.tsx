import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Icon } from "@/components/Icon";
import { MedicalDisclaimer } from "@/components/Safety";

export const metadata: Metadata = {
  title: "Sign In / Join the Beta",
  description: "Create a parent account or sign in to Little Harbor.",
};

export default function AuthPage() {
  return (
    <div className="section grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-16">
      <div className="order-2 lg:order-1">
        <AuthForm />
        <div className="mt-5">
          <MedicalDisclaimer />
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <span className="pill"><Icon name="anchor" size={14} /> Welcome aboard</span>
        <h1 className="mt-4 text-3xl font-bold text-harbor-900 sm:text-4xl">
          Come find your harbor.
        </h1>
        <p className="mt-4 leading-relaxed text-mist-700">
          Little Harbor is a parent-first community. Creating an account lets you
          join the forum, connect by state, and message other parents carefully.
          The goal is to connect parents with similar peers, provide support,
          and eventually help children form safe friendships with others who
          understand their journey.
          Share only what feels right — never a child&apos;s full name, your address,
          or other identifying details.
        </p>
        <div className="mt-6">
          <ImagePlaceholder
            src="/images/welcome-harbor.png"
            tone="sky"
            aspect="aspect-[16/9]"
            alt="A calm coastal scene at soft daylight, evoking welcome and safe arrival."
          />
        </div>
        <p className="mt-4 text-sm text-mist-500">
          By joining you agree to our{" "}
          <Link href="/safety#terms" className="underline underline-offset-2">community standards</Link>.
          There are no child or teen accounts in the beta.
        </p>
      </div>
    </div>
  );
}
