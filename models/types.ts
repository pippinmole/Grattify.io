import {User} from "@supabase/gotrue-js";
import {Database} from "./schema";
import {Session} from "@supabase/auth-helpers-react";
import {SupabaseClient} from "@supabase/supabase-js";

export function getPost(
  supabase: SupabaseClient<Database>,
) {
  return supabase
    .from('posts')
    .select('*')
    .single();
}

export function getPosts(
  supabase: SupabaseClient<Database>,
) {
  return supabase
    .from('posts')
    .select('*')
}

export async function getProfile(
  supabase: SupabaseClient<Database>,
  session: Session
) {
  return supabase.from('profiles')
    .select('*')
    .eq('id', session?.user.id)
    .maybeSingle();
}

export type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export interface UserProfile {
  user: User;
  profile: Profiles;
}

export type PostResponse = Awaited<ReturnType<typeof getPost>>
export type PostResponseArray = Awaited<ReturnType<typeof getPosts>>
export type ProfileResponse = Awaited<ReturnType<typeof getProfile>>