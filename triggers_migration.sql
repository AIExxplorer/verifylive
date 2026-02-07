-- FUNCTION: handle_new_user
-- Automatically creates a profile in 'verifylive_profiles' when a new user signs up via Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.verifylive_profiles (id, full_name, avatar_url, username)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url',
    -- Generate a default username if none is provided, fallback to email part
    coalesce(
      new.raw_user_meta_data ->> 'username',
      split_part(new.email, '@', 1)
    )
  );
  return new;
end;
$$;

-- TRIGGER: on_auth_user_created
-- Binds the function to the auth.users table
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
