import Layout from "../components/layout"
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import { useSession } from "next-auth/react"
import {toast} from "react-toast";
import Post, {IPost} from "../models/post";
import {GetServerSideProps} from "next";
import dbConnect from "../lib/mongoose";
import Countdown from "../components/countdown/Countdown";
import useSWR from "swr";
import fetcher from "../lib/fetch";
import {CustomUser} from "../types/next-auth";
import PostTile from "../components/posts/PostTile";
import PostTileContainer from "../components/posts/PostTileContainer";
import PostTileSkeleton from "../components/posts/PostTileSkeleton";
import {Button} from "flowbite-react";
import {HiOutlineArrowRight} from "react-icons/hi";
import Link from "next/link";

interface IPostForm {
    content: string
}

export default function IndexPage({post}: { post: IPost }) {
    const {data: session, status} = useSession()

    post = JSON.parse(post as unknown as string)

    return (
        <Layout>
            {post && session?.user ? (<AlreadyPosted post={post}/>) : (<CreatePost/>)}

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-medium title-font tracking-widest text-center">
                    📅 Your Recent Posts
                </h1>

                <p className="tracking-normal text-gray-500 md:text-sm dark:text-gray-400 text-center my-4">
                    Here's a collection of your latest posts. Keep engaging and sharing your thoughts!
                </p>

                {session?.user ? (<PostsByUser user={session?.user!}/>) : (<></>)}
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    await dbConnect();

    // Find all posts pertaining to a user
    const dayAgo = new Date();
    dayAgo.setDate(dayAgo.getDate() - 1);

    const todaysPost = await Post.findOne({
        createdAt: {
            $gte: dayAgo
        },
        user: context.query.user
    });

    return {
        props: {
            post: JSON.stringify(todaysPost)
        }
    };
}

function CreatePost() {
    const {push} = useRouter();
    const {data: session} = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState<IPostForm>({
        content: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function submitDailyGratitude(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!session?.user) {
            await push('/api/auth/signin')
            return;
        }

        setSubmitting(true)

        const response = await fetch('/api/post/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        const data = await response.json()

        if (!data || !response.ok) {
            toast.error(data.message)
        } else {
            await push(`post/${data._id}`)
        }

        setSubmitting(false)
    }


    return (
        <>
            <h1 className="text-3xl font-bold text-center">
                What are you grateful for today?
            </h1>

            <p className="tracking-normal text-gray-500 md:text-sm dark:text-gray-400 text-center my-4">
                Posts can be made every 24 hours. Please wait until the time has elapsed. 😃
            </p>

            <form onSubmit={(e) => submitDailyGratitude(e)}
            className="max-w-screen-md mx-auto">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your message
                </label>

                <textarea id="message"
                          rows={7}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="I am grateful for..."
                          name="content"
                          value={formData.content}
                          onChange={handleChange}>
                </textarea>

                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">
                    Attach media
                </label>

                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file"
                           className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                className="font-semibold">Click to upload</span>
                                {/*or drag and drop*/}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                                800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden"/>
                    </label>
                </div>

                <div className="text-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded disabled:bg-blue-300"
                        type="submit"
                        disabled={submitting}>

                        {submitting ? (
                            <div>
                                <svg aria-hidden="true"
                                     className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"/>
                                </svg>
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <>Submit</>
                        )}
                    </button>
                </div>
            </form>
        </>
    )
}

function AlreadyPosted({post}: {post: IPost}) {

    const {push} = useRouter()

    return (
        <>
            <h1 className="text-2xl font-medium title-font mb-4 tracking-widest text-center">
                You have already posted today!
            </h1>

            <p className="tracking-normal text-gray-500 md:text-sm dark:text-gray-400 text-center">
                Posts can be made every 24 hours. Please wait until the time has elapsed. 😃
            </p>

            <Countdown from={NextPostAllowed(new Date(post.createdAt))} onFinished={() => push('/')}></Countdown>

            <Link href={`/post/${post._id}`}>
                <Button className="my-8 mx-auto">
                    View post
                    <HiOutlineArrowRight className="ml-2 h-5 w-5"/>
                </Button>
            </Link>
        </>
    )
}

function NextPostAllowed(date: Date): Date {
    date.setHours(date.getHours() + 24)
    return date
}

function PostsByUser({user}: {user: CustomUser}) {
    const {data, error, isLoading} = useSWR<IPost[]>(
        user ? `/api/user/${user.id}/posts` : null, fetcher, {
            dedupingInterval: 3600000,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error])

    return (
        <PostTileContainer>
            {isLoading ? (
                Array.from(Array(3).keys()).map((key) =>
                    <PostTileSkeleton key={key}></PostTileSkeleton>)
            ) : (<PostTilesOrNothing user={user} data={data} />)}
        </PostTileContainer>
    )
}

function PostTilesOrNothing({user, data}: {user: CustomUser, data: IPost[] | undefined}) {
    if(!user) {
        return (
            <p className="font-medium text-gray-900 dark:text-white text-center m-auto my-8">
                🧑 Sign in to see your posts!
            </p>
        )
    }

    if (!data || data.length === 0) {
        return (
            <p className="font-medium text-gray-900 dark:text-white text-center m-auto my-8">
                🔎 We couldn't find any posts! Go ahead and make one!
            </p>
        )
    }

    return (
        <>
            {data?.map((post, key) => <PostTile post={post} key={key}></PostTile>)}
        </>
    )
}