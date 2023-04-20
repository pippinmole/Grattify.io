import Link from "next/link";
import Image from "next/image";
import React from "react";
import {HiArrowNarrowRight} from "react-icons/hi";
import {PostResponseSuccess} from "../../models/types";
import UserProfile from "../user/UserProfile";

export default function PostTile({post}: {post: PostResponseSuccess}) {
  if (!post) {
    return <>Loading...</>
  }

  const url = post.images.length > 0 ? post.images[0] : null

  return (
    <div className="p-4 md:w-1/3 h-fit">
      <div
        className="border-2 border-gray-200 dark:border-gray-600 border-opacity-60 rounded-lg overflow-hidden">
        {url && <Image className="lg:h-48 md:h-36 w-full object-cover object-center"
                       src={url}
                       loading={"lazy"}
                       placeholder={"blur"}
                       blurDataURL={"https://picsum.photos/800/1600"}
                       alt="blog"
                       width={100}
                       height={100}
        />}

        <div className="p-6">
          <h1 className="title-font text-lg font-medium mb-3">
            {post.title && post.title?.length > 35 ? `${post.title.slice(0, 35)}...` : post.title}
          </h1>
          <p className="leading-relaxed mb-3 overflow-ellipsis">
            {post?.content && post.content.length > 35 ? `${post.content.slice(0, 35)}...` : post.content}

            <Link className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 ml-2 text-sm"
                  href={`/post/${post.id}`}>
              Read More

              <HiArrowNarrowRight className="ml-1 h-3 w-3"/>
            </Link>
          </p>

          <div className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {post.author && (
              <Link href={`/profile/${post.author?.id}`}>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>

                <UserProfile profile={post.author}/>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}