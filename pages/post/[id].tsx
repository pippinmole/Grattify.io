import Layout from "../../components/layout";
import React, {useEffect, useState} from "react";
import {Button, Carousel, Dropdown, Modal} from "flowbite-react";
import Image from "next/image";
import UserProfile from "../../components/user/UserProfile";
import {PostResponseSuccess} from "../../models/types";
import {User} from "@supabase/gotrue-js";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";
import {toast} from "react-toast";
import {HiOutlineExclamationCircle} from "react-icons/hi2";
import {getPostById, likePost} from "../../lib/supabaseUtils";
import {Database} from "../../models/schema";

function PostPage() {
  const router = useRouter()
  const supabaseClient = useSupabaseClient<Database>()
  const {id} = router.query;

  const [post, setPost] = useState<PostResponseSuccess | undefined | null>()

  useEffect(() => {
    if(!router.isReady) return;

    getPostById(supabaseClient, id as string)
      .then(r => setPost(r.data as PostResponseSuccess))
      .catch(e => router.push('/'))
  }, [id, router.isReady])

  const user = useUser()
  const controlValue = post?.images && post?.images.length > 1
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
          <PostActions post={post} user={user}/>
        </div>
      </div>

      <div className="my-8"></div>

      {post.images.length > 0 && (
        <div className="h-56 sm:h-64 xl:h-96 2xl:h-96 mb-4">
          <Carousel leftControl={controlValue} rightControl={controlValue} >
            {post.images?.map((src, index) => (
              <Image
                src={src}
                placeholder={"blur"}
                blurDataURL={"/public/placeholder-image.svg"}
                alt="..."
                width={800}
                height={1200}
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

function PostActions({post, user}: {post: PostResponseSuccess, user: User | null}) {

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

  return (
    <>
      <LikeButton post={post} />

      {isOwner && (
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
      )}
    </>
  )
}

function LikeButton({post}: {post: PostResponseSuccess}) {
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  const user = useUser()

  const [isLiked, setIsLiked] = useState(post.likes.some(l => l.user_id == user?.id))

  return (
    <button className="bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-2 text-sm font-semibold text-gray-700"
            onClick={() => {
              likePost(supabaseClient, user, post)
                .then(r => {router.reload()})}
            }>
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4 mr-1 -mt-1 text-red-500 fill-current"
           viewBox="0 0 20 20">
        <path
          d="M10 18.2l-1.6-1.5C4.5 12.5 2 9.5 2 6.5 2 4.5 3.5 3 5.5 3c1.4 0 2.6.8 3.5 1.8C10.9 3.8 12.1 3 13.5 3c2 0 3.5 1.5 3.5 3.5 0 3-2.5 6-6.4 10.2L10 18.2z"/>
      </svg>
      {post.likes?.length + (isLiked ? 1 : 0)}
    </button>
  )
}

const Ellipsis = () => (
  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
  </svg>
);

PostPage.title = "Post"
PostPage.getLayout = function getLayout(page: React.ReactNode) {
    return <Layout>{page}</Layout>
}

export default PostPage;