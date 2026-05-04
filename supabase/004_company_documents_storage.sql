insert into storage.buckets (id, name, public)
values ('company-documents', 'company-documents', false)
on conflict (id) do update set public = excluded.public;

alter table public.documents
  add column if not exists file_path text,
  add column if not exists file_url text,
  add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_documents_user_created on public.documents(user_id, created_at desc);
create index if not exists idx_documents_masking_request on public.documents(masking_request_id);
create index if not exists idx_documents_file_path on public.documents(file_path);

drop trigger if exists set_documents_updated_at on public.documents;
create trigger set_documents_updated_at before update on public.documents for each row execute function public.set_updated_at();

drop policy if exists "Customers read own documents" on public.documents;
drop policy if exists "Customers create own documents" on public.documents;
drop policy if exists "Admins manage documents" on public.documents;

create policy "Customers read own documents" on public.documents for select
  using (public.is_app_admin() or user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Customers create own documents" on public.documents for insert
  with check (user_id in (select id from public.app_users where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))));
create policy "Admins manage documents" on public.documents for all
  using (public.is_app_admin())
  with check (public.is_app_admin());
