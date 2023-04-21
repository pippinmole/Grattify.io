import { GetServerSideProps } from 'next';
import Layout from "../../components/layout";
import React from "react";
import {Carousel} from "flowbite-react";
import Image from "next/image";
import UserProfile from "../../components/user/UserProfile";
import {supabase} from "../../lib/supabaseClient";
import {PostResponseSuccess} from "../../models/types";

PostPage.title = "Post"
function PostPage({ post }: { post: PostResponseSuccess }) {
  const controlValue = post?.images.length > 1
    ? ""
    : " "

  if (!post) {
    return <>Loading...</>
  }

  return (
    <>
      {post.author && <UserProfile profile={post.author}/>}

      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>

      {post.images.length > 0 && (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mb-4">
          <Carousel leftControl={controlValue} rightControl={controlValue}>
            {post.images?.map((src, index) => (
              <Image
                src={src}
                placeholder={"blur"}
                blurDataURL={"/public/placeholder-image.svg"}
                alt="..."
                width={800}
                height={500}
                key={index}
              />
            ))}
          </Carousel>
        </div>
      )}

      <h2 className="text-3xl font-bold">
        {post.title}
      </h2>
      <p className="mb-4 text-lg font-thin text-gray-500 dark:text-gray-400 mt-2">
        {post.content}
      </p>
    </>
  )
}

PostPage.getLayout = function getLayout(page: React.ReactNode) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {id} = context.query;

  const {data} = await supabase
    .from('posts')
    .select("*, author:author_id (*)")
    .eq('id', id)
    .maybeSingle()
    .throwOnError()

  return {
    props: {
      post: data
    },
  };
}


export default PostPage;
