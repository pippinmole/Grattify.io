import {Session} from "@supabase/auth-helpers-react";
import {supabase} from "./supabaseClient";
import {Post, PostError, Profile, ProfileError} from "../models/types";
import {User} from "@supabase/gotrue-js";

export interface IPost {
  post: Post;
  author: Profile | null;
  error: ProfileError & PostError
}

export async function getProfile(
  session: Session | null
) {
  // get profile and profile_info
  const {data: profile} = await supabase
    .from("profiles")
    .select(`*`)
    .eq("id", session?.user.id)
    .maybeSingle();

  return {
    profile,
    session,
  };
}

export async function getTodaysPost(
  session: Session | null
): Promise<IPost> {

  if(!session || !session.user) {
    return {
      post: null,
      author: null,
      error: null,
    }
  }

  // const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const {
    data: posts,
    error: postsError
  } = await supabase.from('posts')
    .select('*')
    .eq('author_id', session?.user.id)
    .maybeSingle()

  const {
    data: profile,
    error: profileError
  } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user.id)
    .maybeSingle()

  return {
    post: posts as Post,
    author: profile as Profile,
    error: postsError ? postsError : profileError ? profileError : null
  }
}

supabase.auth.onAuthStateChange(async (event, session) => {
  console.log("auth event", event, session)

  if(!session?.user) return

  await createProfile(session?.user);
});

const createProfile = async (user: User) => {
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