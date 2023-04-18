import React, {useEffect} from "react";
import useSWR from "swr";
import {IPost} from "../../models/post";
import fetcher from "../../lib/fetch";
import {toast} from "react-toast";
import {PostTile, PostTileContainer, PostTileSkeleton} from "../posts";
import {CustomUser} from "../../types/next-auth";

export default function RecentPosts({user}: {user: CustomUser | undefined}) {
    const {data, error, isLoading} = useSWR<IPost[]>(
        user ? `/api/user/${user.id}/posts` : null, fetcher
    )

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error])

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-medium title-font tracking-widest text-center">
                📅 Your Recent Posts
            </h1>

            <p className="tracking-normal text-gray-500 md:text-sm dark:text-gray-400 text-center my-4">
                Here's a collection of your latest posts. Keep engaging and sharing your thoughts!
            </p>

            <PostTileContainer>
                {isLoading
                    ? [1,2,3].map((key) => <PostTileSkeleton key={key}></PostTileSkeleton>)
                    : user ? <PostTiles data={data}/>
                        : (
                            <p className="font-medium text-gray-900 dark:text-white text-center m-auto my-8">
                                🧑 Sign in to see your posts!
                            </p>
                        )}
            </PostTileContainer>
        </div>
    )
}

function PostTiles({data}: {data: IPost[] | undefined}) {
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