import Layout from "../components/layout"
import React from "react";
import {GetServerSideProps} from "next";
import {CreatePost, ExistingPost, RecentPosts} from "../components/index";
import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs";
import {useUser} from "@supabase/auth-helpers-react";
import {PostResponse, PostResponseSuccess} from "../models/types";

export default function IndexPage({post}: { post: PostResponse }) {
    const user = useUser()

    return (
        <>
           {post ? <ExistingPost post={post["data"] as PostResponseSuccess}/> : <CreatePost/>}

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

            <RecentPosts user={user}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(context)
  // Check if we have a session
  const {
    data: {session},
  } = await supabase.auth.getSession()

  // Find all posts pertaining to a user
  // const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const {data} = await supabase.from('posts')
    .select('*')
    .eq('author', session?.user.id)
    .maybeSingle()

  console.log(data)

  return {
    props: {
      post: data
    }
  };
}

IndexPage.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>
}