import Layout from "../components/layout";
import React, {useEffect, useState} from "react";
import PostTile from "../components/posts/PostTile";
import PostTileContainer from "../components/posts/PostTileContainer";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {getAllPosts} from "../lib/supabaseUtils";
import {Database} from "../models/schema";
import {PostResponse, PostResponseArray} from "../models/types";

export default function DiscoverPage() {
  const user = useUser()
  const supabaseClient = useSupabaseClient<Database>()
  const [data, setData] = useState<PostResponseArray>();

  useEffect(() => {

    getAllPosts(supabaseClient)
      .then(data => setData(data))

  }, [])

  // useEffect(() => {
  //   if (data) {
  //     toast.error(error.message)
  //   }
  // }, [data])

  return (
    <>
      <h1 className="text-3xl font-bold text-center">
        Discover
      </h1>

      <p className="tracking-normal text-gray-500 md:text-sm dark:text-gray-400 text-center my-4">
        Take a look at what other people are grateful for! 🌎
      </p>

      <PostTileContainer>
        {/*{isLoading && [1, 2, 3].map((key) => <PostTileSkeleton key={key}></PostTileSkeleton>)}*/}

        {data && data.data?.map((post, key) => <PostTile post={post} key={key}></PostTile>)}
        {data && data.data?.length === 0 && <>No posts!</>}
      </PostTileContainer>
    </>
  )
}

DiscoverPage.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>
}