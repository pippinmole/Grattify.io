import Moment from "react-moment";
import {Avatar} from "flowbite-react";
import React from "react";
import {ProfileResponse} from "../../models/types";
import Link from "next/link";

export default function UserProfile({profile}: {profile: ProfileResponse['data']}) {
  return (
    <Link href={`/profile/${profile?.id}`}>
      <Avatar img={profile?.profile_picture} rounded={true} className="!justify-start h-fit">
        <div className="space-y-1 font-medium dark:text-white">
          <div>
            {profile?.username}

            <span className="text-lime-100 text-xs ml-2">Author</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Joined <Moment fromNow={true} date={profile?.created_at}></Moment>
          </div>
        </div>
      </Avatar>
    </Link>
  )
}