import {PostResponseArray, ProfileResponse} from "../../models/types";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import React, {useEffect, useState} from "react";
import {getAllPostsForUserId} from "../../lib/supabaseUtils";
import {Button, Timeline} from "flowbite-react";
import {HiArrowNarrowRight, HiCalendar} from "react-icons/hi";
import Link from "next/link";

export default function PostsTimeline({profile}: {profile: ProfileResponse}) {
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
        <Timeline.Item key={key}>
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