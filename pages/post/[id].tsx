import { GetServerSideProps, NextPage } from 'next';
import Post, {IPost} from "../../models/post";
import Layout from "../../components/layout";
import React from "react";

function PostPage({ post }: { post: IPost}) {
    post = JSON.parse(post as unknown as string)

    return (
        <Layout>
            <h1>{post.content}</h1>
            <p>
                <>
                    A post by {post.author}
                </>
            </p>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    const post = await Post.findById(id)

    return {
        props: {
            post: JSON.stringify(post)
        },
    };}


export default PostPage;
