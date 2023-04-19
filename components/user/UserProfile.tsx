import Moment from "react-moment";
import {Avatar} from "flowbite-react";
import React from "react";
import {ProfileResponse} from "../../models/types";

export default function UserProfile({profile}: {profile: ProfileResponse['data']}) {
  return (
    <Avatar img={profile?.profile_picture} rounded={true}>
      <div className="space-y-1 font-medium dark:text-white">
        <div>
          {profile?.username}

          <span className="text-lime-100 text-xs ml-2">
                        Author
                    </span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Joined <Moment fromNow={true} date={profile?.created_at}></Moment>
        </div>
      </div>
    </Avatar>
  )
}