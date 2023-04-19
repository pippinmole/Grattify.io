import {Avatar} from "flowbite-react";
import React from "react";
import Link from "next/link";
import {IPost} from "../../lib/supabaseUtils";

export default function UserProfileIcon({profile}: {profile: IPost['author']}) {

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
        <Avatar img={profile?.profile_picture} rounded={true}/>
      </div>
    </Link>
  )
}