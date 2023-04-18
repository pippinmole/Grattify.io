import {IPost} from "../../models/post";
import Link from "next/link";
import Moment from "react-moment";
import Image from "next/image";
import UserProfileIcon from "../user/UserProfileIcon";

export default function PostTile({post}: {post: IPost}) {
    return (
        <div className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-200 dark:border-gray-600 border-opacity-60 rounded-lg overflow-hidden">
                <Image className="lg:h-48 md:h-36 w-full object-cover object-center" src="https://picsum.photos/800/1600"
                     alt="blog" width={100} height={100}/>
                <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        Created <Moment fromNow={true} date={post.createdAt}></Moment>
                    </h2>

                    <h1 className="title-font text-lg font-medium mb-3">
                        {post.title?.length > 35 ? `${post.title.slice(0, 35)}...` : post.title}
                    </h1>
                    <p className="leading-relaxed mb-3 overflow-ellipsis">
                        {post.content.length > 35 ? `${post.content.slice(0, 35)}...` : post.content}

                        <Link className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 ml-2 text-sm"
                              href={`/post/${post._id}`}>
                            Read More

                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor"
                                 strokeWidth="2" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </p>

                    {post.author && <UserProfileIcon user={post.author} />}
                </div>
            </div>
        </div>
    )
}