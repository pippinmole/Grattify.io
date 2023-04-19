import {supabase} from "../lib/supabaseClient";
import {User} from "@supabase/gotrue-js";
import {Database} from "./schema";

export function getPosts() {
  return supabase
    .from('posts')
    .select('*')
    .single();
}

export async function getProfile() {
  return supabase.from('profiles')
    .select('*')
    .single();
}

export type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export interface UserProfile {
  user: User;
  profile: Profiles;
}

export type PostResponse = Awaited<ReturnType<typeof getPosts>>
export type Post = PostResponse['data']
export type PostError = PostResponse['error']

export type ProfileResponse = Awaited<ReturnType<typeof getProfile>>
export type Profile = ProfileResponse['data']
export type ProfileError = ProfileResponse['error']