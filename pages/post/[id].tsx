import { GetServerSideProps } from 'next';
import Layout from "../../components/layout";
import React from "react";
import {Button, Carousel, Dropdown, Modal} from "flowbite-react";
import Image from "next/image";
import UserProfile from "../../components/user/UserProfile";
import {supabase} from "../../lib/supabaseClient";
import {PostResponseSuccess} from "../../models/types";
import {User} from "@supabase/gotrue-js";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";
import {toast} from "react-toast";
import {HiOutlineExclamationCircle} from "react-icons/hi2";

PostPage.title = "Post"
function PostPage({ post }: { post: PostResponseSuccess }) {
  const user = useUser()
  const controlValue = post?.images.length > 1
    ? ""
    : " "

  if (!post) {
    return <>Loading...</>
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex">
          {post.author && <UserProfile profile={post.author} />}
        </div>

        <div className="flex">
          <PostOptionsDropdown post={post} user={user}/>
        </div>
      </div>

      <div className="my-8"></div>

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
      <p className="mb-16 text-lg font-thin text-gray-500 dark:text-gray-400 mt-2">
        {post.content}
      </p>
    </>
  )
}

function PostOptionsDropdown({post, user}: {post: PostResponseSuccess, user: User | null}) {

  const router = useRouter()
  const supabaseClient = useSupabaseClient()

  const [isOpen, setIsOpen] = React.useState(false)

  const deletePost = async () => {
    const {data, error} = await supabaseClient
      .from("posts")
      .delete()
      .eq('id', post.id)

    if (error) {
      toast.error('Error when deleting post')
    } else {
      toast.success("Successfully deleted post")
      await router.push('/')
    }
  }

  const isOwner = user?.id == post.author_id

  if(!isOwner) {
    return <></>
  }

  return (
    <>
      <Modal
        show={isOpen}
        size="md"
        popup={true}
        onClose={() => setIsOpen(false)}
      >
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>

            <p className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
              This cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={deletePost}
              >
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => setIsOpen(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Dropdown size="xs" label={<Ellipsis/>} arrowIcon={false} color={"gray"} className="bg-white dark:bg-gray-800">
        <Dropdown.Item>
          Something else
        </Dropdown.Item>

        {isOwner && (
          <>
            <Dropdown.Divider/>
            <Dropdown.Item className="!text-red-500" onClick={() => setIsOpen(true)}>
              Delete Post
            </Dropdown.Item>
          </>
        )}
      </Dropdown>
    </>
  )
}

const Ellipsis = () => (
  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
  </svg>
);

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
