import {Session} from "@supabase/auth-helpers-react";
import {User} from "@supabase/gotrue-js";
import {SupabaseClient} from "@supabase/supabase-js";
import {supabase} from "./supabaseClient";
import {Database} from "../models/schema";

export async function getProfile(
  supabase: SupabaseClient<Database>,
  session: Session
) {
  return supabase
    .from("profiles")
    .select(`*`)
    .eq("id", session?.user.id)
    .maybeSingle();
}

export async function getTodaysPost(
  supabase: SupabaseClient<Database>,
  session: Session | null
) {
  if(!session || !session.user) {
    return null
  }

  return supabase
    .from('posts')
    .select("*, author_id (*)")
    .eq('author_id', session?.user.id)
    .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .maybeSingle()
}

export async function getAllPosts<T>(
  supabase: SupabaseClient<Database>
) {
  return supabase
    .from('posts')
    .select(`*, author_id (*)`)
}

export async function getAllPostsForSession(
  supabase: SupabaseClient<Database>,
  session: Session
) {
  return getAllPostsForUserId(supabase, session?.user.id);
}

export async function getAllPostsForUserId(
  supabase: SupabaseClient<Database>,
  id: string
) {

  return supabase
    .from('posts')
    .select(`*, author_id (*)`)
    .eq('author_id', id)
}

supabase.auth.onAuthStateChange(async (event, session) => {
  console.log("auth event", event, session)

  if(!session?.user) return

  await createProfile(supabase, session?.user);
});

const createProfile = async (supabase: SupabaseClient<Database>, user: User) => {
  return supabase
    .from("profiles")
    .insert({
      bio: "",
      id: user.id,
      username: usernameToEmail(user.email)
    })
    .single();
}

const usernameToEmail = (email: string | undefined) => {
  if(!email) return "UNKNOWN";

  return email.substring(0, email.indexOf("@"))
}