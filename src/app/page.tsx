import Link from "next/link";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Icon } from "@/components/Icon";
import { AppIconConcept } from "@/components/PhoneMockup";
import { MedicalDisclaimer } from "@/components/Safety";

export default function HomePage() {
  return (
    <>
      {/* ───────────────────────── A. HERO ───────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="section grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="pill">
              <Icon name="anchor" size={14} /> A parent-first community · Beta
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] text-harbor-900 sm:text-5xl">
              A safe harbor for parents walking difficult roads.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-700">
              Little Harbor is a calm, parent-centered community for families
              navigating illness, disability, developmental differences, and
              other serious support needs. Our goal is to connect parents with
              similar peers on the same journey, provide steady support, and
              help children live a normal life with friends they can connect
              with safely.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth" className="btn-primary">
                Join the Community
              </Link>
              <Link href="/states" className="btn-secondary">
                <Icon name="map" size={18} /> Explore by State
              </Link>
            </div>
            <p className="mt-5 text-sm text-mist-500">
              Peer support, not medical advice. Always private until you choose otherwise.
            </p>
          </div>

          <div className="relative">
            <ImagePlaceholder
              src="/images/home-hero.png"
              tone="water"
              aspect="aspect-[5/4]"
              alt="A parent and child sitting close together near calm water in soft morning daylight, looking peaceful and reassured."
            />
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl bg-white p-4 shadow-soft sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-harbor-100 text-harbor-600">
                  <Icon name="users" size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-harbor-900">Parents in all 50 states</p>
                  <p className="text-xs text-mist-500">Connecting one conversation at a time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── B. MISSION ───────────────────────── */}
      <section className="section py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">You are not alone in this journey.</h2>
          <p className="mt-4 text-lg leading-relaxed text-mist-700">
            Little Harbor helps parents connect, encourage one another, and share
            support in a calm, factual, safety-conscious space. This is a place
            for the people who understand because they&apos;re living it too, and for
            families who want children to have safe, normal friendships with peers
            who understand their world.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <MedicalDisclaimer />
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ValueCard icon="heart" title="Feel less alone" body="Honest conversation with parents who truly get it — the hard days and the small wins." />
          <ValueCard icon="hands" title="Give and receive support" body="Encouragement, perspective, and practical wisdom, shared with dignity and care." />
          <ValueCard icon="shield" title="Stay safe" body="Moderation, reporting, profile controls, and verification goals are built in from day one." />
          <ValueCard icon="users" title="Help kids belong" body="The long-term vision is safe, parent-guided ways for children to build friendships and live more normal lives." />
        </div>
      </section>

      {/* ───────────────────────── C. HOW IT WORKS ───────────────────────── */}
      <section className="bg-white py-14">
        <div className="section">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">How Little Harbor works</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-mist-700">
            Simple, gentle steps — go at your own pace.
          </p>
          <ol className="mt-10 grid gap-5 md:grid-cols-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="card flex flex-col gap-3 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-harbor-500 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-harbor-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-mist-700">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────────────── Community imagery ───────────────────────── */}
      <section className="section py-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <ImagePlaceholder
            src="/images/parent-community.png"
            tone="sand"
            alt="A small group of parents sitting together in warm, supportive conversation, leaning in and listening."
          />
          <div>
            <span className="pill"><Icon name="chat" size={14} /> The parent forum</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">A respectful, emotionally safe forum</h2>
            <p className="mt-4 leading-relaxed text-mist-700">
              Browse honest conversations by topic and by state. Ask the
              questions only another parent can answer. Celebrate the wins that
              the rest of the world might miss. Sit quietly and just read, if
              that&apos;s what today calls for.
            </p>
            <Link href="/community" className="btn-secondary mt-6">
              Visit the forum <Icon name="anchor" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────── D. FUTURE APP ───────────────────────── */}
      <section className="bg-harbor-800 py-16 text-white">
        <div className="section grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="pill border-harbor-600 bg-harbor-700 text-harbor-50">
              <Icon name="phone" size={14} /> Coming later
            </span>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              The future Little Harbor app
            </h2>
            <p className="mt-4 leading-relaxed text-harbor-100">
              Down the road, Little Harbor will grow into a mobile app with a
              more advanced experience — including safe, parent-oriented local
              play date meetup discovery so children can build friendships with
              peers who understand their journey. Every meetup or sharing of
              personal details will sit behind careful safety verification first.
            </p>
            <p className="mt-4 leading-relaxed text-harbor-100">
              The beta website comes first on purpose: we&apos;re building the
              support foundation — and the trust — before anything else.
            </p>
            <Link href="/future-app" className="btn-gold mt-6">
              See what&apos;s coming
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8">
            <AppIconConcept size={88} />
            <div className="max-w-[200px] text-sm text-harbor-100">
              <p className="font-semibold text-white">Safety-first by design</p>
              <p className="mt-1">
                Verified parent matching · staged disclosure · no exact locations
                until everyone opts in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── E. SAFETY PROMISE ───────────────────────── */}
      <section className="section py-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="pill"><Icon name="lock" size={14} /> Our safety promise</span>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Designed around your privacy and safety</h2>
          <p className="mt-4 leading-relaxed text-mist-700">
            Little Harbor is built with parent safety in mind — moderation,
            reporting, profile controls, and verification goals. We discourage
            unsafe sharing of personal details, and we&apos;ll always be honest
            about what is and isn&apos;t protected yet.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
          {SAFETY_POINTS.map((p) => (
            <div key={p} className="flex items-start gap-3 rounded-xl border border-mist-200 bg-white p-4">
              <span className="mt-0.5 text-harbor-500"><Icon name="check" size={18} /></span>
              <p className="text-sm leading-relaxed text-mist-700">{p}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/safety" className="btn-secondary">Read the full safety guide</Link>
        </div>
      </section>

      {/* ───────────────────────── F. FOUNDER / ORIGIN ───────────────────────── */}
      <section className="bg-white py-14">
        <div className="section grid items-center gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ImagePlaceholder
              src="/images/origin-still-life.png"
              tone="evening"
              aspect="aspect-square"
              alt="A warm, editorial-style image representing the lived experience and care behind Little Harbor."
            />
          </div>
          <div className="lg:col-span-3">
            <span className="pill"><Icon name="lighthouse" size={14} /> Our story</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Why Little Harbor exists</h2>
            {/*
              FOUNDER STORY — TRUTH GATE.
              The line below is the HONEST, unverified-safe version.
              Replace with the verified founder biography before launch. If the
              following is confirmed true, you may use it instead:
              "Made by a biotech major and mom who has lived the journey of life
               with a little one who needed extra help."
            */}
            <p className="mt-4 leading-relaxed text-mist-700">
              Little Harbor was created by people who care deeply about families
              navigating extra challenges — and who believe parents deserve a
              calm, trustworthy place to connect, support one another, and help
              their children have safe friendships and ordinary moments wherever
              possible. We&apos;re building it slowly and carefully, the way we&apos;d
              want for our own families.
            </p>
            <Link href="/about" className="btn-secondary mt-6">Read our full story</Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────── G. CTA FOOTER ───────────────────────── */}
      <section className="section py-16">
        <div className="rounded-3xl bg-gradient-to-br from-harbor-100 to-sand-100 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Find your harbor.</h2>
          <p className="mx-auto mt-3 max-w-xl text-mist-700">
            Join the beta, read the forum, and see where Little Harbor is headed.
            Come as you are — on the good days and the hard ones.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/auth" className="btn-primary">Join the beta</Link>
            <Link href="/community" className="btn-secondary">Browse the forum</Link>
            <Link href="/community-input" className="btn-secondary">Share what parents need</Link>
            <Link href="/future-app" className="btn-ghost">Learn about the future app</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ValueCard({ icon, title, body }: { icon: any; title: string; body: string }) {
  return (
    <div className="card p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-harbor-100 text-harbor-600">
        <Icon name={icon} size={22} />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-harbor-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mist-700">{body}</p>
    </div>
  );
}

const STEPS = [
  { title: "Create a parent account", body: "A quick, private sign-up. Share only what feels comfortable." },
  { title: "Join the main forum", body: "Step into honest, supportive conversations among parents." },
  { title: "Filter by your state", body: "Find parents navigating life in a similar place to you." },
  { title: "Connect with other parents", body: "Reply, react, and follow the threads that resonate." },
  { title: "Message carefully", body: "Use private messaging thoughtfully, after trust and verification." },
];

const SAFETY_POINTS = [
  "Active moderation and a clear, simple way to report anything that feels off.",
  "Profile controls so you decide what to share — never your address or a child's full name.",
  "Verification goals so trust signals are visible as the community grows.",
  "Private messaging that stays between registered parents, with block and mute built in.",
];
