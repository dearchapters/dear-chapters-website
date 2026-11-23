-- =========================================================
-- Dear Chapters: subscriber database (Supabase / Postgres)
-- Paste this whole file into Supabase > SQL Editor > Run.
-- Safe to run once on a fresh project.
-- =========================================================

-- 1. SUBSCRIBERS ------------------------------------------------------------
create table if not exists public.subscribers (
  id                 uuid primary key default gen_random_uuid(),
  email              text not null
                     check (email = lower(email) and email ~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),
  name               text check (name is null or char_length(name) <= 80),
  wants_launch       boolean not null default true,   -- email me when the planner is ready
  wants_love_letter  boolean not null default false,  -- weekly love letter
  status             text not null default 'active'
                     check (status in ('active', 'unsubscribed')),
  source             text,                            -- which page they signed up on
  unsubscribe_token  uuid not null default gen_random_uuid(),
  subscribed_at      timestamptz not null default now(),
  unsubscribed_at    timestamptz,
  launch_emailed_at  timestamptz,                     -- set once the "planner is ready" email is sent
  constraint wants_something check (wants_launch or wants_love_letter)
);

-- One row per email address (the website treats a duplicate as "already on the list")
create unique index if not exists subscribers_email_key on public.subscribers (email);
create index if not exists subscribers_status_idx on public.subscribers (status);

-- 2. LOVE LETTERS -----------------------------------------------------------
-- Write each weekly letter here ahead of time, then send it from your email tool.
create table if not exists public.love_letters (
  id            uuid primary key default gen_random_uuid(),
  subject       text not null,
  body          text not null,
  scheduled_for date,                                  -- the Monday (or day) it should go out
  status        text not null default 'draft'
                check (status in ('draft', 'scheduled', 'sent')),
  sent_at       timestamptz,
  created_at    timestamptz not null default now()
);

create index if not exists love_letters_schedule_idx on public.love_letters (status, scheduled_for);

-- 3. LOVE LETTER SEND LOG ---------------------------------------------------
-- Records who received which letter, so nobody gets the same letter twice.
create table if not exists public.love_letter_sends (
  letter_id     uuid not null references public.love_letters(id) on delete cascade,
  subscriber_id uuid not null references public.subscribers(id) on delete cascade,
  sent_at       timestamptz not null default now(),
  primary key (letter_id, subscriber_id)
);

-- 4. SECURITY (Row Level Security) ------------------------------------------
-- Visitors using the public website key may ONLY add a new signup.
-- They cannot read, change or delete anything. You (logged in to Supabase)
-- and any server-side tool using the service key can do everything.
alter table public.subscribers       enable row level security;
alter table public.love_letters      enable row level security;
alter table public.love_letter_sends enable row level security;

drop policy if exists "Website visitors can subscribe" on public.subscribers;
create policy "Website visitors can subscribe"
  on public.subscribers
  for insert
  to anon
  with check (status = 'active' and unsubscribed_at is null and launch_emailed_at is null);

-- Belt and braces: the public key gets insert-only access on subscribers, nothing else.
revoke all on public.subscribers       from anon;
revoke all on public.love_letters      from anon;
revoke all on public.love_letter_sends from anon;
grant insert (email, name, wants_launch, wants_love_letter, source) on public.subscribers to anon;

-- 5. HANDY VIEWS / QUERIES ---------------------------------------------------
-- Who should get the "planner is ready" email:
--   select email, name from public.subscribers
--   where status = 'active' and wants_launch and launch_emailed_at is null;
--
-- Who should get this week's love letter:
--   select email, name, unsubscribe_token from public.subscribers
--   where status = 'active' and wants_love_letter;
--
-- Mark someone unsubscribed:
--   update public.subscribers
--   set status = 'unsubscribed', unsubscribed_at = now()
--   where unsubscribe_token = '<token from the email link>';
