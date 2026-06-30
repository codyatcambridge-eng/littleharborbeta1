-- ============================================================================
-- Little Harbor — database schema draft (PostgreSQL / Supabase)
-- ============================================================================
-- This is a DRAFT for the beta. It mirrors src/lib/types.ts so the mock data
-- layer can be swapped for Supabase with minimal churn.
--
-- Safety posture baked into the schema:
--   * No table stores a child's full name, birthdate, school, or address.
--   * Child info is limited to coarse, optional age ranges.
--   * Messaging is parent-to-parent; moderation tables exist from day one.
--   * Verification is modeled but treated as a placeholder until a real,
--     legally reviewed process exists.
-- ============================================================================

-- ---------- Enums -----------------------------------------------------------
create type user_role as enum ('parent', 'moderator', 'admin');
create type verified_parent_status as enum ('unverified', 'pending', 'verified');
create type visibility_status as enum ('visible', 'hidden', 'removed', 'under_review');
create type flagged_status as enum ('clean', 'flagged', 'auto_flagged', 'reviewed');
create type report_target_type as enum ('post', 'comment', 'message', 'profile');
create type report_status as enum ('open', 'reviewing', 'resolved');
create type moderation_action_type as enum ('hide', 'remove', 'warn', 'verify', 'dismiss');

-- ---------- 6. states (reference) ------------------------------------------
create table states (
  code        char(2) primary key,           -- 'GA'
  name        text not null,                  -- 'Georgia'
  slug        text not null unique            -- 'georgia'
);

-- ---------- 1. users --------------------------------------------------------
-- In Supabase, auth.users already exists. This `users` row extends it 1:1.
create table users (
  id            uuid primary key default gen_random_uuid(), -- == auth.users.id
  email         text not null unique,
  role          user_role not null default 'parent',
  is_adult_confirmed boolean not null default false,        -- 18+ attestation
  created_at    timestamptz not null default now()
);

-- ---------- 11. verification_status ----------------------------------------
-- Separate table so the (future, sensitive) verification pipeline can evolve
-- independently and store audit data without bloating profiles.
create table verification_status (
  user_id       uuid primary key references users(id) on delete cascade,
  status        verified_parent_status not null default 'unverified',
  method        text,                          -- placeholder: 'document','third_party',...
  reviewed_by   uuid references users(id),
  reviewed_at   timestamptz,
  notes         text
);

-- ---------- 2. profiles -----------------------------------------------------
create table profiles (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null unique references users(id) on delete cascade,
  display_name  text not null,                 -- first name + initial encouraged
  avatar_url    text,
  bio           text default '',
  state_code    char(2) references states(code),
  child_age_ranges text[] default '{}',        -- coarse ranges only, optional
  support_topics   text[] default '{}',
  posts_count   integer not null default 0,
  created_at    timestamptz not null default now()
);

-- ---------- 3. forum_categories --------------------------------------------
create table forum_categories (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique,
  description   text,
  icon          text,
  sort_order    integer not null default 0
);

-- ---------- 4. posts --------------------------------------------------------
create table posts (
  id            uuid primary key default gen_random_uuid(),
  author_id     uuid not null references profiles(id) on delete cascade,
  category_id   uuid not null references forum_categories(id),
  state_code    char(2) references states(code),
  title         text not null,
  body          text not null,
  visibility_status visibility_status not null default 'visible',
  reply_count   integer not null default 0,
  support_count integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index posts_state_idx on posts(state_code);
create index posts_category_idx on posts(category_id);
create index posts_created_idx on posts(created_at desc);

-- ---------- 5. comments -----------------------------------------------------
create table comments (
  id            uuid primary key default gen_random_uuid(),
  post_id       uuid not null references posts(id) on delete cascade,
  author_id     uuid not null references profiles(id) on delete cascade,
  body          text not null,
  visibility_status visibility_status not null default 'visible',
  support_count integer not null default 0,
  created_at    timestamptz not null default now()
);
create index comments_post_idx on comments(post_id);

-- ---------- 12. bookmarks ---------------------------------------------------
create table bookmarks (
  profile_id    uuid not null references profiles(id) on delete cascade,
  post_id       uuid not null references posts(id) on delete cascade,
  created_at    timestamptz not null default now(),
  primary key (profile_id, post_id)
);

-- ---------- support reactions (kept simple & tasteful) ---------------------
create table post_reactions (
  profile_id    uuid not null references profiles(id) on delete cascade,
  post_id       uuid not null references posts(id) on delete cascade,
  created_at    timestamptz not null default now(),
  primary key (profile_id, post_id)
);

-- ---------- 7. private_conversations ---------------------------------------
create table private_conversations (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);
-- participants (2+ rows per conversation; beta = exactly 2 parents)
create table conversation_participants (
  conversation_id uuid not null references private_conversations(id) on delete cascade,
  profile_id      uuid not null references profiles(id) on delete cascade,
  muted           boolean not null default false,
  primary key (conversation_id, profile_id)
);

-- ---------- 8. private_messages --------------------------------------------
create table private_messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references private_conversations(id) on delete cascade,
  sender_id       uuid not null references profiles(id) on delete cascade,
  content         text not null,
  flagged_status  flagged_status not null default 'clean',
  created_at      timestamptz not null default now()
);
create index pm_conversation_idx on private_messages(conversation_id, created_at);

-- ---------- blocks / mutes (safety) ----------------------------------------
create table user_blocks (
  blocker_id    uuid not null references profiles(id) on delete cascade,
  blocked_id    uuid not null references profiles(id) on delete cascade,
  created_at    timestamptz not null default now(),
  primary key (blocker_id, blocked_id)
);

-- ---------- 9. reports ------------------------------------------------------
create table reports (
  id            uuid primary key default gen_random_uuid(),
  reporter_id   uuid not null references profiles(id) on delete cascade,
  target_type   report_target_type not null,
  target_id     uuid not null,
  reason        text not null,
  status        report_status not null default 'open',
  created_at    timestamptz not null default now()
);
create index reports_status_idx on reports(status);

-- ---------- 10. moderation_actions -----------------------------------------
create table moderation_actions (
  id            uuid primary key default gen_random_uuid(),
  moderator_id  uuid not null references profiles(id),
  target_type   report_target_type not null,
  target_id     uuid not null,
  action        moderation_action_type not null,
  note          text,
  created_at    timestamptz not null default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY (sketch — enable & flesh out before any real data)
-- ============================================================================
-- alter table profiles enable row level security;
-- alter table private_messages enable row level security;
-- Example intent:
--   * Anyone authenticated can read visible posts/comments.
--   * Only the author can edit their own post/comment.
--   * A participant can read messages in their own conversation only.
--   * Blocked users cannot message or appear to the blocker.
--   * Only moderators/admins can write moderation_actions or change
--     verification_status.
-- These policies MUST be reviewed by someone qualified before launch.
