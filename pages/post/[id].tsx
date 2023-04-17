import { GetServerSideProps } from 'next';
import Post, {IPost} from "../../models/post";
import Layout from "../../components/layout";
import React from "react";
import {Avatar} from "flowbite-react";

function PostPage({ post }: { post: IPost}) {
    post = JSON.parse(post as unknown as string)

    return (
        <Layout>
            <div>
                <Avatar img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}>
                    <div className="space-y-1 font-medium dark:text-white">
                        <div>
                            Jese Leos
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Joined in August 2014
                        </div>
                    </div>
                </Avatar>
            </div>

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
    const {id} = context.query;

    const post = await Post.findById(id)

    return {
        props: {
            post: JSON.stringify(post)
        },
    };
}


export default PostPage;
