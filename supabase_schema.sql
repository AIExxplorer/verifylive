  -- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  is_verified boolean default false,
  verified_at timestamp with time zone,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a table for immutable audit logs (Liveness Checks)
create table audit_logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id), -- Nullable for anonymous checks
  action text not null, -- 'LIVENESS_CHECK'
  status text not null, -- 'VERIFIED', 'REJECTED'
  confidence numeric,
  metadata jsonb, -- Stores anomalies, reasoning, ip_hash
  ip_address text, -- Hashed for privacy
  user_agent text
);

-- RLS: Audit logs are viewable by the user who created them, or admins
alter table audit_logs enable row level security;

create policy "Users can view their own audit logs"
  on audit_logs for select
  using ( auth.uid() = user_id );

-- Only service role can insert audit logs (via Server Actions)
-- No insert policy for public/authenticated roles to prevent tampering
