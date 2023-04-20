import Link from "next/link";
import Moment from "react-moment";
import Image from "next/image";
import UserProfileIcon from "../user/UserProfileIcon";
import React from "react";
import {HiArrowNarrowRight} from "react-icons/hi";
import {PostResponseSuccess} from "../../models/types";

export default function PostTile({post}: {post: PostResponseSuccess}) {
    if (!post) {
        return <>Loading...</>
    }

    const fallbackUrl = "https://picsum.photos/800/1600"
    const url = post.images.length > 0 ? post.images[0] :  fallbackUrl

    return (
      <div className="p-4 md:w-1/3">
          <div
            className="h-full border-2 border-gray-200 dark:border-gray-600 border-opacity-60 rounded-lg overflow-hidden">
              <Image className="lg:h-48 md:h-36 w-full object-cover object-center"
                     src={url}
                     loading={"lazy"}
                     placeholder={"blur"}
                     blurDataURL={fallbackUrl}
                     alt="blog"
                     width={100}
                     height={100}/>

              <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      Created <Moment fromNow={true} date={new Date(post.created_at ?? "")}></Moment>
                  </h2>

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

                  {post.author && <UserProfileIcon profile={post.author}/>}
              </div>
          </div>
      </div>
    )
}