import Layout from "../components/layout"
import {useEffect, useState} from "react";
import {CreatePost, ExistingPost, RecentPosts} from "../components/index";
import {useSession, useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {getTodaysPost} from "../lib/supabaseUtils";
import {toast} from "react-toast";
import {PostResponse} from "../models/types";
import {Database} from "../models/schema";

export default function IndexPage() {
  const supabaseClient = useSupabaseClient<Database>()
  const [post, setPost] = useState<PostResponse>();
  const user = useUser();
  const session = useSession()

  // Show error if we fail to get the post
  useEffect(() => {
    if(post?.error) {
      toast.error(post.error.message)
    }
  }, [post])

  // Refresh today's post if the user session changes
  useEffect(() => {
    if(!session) {
      setPost(undefined)
      return
    }

    getTodaysPost(supabaseClient, session)
      .then(r => setPost(r as PostResponse))
  },[session])

  return (
    <>
      {post?.data ? <ExistingPost post={post}/> : <CreatePost/>}

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

      <RecentPosts />
    </>
  )
}

IndexPage.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>
}