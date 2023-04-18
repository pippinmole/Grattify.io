import Layout from "./layout"
import React from "react";
import { useSession } from "next-auth/react"
import Post, {IPost} from "../models/post";
import {GetServerSideProps} from "next";
import dbConnect from "../lib/mongoose";
import {CreatePost, ExistingPost, RecentPosts} from "../components/index";
import {getServerSession} from "next-auth/next";
import {authOptions} from "./api/auth/[...nextauth]";

export default function IndexPage({post}: { post: IPost }) {
    const {data: session, status} = useSession()

    post = JSON.parse(post as unknown as string) as IPost

    return (
        <>
            {post ? <ExistingPost post={post}/> : <CreatePost/>}

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

            <RecentPosts user={session?.user}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    await dbConnect();

    const session = await getServerSession(context.req, context.res, authOptions)

    // Find all posts pertaining to a user
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const todaysPost = await Post.findOne({
        createdAt: {
            $gte: yesterday
        },
        author: session?.user.id
    });

    return {
        props: {
            post: JSON.stringify(todaysPost)
        }
    };
}