import { GetServerSideProps } from 'next';
import Post, {IPost} from "../../models/post";
import Layout from "../../components/layout";
import React from "react";
import {Carousel} from "flowbite-react";
import User from "../../models/user";
import Image from "next/image";
import UserProfile from "../../components/user/UserProfile";

function PostPage({ post }: { post: IPost }) {
    post = JSON.parse(post as unknown as string)

    return (
        <Layout>
            <div>
                {post.author && <UserProfile user={post.author}/>}

                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>

                {post.imageRefs?.length > 0 && (
                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        <Carousel>
                            {post.imageRefs?.map((src, index) => (
                                <Image
                                    src={src}
                                    alt="..."
                                    width={1}
                                    height={1}
                                    key={index}
                                />
                            ))}
                        </Carousel>
                    </div>
                )}

                <h2 className="text-4xl font-extrabold dark:text-white">
                    {post.title}
                </h2>
                <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400 mt-2">
                    {post.content}
                </p>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.query;

    const _ = await User.find({}).lean()
    const post = await Post.findById(id).populate('author').lean();

    console.log(post)

    return {
        props: {
            post: JSON.stringify(post)
        },
    };
}


export default PostPage;
