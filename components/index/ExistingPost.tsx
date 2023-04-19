import {useRouter} from "next/router";
import Countdown from "../countdown/Countdown";
import Link from "next/link";
import {Button} from "flowbite-react";
import {HiOutlineArrowRight} from "react-icons/hi";
import React from "react";
import {PostResponse} from "../../models/types";

export default function ExistingPost({post}: {post: PostResponse}) {
  const {push} = useRouter()

  if(!post || !post.data) {
    return <>Loading...</>
  }

  return (
    <>
      <h1 className="text-2xl font-medium title-font mb-4 tracking-widest text-center">
        You've already posted today!
      </h1>

      <p className="tracking-normal text-gray-500 md:text-sm dark:text-gray-400 text-center">
        Posts can be made every 24 hours. Please wait until the time has elapsed. 😃
      </p>

      <Countdown from={NextPostAllowed(post.data.created_at)} onFinished={() => push('/')}></Countdown>

      <Link href={`/post/${post.data.id}`}>
        <Button className="my-8 mx-auto">
          View today's post
          <HiOutlineArrowRight className="ml-2 h-5 w-5"/>
        </Button>
      </Link>
    </>
  )
}

function NextPostAllowed(dateStr: string | null): Date {
  const date = new Date(dateStr ?? "1970-01-01T00:00:00.000Z")
  date.setHours(date.getHours() + 24)
  return date
}