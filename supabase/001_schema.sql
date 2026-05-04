create extension if not exists pgcrypto;

create table if not exists public.app_users (
  id text primary key,
  role text not null default 'customer' check (role in ('admin', 'customer')),
  name text not null,
  company text not null,
  email text not null unique,
  phone text,
  address text,
  company_type text,
  avatar text,
  plan text not null default 'Trial',
  balance numeric(14,2) not null default 0 check (balance >= 0),
  status text not null default 'Pending approval',
  account_status text not null default 'Pending' check (account_status in ('Pending', 'Approved', 'Rejected')),
  masking_status text not null default 'Not applied' check (masking_status in ('Not applied', 'Pending', 'Approved', 'Rejected')),
  bin_tax text,
  docs text,
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.masking_requests (
  id text primary key,
  user_id text not null references public.app_users(id) on delete cascade,
  company_name text not null,
  company_type text not null,
  other_company_type text,
  bin_tax text not null,
  website text,
  email text not null,
  phone text not null,
  documents jsonb not null default '[]'::jsonb,
  note text,
  status text not null default 'Pending' check (status in ('Pending', 'Approved', 'Rejected')),
  reviewed_by text references public.app_users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audiences (
  id text primary key,
  user_id text not null references public.app_users(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'Active' check (status in ('Active', 'Archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contacts (
  id text primary key,
  user_id text not null references public.app_users(id) on delete cascade,
  audience_id text not null references public.audiences(id) on delete cascade,
  name text not null,
  phone text not null,
  email text,
  consent text not null default 'Opted in' check (consent in ('Opted in', 'DND', 'Blocked')),
  operator text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (audience_id, phone)
);

create table if not exists public.sms_packages (
  id text primary key,
  name text not null,
  type text not null check (type in ('non-masking', 'masking')),
  price numeric(14,2) not null check (price > 0),
  rate numeric(8,4) not null check (rate > 0),
  status text not null default 'Published' check (status in ('Draft', 'Published', 'Archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_orders (
  id text primary key,
  user_id text not null references public.app_users(id) on delete cascade,
  package_id text references public.sms_packages(id) on delete set null,
  method text not null default 'bKash',
  trx text,
  amount numeric(14,2) not null check (amount >= 0),
  status text not null default 'Pending' check (status in ('Pending', 'Processing', 'Completed', 'Cancelled')),
  credited boolean not null default false,
  note text,
  gateway jsonb not null default '{}'::jsonb,
  gateway_payload jsonb,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wallet_transactions (
  id text primary key,
  user_id text not null references public.app_users(id) on delete cascade,
  order_id text references public.payment_orders(id) on delete set null,
  type text not null check (type in ('credit', 'debit', 'adjustment')),
  amount numeric(14,2) not null,
  balance_after numeric(14,2) not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.sms_campaigns (
  id text primary key,
  user_id text not null references public.app_users(id) on delete cascade,
  name text not null,
  type text not null,
  audience_id text references public.audiences(id) on delete set null,
  sender_id text,
  message text,
  sent integer not null default 0 check (sent >= 0),
  delivered integer not null default 0 check (delivered >= 0),
  cost numeric(14,2) not null default 0 check (cost >= 0),
  status text not null default 'Queued' check (status in ('Draft', 'Queued', 'Live', 'Completed', 'Failed', 'Cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sms_messages (
  id text primary key,
  user_id text not null references public.app_users(id) on delete cascade,
  campaign_id text references public.sms_campaigns(id) on delete set null,
  type text not null,
  sender_id text,
  recipients integer not null default 1 check (recipients >= 0),
  segments integer not null default 1 check (segments > 0),
  cost numeric(14,2) not null default 0 check (cost >= 0),
  status text not null default 'Queued',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.sms_templates (
  id text primary key,
  user_id text references public.app_users(id) on delete cascade,
  name text not null,
  type text not null,
  body text not null,
  status text not null default 'Active' check (status in ('Active', 'Archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id text primary key,
  user_id text not null references public.app_users(id) on delete cascade,
  masking_request_id text references public.masking_requests(id) on delete cascade,
  file_name text not null,
  file_type text,
  status text not null default 'Submitted' check (status in ('Submitted', 'Approved', 'Rejected')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id text primary key,
  user_id text references public.app_users(id) on delete set null,
  client text not null,
  amount numeric(14,2) not null check (amount >= 0),
  status text not null default 'Due' check (status in ('Draft', 'Due', 'Paid', 'Cancelled')),
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gateway_routes (
  id text primary key,
  name text not null,
  type text not null,
  uptime numeric(6,2) not null default 0,
  latency text,
  health text not null default 'Healthy' check (health in ('Healthy', 'Watch', 'Down')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.platform_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists idx_app_users_role on public.app_users(role);
create index if not exists idx_app_users_email on public.app_users(lower(email));
create index if not exists idx_audiences_user on public.audiences(user_id);
create index if not exists idx_contacts_user on public.contacts(user_id);
create index if not exists idx_contacts_audience on public.contacts(audience_id);
create index if not exists idx_campaigns_user on public.sms_campaigns(user_id);
create index if not exists idx_orders_user_status on public.payment_orders(user_id, status);
create index if not exists idx_masking_user_status on public.masking_requests(user_id, status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_app_users_updated_at on public.app_users;
create trigger set_app_users_updated_at before update on public.app_users for each row execute function public.set_updated_at();
drop trigger if exists set_masking_requests_updated_at on public.masking_requests;
create trigger set_masking_requests_updated_at before update on public.masking_requests for each row execute function public.set_updated_at();
drop trigger if exists set_audiences_updated_at on public.audiences;
create trigger set_audiences_updated_at before update on public.audiences for each row execute function public.set_updated_at();
drop trigger if exists set_contacts_updated_at on public.contacts;
create trigger set_contacts_updated_at before update on public.contacts for each row execute function public.set_updated_at();
drop trigger if exists set_packages_updated_at on public.sms_packages;
create trigger set_packages_updated_at before update on public.sms_packages for each row execute function public.set_updated_at();
drop trigger if exists set_orders_updated_at on public.payment_orders;
create trigger set_orders_updated_at before update on public.payment_orders for each row execute function public.set_updated_at();
drop trigger if exists set_campaigns_updated_at on public.sms_campaigns;
create trigger set_campaigns_updated_at before update on public.sms_campaigns for each row execute function public.set_updated_at();

create or replace function public.is_app_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.app_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      and role = 'admin'
  );
$$;

create or replace function public.verify_app_login(p_email text, p_password text)
returns table (
  id text,
  role text,
  name text,
  company text,
  email text,
  phone text,
  account_status text,
  masking_status text
)
language sql
security definer
set search_path = public
as $$
  select u.id, u.role, u.name, u.company, u.email, u.phone, u.account_status, u.masking_status
  from public.app_users u
  where lower(u.email) = lower(p_email)
    and u.password_hash = extensions.crypt(p_password, u.password_hash)
  limit 1;
$$;

create or replace function public.create_customer_profile(
  p_name text,
  p_company text,
  p_email text,
  p_phone text,
  p_address text,
  p_company_type text,
  p_password text
)
returns table (id text, role text, name text, company text, email text)
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id text := 'u' || replace(gen_random_uuid()::text, '-', '');
begin
  insert into public.app_users (
    id, role, name, company, email, phone, address, company_type, avatar, password_hash
  ) values (
    new_id,
    'customer',
    trim(p_name),
    trim(p_company),
    lower(trim(p_email)),
    trim(p_phone),
    nullif(trim(coalesce(p_address, '')), ''),
    coalesce(nullif(trim(p_company_type), ''), 'E-commerce'),
    upper(left(regexp_replace(trim(p_company), '[^A-Za-z0-9]+', '', 'g'), 2)),
    extensions.crypt(p_password, extensions.gen_salt('bf'))
  );

  return query
  select u.id, u.role, u.name, u.company, u.email
  from public.app_users u
  where u.id = new_id;
end;
$$;

alter table public.app_users enable row level security;
alter table public.masking_requests enable row level security;
alter table public.audiences enable row level security;
alter table public.contacts enable row level security;
alter table public.sms_packages enable row level security;
alter table public.payment_orders enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.sms_campaigns enable row level security;
alter table public.sms_messages enable row level security;
alter table public.sms_templates enable row level security;
alter table public.documents enable row level security;
alter table public.invoices enable row level security;
alter table public.gateway_routes enable row level security;
alter table public.platform_settings enable row level security;

drop policy if exists "Users can read own profile, admins read all" on public.app_users;
drop policy if exists "Admins manage profiles" on public.app_users;
drop policy if exists "Customers read own masking requests, admins read all" on public.masking_requests;
drop policy if exists "Customers create own masking requests" on public.masking_requests;
drop policy if exists "Customers update own pending masking requests" on public.masking_requests;
drop policy if exists "Admins manage masking requests" on public.masking_requests;
drop policy if exists "Customers manage own audiences" on public.audiences;
drop policy if exists "Customers manage own contacts" on public.contacts;
drop policy if exists "Published packages are readable" on public.sms_packages;
drop policy if exists "Admins manage packages" on public.sms_packages;
drop policy if exists "Customers read own orders, admins manage all" on public.payment_orders;
drop policy if exists "Customers read own wallet transactions" on public.wallet_transactions;
drop policy if exists "Customers manage own campaigns" on public.sms_campaigns;
drop policy if exists "Customers read own messages" on public.sms_messages;
drop policy if exists "Customers manage own templates" on public.sms_templates;
drop policy if exists "Customers read own documents" on public.documents;
drop policy if exists "Customers read own invoices" on public.invoices;
drop policy if exists "Routes are readable" on public.gateway_routes;
drop policy if exists "Admins manage routes" on public.gateway_routes;
drop policy if exists "Platform settings are readable" on public.platform_settings;
drop policy if exists "Admins manage platform settings" on public.platform_settings;

create policy "Users can read own profile, admins read all" on public.app_users
  for select using (public.is_app_admin() or lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));
create policy "Admins manage profiles" on public.app_users for all using (public.is_app_admin()) with check (public.is_app_admin());

create policy "Customers read own masking requests, admins read all" on public.masking_requests
  for select using (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Customers create own masking requests" on public.masking_requests
  for insert with check (user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Customers update own pending masking requests" on public.masking_requests
  for update using (status = 'Pending' and user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))))
  with check (user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Admins manage masking requests" on public.masking_requests for all using (public.is_app_admin()) with check (public.is_app_admin());

create policy "Customers manage own audiences" on public.audiences for all
  using (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))))
  with check (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Customers manage own contacts" on public.contacts for all
  using (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))))
  with check (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Published packages are readable" on public.sms_packages for select using (status = 'Published' or public.is_app_admin());
create policy "Admins manage packages" on public.sms_packages for all using (public.is_app_admin()) with check (public.is_app_admin());
create policy "Customers read own orders, admins manage all" on public.payment_orders for all
  using (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))))
  with check (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Customers read own wallet transactions" on public.wallet_transactions for select
  using (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Customers manage own campaigns" on public.sms_campaigns for all
  using (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))))
  with check (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Customers read own messages" on public.sms_messages for select
  using (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Customers manage own templates" on public.sms_templates for all
  using (public.is_app_admin() or user_id is null or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))))
  with check (public.is_app_admin() or user_id is null or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Customers read own documents" on public.documents for select
  using (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Customers read own invoices" on public.invoices for select
  using (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Routes are readable" on public.gateway_routes for select using (true);
create policy "Admins manage routes" on public.gateway_routes for all using (public.is_app_admin()) with check (public.is_app_admin());
create policy "Platform settings are readable" on public.platform_settings for select using (true);
create policy "Admins manage platform settings" on public.platform_settings for all using (public.is_app_admin()) with check (public.is_app_admin());
