import Layout from "../components/layout"
import React, {useEffect, useState} from "react";
import {CreatePost, ExistingPost, RecentPosts} from "../components/index";
import {useSession, useUser} from "@supabase/auth-helpers-react";
import {getTodaysPost, IPost} from "../lib/supabaseUtils";
import {toast} from "react-toast";

export default function IndexPage() {
  const [post, setPost] = useState<IPost | null>(null);
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
    getTodaysPost(session).then(setPost);
  },[session])

  return (
    <>
      {post?.post ? <ExistingPost post={post}/> : <CreatePost/>}

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

      <RecentPosts user={user}/>
    </>
  )
}

IndexPage.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>
}