import {supabase} from "../lib/supabaseClient";

export function getPosts() {
  return supabase.from('posts')
    .select('*')
    .single();
}

export type PostResponse = Awaited<ReturnType<typeof getPosts>>
export type PostResponseSuccess = PostResponse['data']
export type PostResponseError = PostResponse['error']