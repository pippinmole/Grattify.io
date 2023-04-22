import {ProfileResponse} from "../../models/types";
import React from "react";
import AccessDenied from "../access-denied";
import {Avatar} from "flowbite-react";
import ProfileTabs from "./ProfileTabs";


export default function ProfileFor({profile}: {profile: ProfileResponse | null}) {

  // If no session exists, display access denied message
  if (!profile) {
    return (
      <AccessDenied/>
    )
  }

  return (
    <>
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

      <ProfileTabs profile={profile}/>
    </>
  )
}