import Layout from "../components/layout";
import Post, {IPost} from "../models/post";
import {GetServerSideProps} from "next";
import Link from "next/link";
import dbConnect from "../lib/mongoose";
import React from "react";
import PostTile from "../components/posts/PostTile";
import PostTileContainer from "../components/posts/PostTileContainer";

export default function DiscoverPage({ posts }: { posts: IPost[]}) {

    posts = JSON.parse(posts as unknown as string)

    return (
        <Layout>
            <h1 className="text-2xl font-medium title-font mb-4 tracking-widest text-center">
                DISCOVER
            </h1>

            <PostTileContainer>
                {posts.map((post, key) => <PostTile post={post} key={key}></PostTile>)}
            </PostTileContainer>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    await dbConnect();

    const posts = await Post.find().lean()

    return {
        props: {
            posts: JSON.stringify(posts)
        },
    };
}