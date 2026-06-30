import type { Metadata } from "next";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Why Little Harbor exists, and the values that guide how we build it.",
};

export default function AboutPage() {
  return (
    <div className="section py-10 lg:py-14">
      <header className="mx-auto max-w-3xl text-center">
        <span className="pill mx-auto"><Icon name="lighthouse" size={14} /> Our story</span>
        <h1 className="mt-4 text-3xl font-bold text-harbor-900 sm:text-4xl">
          Built for the parents who understand.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-mist-700">
          Little Harbor began with a simple conviction: parents and caregivers of
          children with illness, disability, developmental differences, or other
          serious support needs deserve a calm, trustworthy place to find each
          other, receive support, and help their children build safe friendships
          while living as normal a life as possible.
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-4xl items-center gap-8 lg:grid-cols-2">
        <ImagePlaceholder
          src="/images/origin-still-life.png"
          tone="evening"
          alt="A warm, editorial image representing the lived experience and care behind Little Harbor."
        />
        <div className="calm-prose">
          {/*
            FOUNDER STORY — TRUTH GATE.
            Replace the block below with the verified final founder biography.
            If confirmed TRUE, the approved alternate line is:
            "Made by a biotech major and mom who has lived the journey of life
             with a little one who needed extra help."
            Do NOT publish that line unless it is factually verified.
          */}
          <h2>Who made this</h2>
          <p>
            Little Harbor was created by people who care deeply about families
            navigating extra challenges — and who believe parents deserve a calm,
            trustworthy place to connect with similar peers, support one
            another, and build toward safe connection for their children.
            We&apos;re building it slowly and carefully, the way we&apos;d want for our
            own families.
          </p>
          <p className="text-sm text-mist-500">
            <em>A fuller founder story will appear here once it&apos;s finalized.</em>
          </p>
        </div>
      </div>

      <section className="mx-auto mt-14 max-w-3xl calm-prose">
        <h2>What we believe</h2>
        <ul>
          <li><strong>Parents first.</strong> The beta is built around caregivers — not children, not advertisers, not noise.</li>
          <li><strong>Peer support, not medical advice.</strong> We connect people. We never replace doctors.</li>
          <li><strong>Safety before scale.</strong> We&apos;d rather grow slowly and protect people than move fast and risk harm.</li>
          <li><strong>Dignity always.</strong> Every family&apos;s journey is treated with warmth and respect.</li>
          <li><strong>Honesty about what we are.</strong> The beta is a foundation. We won&apos;t pretend features exist before they&apos;re safely built.</li>
        </ul>

        <h2>Where we&apos;re headed</h2>
        <p>
          The beta website is the first stage: a parent community platform for
          connection and support. Over time, Little Harbor will grow into a
          mobile app with a more advanced experience — including safe,
          parent-oriented local play date meetup discovery so children can have
          friends they connect with safely, gated behind careful safety
          verification. We&apos;re building the trust foundation first, on purpose.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Link href="/auth" className="btn-primary">Join the beta</Link>
        <Link href="/future-app" className="btn-secondary">See the future app</Link>
        <Link href="/community-input" className="btn-secondary">Share parent input</Link>
        <Link href="/safety" className="btn-ghost">Read our safety guide</Link>
      </div>
    </div>
  );
}
