import React, {useEffect, useState} from "react";
import {toast} from "react-toast";
import {PostTile, PostTileContainer, PostTileSkeleton} from "../posts";
import {User} from "@supabase/gotrue-js";
import {PostResponseArray, PostResponseSuccess} from "../../models/types";
import {useSession, useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {getAllPostsForSession} from "../../lib/supabaseUtils";
import Link from "next/link";

export default function RecentPosts({user}: {user: User | null}) {

  const supabaseClient = useSupabaseClient()
  const session = useSession()
  const [posts, setPosts] = useState<PostResponseArray>()

  useEffect(() => {
    if(!session) {
      setPosts(undefined)
      return
    }

    getAllPostsForSession(supabaseClient, session)
      .then((posts) => setPosts(posts))
  }, [session])

  useEffect(() => {
    if (posts?.error) {
      toast.error(posts.error.message)
    }
  }, [posts])

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-medium title-font tracking-widest text-center">
        📅 Your Recent Posts
      </h1>

      <p className="tracking-normal text-gray-500 md:text-sm dark:text-gray-400 text-center my-4">
        Here's a collection of your latest posts. Keep engaging and sharing your thoughts!
      </p>

      <PostTileContainer>
        {session && !posts?.data && [1, 2, 3].map((key) => <PostTileSkeleton key={key}></PostTileSkeleton>)}
        {posts?.data && <PostTiles data={posts.data}/>}
        {!session && (
          <p className="font-medium text-gray-900 dark:text-white text-center m-auto my-8">
            {" 🧑 "}
            <Link href="/login">
              Sign in
            </Link>
            {" to see your posts!"}
          </p>
        )}
      </PostTileContainer>
    </div>
  )
}

function PostTiles({data}: {data: PostResponseArray['data']}) {
  if (!data || data.length === 0) {
    return (
      <p className="font-medium text-gray-900 dark:text-white text-center m-auto my-8">
        🔎 We couldn't find any posts! Go ahead and make one!
      </p>
    )
  }

  return (
    <>
      {data.map((post, key) => <PostTile post={post as PostResponseSuccess} key={key}></PostTile>)}
    </>
  )
}