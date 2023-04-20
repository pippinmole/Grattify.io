import Link from "next/link";
import Image from "next/image";
import React from "react";
import {HiArrowNarrowRight} from "react-icons/hi";
import {PostResponseSuccess} from "../../models/types";
import UserProfile from "../user/UserProfile";
import Moment from "react-moment";

export default function PostTile({post}: {post: PostResponseSuccess}) {
  if (!post) {
    return <>Loading...</>
  }

  const postUrl = `/post/${post.id}`
  const url = post.images.length > 0 ? post.images[0] : null
  const title = post.title && post.title?.length > 35 ? `${post.title.slice(0, 35)}...` : post.title
  const content = post?.content && post.content.length > 35 ? `${post.content.slice(0, 35)}...` : post.content

  return (
    <div className="p-4">
      <div
        className="border-2 border-gray-200 dark:border-gray-600 border-opacity-60 rounded-lg overflow-hidden">
        {url && <Image className="lg:h-48 md:h-36 w-full object-cover object-center"
                       src={url}
                       loading={"lazy"}
                       placeholder={"blur"}
                       blurDataURL={"https://picsum.photos/800/1600"}
                       alt="blog"
                       width={100}
                       height={300}
        />}

        <div className="p-6">
          <h1 className="title-font text-lg font-medium">
            {title}

            <Moment
              to={new Date(post.created_at ?? "")}
              className="text-xs text-gray-500 dark:text-gray-400 ml-1.5"></Moment>
          </h1>

          <p className="leading-relaxed mb-3 overflow-ellipsis">
            {content}

            <Link className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 ml-2 text-sm" href={postUrl}>
              Read More

              <HiArrowNarrowRight className="ml-1 h-3 w-3"/>
            </Link>
          </p>

          <div className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {post.author && (
              <>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>

                <UserProfile profile={post.author}/>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}