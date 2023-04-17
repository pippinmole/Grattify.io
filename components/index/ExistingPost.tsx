import {IPost} from "../../models/post";
import {useRouter} from "next/router";
import Countdown from "../countdown/Countdown";
import Link from "next/link";
import {Button} from "flowbite-react";
import {HiOutlineArrowRight} from "react-icons/hi";
import React from "react";

export default function ExistingPost({post}: {post: IPost}) {

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