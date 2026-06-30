# Little Harbor 🪷⚓ (Beta)

> A warm, trustworthy, parent-centered haven for parents and caregivers of
> children with illness, disability, developmental differences, chronic health
> issues, or other serious support needs.

Little Harbor is **peer support — not medical advice, not a diagnosis tool, and
not a substitute for doctors.** The beta is **parent-first**: there are no child
or teen accounts.

---

## What the beta does *now*

1. **A main parent forum** — topic + state filtering, search, sort, post composer.
2. **Browse & filter by U.S. state** — `/states` and `/community/[state]` pages.
3. **Parent profiles** — warm, privacy-conscious, with a verified-parent badge.
4. **Private messaging** — registered parent ↔ parent, with safety guardrails.
5. **A strong home page** — mission, how it works, safety promise, founder block.
6. **A "Coming Soon" Future App page** — teasing safe, parent-oriented local play
   date meetups that will require safety verification *before* any meetup or
   sharing of personal details.
7. **A moderator dashboard mockup** — report queue + verification queue.

## What the beta is *not*

A medical/diagnosis site · a treatment engine · a doctor substitute · a place
for children to chat · a casual social-media clone. The meetup features
**do not exist yet** — the beta builds the support foundation and trust first.

---

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom "harbor" design system in `tailwind.config.ts`)
- **Supabase** (Postgres + Auth) — *schema drafted, not yet wired*
- Ships with **mock data**, so it runs with **no backend configured**.

## Quick start

```bash
cd little-harbor
npm install
npm run dev
# open http://localhost:3000
```

No environment variables are required for the beta — it uses the seed data in
`src/data/`. Copy `.env.example` → `.env.local` when you wire up Supabase.

```bash
npm run build   # production build
npm run start   # serve the production build
```

---

## Project structure

```
little-harbor/
├─ db/
│  ├─ schema.sql            # 12-table Postgres/Supabase schema draft + RLS sketch
│  └─ seed.sql              # reference seed (states, categories)
├─ src/
│  ├─ app/                  # App Router pages
│  │  ├─ page.tsx                  # Home (hero, mission, how-it-works, future app…)
│  │  ├─ community/page.tsx        # Main parent forum
│  │  ├─ community/[state]/page.tsx# State community view
│  │  ├─ states/page.tsx           # Browse all states
│  │  ├─ profile/[id]/page.tsx     # Parent profile
│  │  ├─ messages/page.tsx         # Private messaging
│  │  ├─ about/page.tsx            # Our Story
│  │  ├─ safety/page.tsx           # Safety & Verification (+ privacy/terms stubs)
│  │  ├─ future-app/page.tsx       # Coming Soon app page
│  │  ├─ auth/page.tsx             # Sign In / Join
│  │  ├─ admin/page.tsx            # Moderator dashboard mockup
│  │  ├─ layout.tsx / globals.css / not-found.tsx
│  ├─ components/           # Nav, Footer, PostCard, ForumView, Messenger,
│  │                        # Sidebar, Safety, PhoneMockup, ImagePlaceholder, …
│  ├─ data/                 # Mock/seed data (states, categories, profiles, posts, messages)
│  └─ lib/                  # types.ts, format.ts, verification.ts*, moderation.ts*
└─ tailwind.config.ts       # design tokens (harbor / sand / gold / mist)
```
`*` = intentionally **placeholder** logic (clearly marked in-file).

---

## Design system

Soft coastal palette — pale blue, muted teal (`harbor`), warm cream/sand
(`sand`), restrained soft gold (`gold`), calm grays (`mist`). Rounded cards,
subtle shadows, airy whitespace, a system sans-serif stack, visible focus rings,
and a skip-to-content link for accessibility. The brand mark (`Logo.tsx`) is a
pure-SVG lighthouse + waves that doubles as the **app icon concept**.

### Images
Real photos aren't shipped yet. `ImagePlaceholder` renders on-brand gradient
blocks that carry both the intended **alt text** and an **art-direction note**,
so the team knows exactly what asset belongs where. Swap for `next/image` later
and reuse the same alt text.

---

## Safety architecture (built in from day one)

- `MedicalDisclaimer`, `PublicDetailsNotice`, `MessagingSafetyBanner`, and a
  reusable `SafetyBanner` appear wherever parents make decisions.
- `lib/moderation.ts` — gentle, **non-blocking** scan that nudges users before
  they share a phone/email/address/handle in public or in DMs.
- `lib/verification.ts` — models the parent **trust ladder**
  (`unverified → pending → verified`) and documents **future child/teen safety
  gates** (identity checks, staged disclosure, human-in-the-loop, opt-in only).
- `db/schema.sql` — `reports`, `moderation_actions`, `verification_status`,
  `user_blocks`, plus an RLS policy sketch.

> ⚠️ Verification and moderation are **placeholders**. They demonstrate the shape
> of the system — they are **not** real safety controls until properly built and
> reviewed.

---

## Founder story — truth gate

The home page and About page intentionally use the **honest, unverified-safe**
founder copy. The approved alternate line —
*"Made by a biotech major and mom who has lived the journey of life with a little
one who needed extra help."* — is left in code comments and must only be
published **if it is factually verified**. Search the code for
`FOUNDER STORY — TRUTH GATE`.

---

## Wiring up Supabase (next phase)

1. Create a Supabase project; run `db/schema.sql`, then `db/seed.sql`.
2. Add keys to `.env.local` (see `.env.example`).
3. Replace the imports from `src/data/*` with Supabase queries; the types in
   `src/lib/types.ts` already match the schema.
4. Enable Auth (email). On sign-up, create matching `users` + `profiles` rows.
5. Turn on **Row Level Security** and write real policies (sketch in `schema.sql`).

---

## Suggested next steps after beta

- Real auth + persistence (Supabase), real reactions/bookmarks/comments.
- A genuine, human-reviewed **parent verification** pipeline.
- Real moderation tooling (queue actions persist; audit log; appeals).
- Rate limiting / anti-abuse; account recovery; email notifications (opt-in).
- Accessibility audit (WCAG AA), real photography, and content review.
- The future **mobile app** — only after meetup safety is genuinely ready.

## Legal / safety review checklist (before expanding)

- [ ] Privacy policy & Terms of Use drafted and **reviewed by counsel**.
- [ ] Data-handling review (what's stored, retention, deletion, minors policy).
- [ ] COPPA and related considerations — beta is adults-only; keep it that way.
- [ ] Mandatory-reporting / crisis-escalation guidance for moderators.
- [ ] Verification & background-screening approach reviewed before **any** meetup
      feature ships.
- [ ] Clear, repeated "not medical advice / call emergency services" messaging
      (already present throughout the UI — keep it).
- [ ] Security review + RLS policies validated before real user data is stored.

---

*Little Harbor — find your harbor. Built slowly, carefully, parent-first.*
