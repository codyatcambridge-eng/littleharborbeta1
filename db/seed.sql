-- ============================================================================
-- Little Harbor — minimal seed data (PostgreSQL / Supabase)
-- ============================================================================
-- Mirrors the mock data in src/data/*. Run AFTER schema.sql. Intended for a
-- local/dev project only — never seed a production database with demo accounts.
-- States are abbreviated here; load the full list from src/data/states.ts.
-- ============================================================================

insert into states (code, name, slug) values
  ('GA', 'Georgia', 'georgia'),
  ('FL', 'Florida', 'florida'),
  ('TX', 'Texas', 'texas'),
  ('OH', 'Ohio', 'ohio'),
  ('CA', 'California', 'california'),
  ('NY', 'New York', 'new-york');

insert into forum_categories (name, slug, description, icon, sort_order) values
  ('Introductions', 'introductions', 'Say a gentle hello.', 'wave', 0),
  ('Daily Wins', 'daily-wins', 'Small victories worth celebrating.', 'star', 1),
  ('Questions for Other Parents', 'questions', 'Ask people who get it.', 'chat', 2),
  ('Chronic Illness Support', 'chronic-illness', 'The long road, together.', 'heart', 3),
  ('Disability & Accessibility', 'disability-accessibility', 'Access and advocacy.', 'anchor', 4),
  ('School & IEP / Support Systems', 'school-iep', 'IEPs, 504s, and services.', 'book', 5),
  ('Emotional Support', 'emotional-support', 'A soft place for hard days.', 'hands', 6),
  ('Therapy / Developmental Support', 'therapy-development', 'OT, PT, speech, and more.', 'leaf', 7),
  ('Practical Resource Sharing', 'resources', 'Tools parents actually use.', 'compass', 8),
  ('Parenting Through Hard Seasons', 'hard-seasons', 'For the hardest chapters.', 'lighthouse', 9),
  ('Moderator Announcements', 'announcements', 'Updates from the team.', 'bell', 10);

-- NOTE: users/profiles/posts/messages seeding depends on auth.users ids in
-- Supabase. For local development, create test auth users first, then insert
-- matching users + profiles rows, then posts referencing those profile ids.
-- See src/data/profiles.ts, posts.ts, and messages.ts for the demo content.
