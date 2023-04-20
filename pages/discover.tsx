import Layout from "../components/layout";
import React, {useEffect, useState} from "react";
import PostTile from "../components/posts/PostTile";
import PostTileContainer from "../components/posts/PostTileContainer";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {getAllPosts} from "../lib/supabaseUtils";
import {Database} from "../models/schema";
import {PostResponseArray, PostResponseSuccess} from "../models/types";
import {PostTileSkeleton} from "../components/posts";

export default function DiscoverPage() {
  const supabaseClient = useSupabaseClient<Database>()
  const [data, setData] = useState<PostResponseArray>();

  useEffect(() => {
    getAllPosts(supabaseClient)
      .then(data => setData(data))
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold text-center">
        Discover
      </h1>

      <p className="tracking-normal text-gray-500 md:text-sm dark:text-gray-400 text-center my-4">
        Take a look at what other people are grateful for! 🌎
      </p>

      <PostTileContainer>
        {!data && [1, 2, 3].map((key) => <PostTileSkeleton key={key}></PostTileSkeleton>)}

        {data && data.data?.map((post, key) => <PostTile post={post as PostResponseSuccess} key={key}></PostTile>)}
        {data && data.data?.length === 0 && <>No posts!</>}
      </PostTileContainer>
    </>
  )
}

DiscoverPage.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>