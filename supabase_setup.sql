-- Run this once in Supabase → SQL Editor → "New query".
-- Creates the single RSVP table this app needs, plus security rules
-- so 1000+ anonymous guests can submit a response, but nobody can read,
-- edit, or delete anyone else's response through the public app.

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  attending boolean not null,
  guest_count integer not null default 0,
  message text
);

-- Sanity check at the database level: if attending = false, guest_count
-- must be 0 (matches "if user decline then count should be zero").
alter table public.rsvps
  add constraint guest_count_zero_if_declined
  check (attending = true or guest_count = 0);

alter table public.rsvps
  add constraint guest_count_non_negative
  check (guest_count >= 0);

-- Row Level Security: locked down by default, then opened ONLY for insert.
alter table public.rsvps enable row level security;

-- Anyone (anonymous guests using the public site) can submit a response.
create policy "Anyone can submit an RSVP"
  on public.rsvps
  for insert
  to anon
  with check (true);

-- Nobody can read, update, or delete through the public anon key.
-- (You will read responses yourself via the Supabase Table Editor,
-- which uses your own login — not the public anon key.)
