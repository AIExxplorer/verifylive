-- SCHEMA: VerifyLive (Namespace: verifylive_*)

-- 1. Profiles Table (verifylive_profiles)
create table if not exists verifylive_profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  is_verified boolean default false,
  verified_at timestamp with time zone,

  constraint username_length check (char_length(username) >= 3)
);

-- RLS for Profiles
alter table verifylive_profiles enable row level security;

create policy "Public view verifylive_profiles"
  on verifylive_profiles for select
  using ( true );

create policy "Users insert own verifylive_profile"
  on verifylive_profiles for insert
  with check ( auth.uid() = id );

create policy "Users update own verifylive_profile"
  on verifylive_profiles for update
  using ( auth.uid() = id );


-- 2. Audit Logs (verifylive_audit_logs)
create table if not exists verifylive_audit_logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id), 
  action text not null, -- 'LIVENESS_CHECK', 'DOC_UPLOAD'
  status text not null, -- 'VERIFIED', 'REJECTED'
  confidence numeric,
  metadata jsonb,
  ip_address text,
  user_agent text
);

-- RLS for Audit Logs
alter table verifylive_audit_logs enable row level security;

create policy "Users view own verifylive_audit_logs"
  on verifylive_audit_logs for select
  using ( auth.uid() = user_id );

-- 3. Storage Configuration
insert into storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
values 
  ('verifylive-docs', 'verifylive-docs', false, false, 5242880, array['image/jpeg', 'image/png', 'application/pdf']),
  ('verifylive-proofs', 'verifylive-proofs', false, false, 5242880, array['image/jpeg'])
on conflict (id) do update set 
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- RLS for Storage
-- Docs
create policy "Users upload own verifylive-docs"
  on storage.objects for insert
  with check ( bucket_id = 'verifylive-docs' and auth.uid() = owner );

create policy "Users view own verifylive-docs"
  on storage.objects for select
  using ( bucket_id = 'verifylive-docs' and auth.uid() = owner );

-- Proofs
create policy "Users upload own verifylive-proofs"
  on storage.objects for insert
  with check ( bucket_id = 'verifylive-proofs' and auth.uid() = owner );
