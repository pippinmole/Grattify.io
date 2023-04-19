import React from "react";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";
import {Avatar, Button, Tabs, Timeline} from "flowbite-react";
import {HiArrowNarrowRight, HiCalendar} from "react-icons/hi";
import useSWR from "swr";
import fetcher from "../lib/fetch";
import Link from "next/link";
import {useUser} from "@supabase/auth-helpers-react";

export default function Profile() {
    const user = useUser()

    // If no session exists, display access denied message
    if (!user) {
        return (
            <Layout>
                <AccessDenied/>
            </Layout>
        )
    }

    return (
        <Layout>
            <Avatar
                img={user.image ?? "https://i.pravatar.cc/300"}
                rounded={true}
                size={"xl"}
                className="w-fit mb-8 my-2"
            >
                <div className="space-y-1 font-medium dark:text-white">
                    <div>
                        {user.email}
                    </div>
                    {/*<div className="text-sm text-gray-500 dark:text-gray-400">*/}
                    {/*    Joined in August 2014*/}
                    {/*</div>*/}
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {"« User bio feature coming soon »"}
                    </div>
                </div>
            </Avatar>

            <ProfileTabs user={user} />
        </Layout>
    )
}

function ProfileTabs({user}: {user: CustomUser}) {
    const {data, isLoading, error} = useSWR<IPost[]>(
        `/api/user/${user.id}/posts`,
        fetcher
    )

    return (
        <Tabs.Group
            aria-label="Tabs with underline"
            style="underline"
        >
            <Tabs.Item title="Posts" active={true}>
                {data && <PostsTimeline posts={data}/>}
            </Tabs.Item>

            <Tabs.Item title="About">
                {"« User bio feature coming soon »"}
            </Tabs.Item>
        </Tabs.Group>
    )
}

function PostsTimeline({posts}: {posts: IPost[]}) {
    return (
        <Timeline>
            {posts.map((post, key) => (
                <Timeline.Item>
                    <Timeline.Point icon={HiCalendar}/>
                    <Timeline.Content>
                        <Timeline.Time>
                            February 2022
                        </Timeline.Time>
                        <Timeline.Title>
                            {post.title}
                        </Timeline.Title>
                        <Timeline.Body>
                            {post.content.substring(0, 100)}
                        </Timeline.Body>
                        <Link href={`/post/${post._id}`}>
                            <Button color="gray">
                                Read More
                                <HiArrowNarrowRight className="ml-2 h-3 w-3"/>
                            </Button>
                        </Link>

                    </Timeline.Content>
                </Timeline.Item>
            ))}
        </Timeline>
    )
}