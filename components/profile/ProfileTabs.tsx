import {ProfileResponse} from "../../models/types";
import {Tabs} from "flowbite-react";
import PostsTimeline from "./PostsTimeline";
import React from "react";

export default function ProfileTabs({profile}: {profile: ProfileResponse}) {
  return (
    <Tabs.Group
      aria-label="Tabs with underline"
      style="underline"
    >
      <Tabs.Item title="Posts" active={true}>
        {profile && <PostsTimeline profile={profile}/>}
      </Tabs.Item>

      <Tabs.Item title="About">
        {profile && profile.data && (
          <>
            {profile.data.bio}
          </>
        )}
      </Tabs.Item>
    </Tabs.Group>
  )
}