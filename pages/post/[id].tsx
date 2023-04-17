import { GetServerSideProps } from 'next';
import Post, {IPost} from "../../models/post";
import Layout from "../../components/layout";
import React from "react";
import {Avatar, Carousel} from "flowbite-react";
import User from "../../models/user";
import Moment from "react-moment";
import Image from "next/image";

function PostPage({ post }: { post: IPost }) {
    post = JSON.parse(post as unknown as string)

    return (
        <Layout>
            <div>
                <Avatar img={post?.author?.image ?? "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} rounded={true}>
                    <div className="space-y-1 font-medium dark:text-white">
                        <div>
                            {post?.author.name}

                            <span className="text-lime-100 text-xs ml-2">
                                Author
                            </span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Joined <Moment fromNow={true} date={post.author.createdAt}></Moment>
                        </div>
                    </div>
                </Avatar>

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

    return {
        props: {
            post: JSON.stringify(post)
        },
    };
}


export default PostPage;
