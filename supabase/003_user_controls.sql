create table if not exists public.password_reset_tokens (
  id text primary key,
  user_id text not null references public.app_users(id) on delete cascade,
  token_hash text not null unique,
  reset_url text not null,
  status text not null default 'Pending' check (status in ('Pending', 'Used', 'Expired')),
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.email_outbox (
  id text primary key,
  user_id text references public.app_users(id) on delete set null,
  recipient text not null,
  subject text not null,
  body text not null,
  status text not null default 'Queued' check (status in ('Queued', 'Sent', 'Failed')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_password_reset_tokens_user on public.password_reset_tokens(user_id);
create index if not exists idx_password_reset_tokens_hash on public.password_reset_tokens(token_hash);
create index if not exists idx_email_outbox_user on public.email_outbox(user_id);

alter table public.password_reset_tokens enable row level security;
alter table public.email_outbox enable row level security;

drop policy if exists "Admins manage reset tokens" on public.password_reset_tokens;
drop policy if exists "Admins manage email outbox" on public.email_outbox;

create policy "Admins manage reset tokens" on public.password_reset_tokens
  for all using (public.is_app_admin()) with check (public.is_app_admin());

create policy "Admins manage email outbox" on public.email_outbox
  for all using (public.is_app_admin()) with check (public.is_app_admin());
