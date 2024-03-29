import {Database} from "./schema";
import {Session} from "@supabase/auth-helpers-react";
import {SupabaseClient} from "@supabase/supabase-js";

export function getPost(
  supabase: SupabaseClient<Database>,
) {
  return supabase
    .from('posts')
    .select('*')
    .maybeSingle();
}

export function getPosts(
  supabase: SupabaseClient<Database>,
) {
  return supabase
    .from('posts')
    .select('*')
}

export function getLikes(
  supabase: SupabaseClient<Database>,
) {
  return supabase
    .from('post_likes')
    .select('*')
}

export async function getProfile(
  supabase: SupabaseClient<Database>,
  session: Session
) {
  return supabase.from('profiles')
    .select('*')
    .eq('id', session?.user.id)
    .limit(1)
    .maybeSingle();
}

export async function getPreferences(
  supabase: SupabaseClient<Database>,
  session: Session
) {
  return supabase.from('preferences')
    .select('*')
    .eq('id', session?.user.id)
    .limit(1)
    .maybeSingle();
}

export type PostResponse = Awaited<ReturnType<typeof getPost>>
export type PostResponseSuccess = PostResponse["data"] & {
  author: Profiles,
  likes: Likes[]
}
export type PostResponseArray = Awaited<ReturnType<typeof getPosts>>

export type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileResponse = Awaited<ReturnType<typeof getProfile>>

export type Likes = Database["public"]["Tables"]["post_likes"]["Row"];

export type Preferences = Database["public"]["Tables"]["preferences"]["Row"];
export type PreferencesResponse = Awaited<ReturnType<typeof getPreferences>>