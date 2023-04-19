import {Avatar} from "flowbite-react";
import React from "react";
import Link from "next/link";
import {ProfileResponse} from "../../models/types";

export default function UserProfileIcon({profile}: {profile: ProfileResponse['data']}) {

  if(!profile) {
    return (
      <>
        Loading profile...
        {
          // TODO: Add loading animation
        }
      </>
    )
  }

  return (
    <Link href={`/user/${profile?.id}`}>
      <div className="flex flex-wrap gap-2">
        <Avatar img={profile.profile_picture} rounded={true}/>
      </div>
    </Link>
  )
}