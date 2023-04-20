import React, {useEffect, useState} from "react";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";
import {Avatar, Button, Tabs, Timeline} from "flowbite-react";
import {HiArrowNarrowRight, HiCalendar} from "react-icons/hi";
import Link from "next/link";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {getAllPostsForUserId, useProfile} from "../lib/supabaseUtils";
import {PostResponseArray, ProfileResponse} from "../models/types";

export default function Profile() {
  // TODO: Switch this to user[id] profile instead of session
  const profile = useProfile()

  // If no session exists, display access denied message
  if (!profile) {
    return (
      <Layout>
        <AccessDenied/>
      </Layout>
    )
  }

  return (
    <Layout>
      <Avatar
        img={profile?.data?.profile_picture}
        rounded={true}
        size={"xl"}
        className="w-fit mb-8 my-2"
      >
        <div className="space-y-1 font-medium dark:text-white">
          <div>
            {profile.data?.username}
          </div>
          {/*<div className="text-sm text-gray-500 dark:text-gray-400">*/}
          {/*    Joined in August 2014*/}
          {/*</div>*/}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {profile?.data?.bio}
          </div>
        </div>
      </Avatar>

      <ProfileTabs profile={profile} />
    </Layout>
  )
}

function ProfileTabs({profile}: {profile: ProfileResponse}) {
  return (
    <Tabs.Group
      aria-label="Tabs with underline"
      style="underline"
    >
      <Tabs.Item title="Posts" active={true}>
        {profile && <PostsTimeline profile={profile}/>}
      </Tabs.Item>

      <Tabs.Item title="About">
        {"« User bio feature coming soon »"}
      </Tabs.Item>
    </Tabs.Group>
  )
}

function PostsTimeline({profile}: {profile: ProfileResponse}) {
  const supabaseClient = useSupabaseClient();
  const [posts, setPosts] = useState<PostResponseArray>()

  useEffect(() => {
    if (!profile || !profile.data) return

    getAllPostsForUserId(supabaseClient, profile.data.id)
      .then(p => setPosts(p))
  }, [profile])

  if(!posts || !posts.data) return <div>Loading posts...</div>

  return (
    <Timeline>
      {posts.data.map((post, key) => (
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
              {post.content?.substring(0, 100)}
            </Timeline.Body>
            <Link href={`/post/${post.id}`}>
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