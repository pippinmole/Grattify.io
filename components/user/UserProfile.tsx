import Moment from "react-moment";
import {Avatar} from "flowbite-react";
import React from "react";

export default function UserProfile({user}: {user: any}) {
    return (
        <Avatar img={user.image ?? "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} rounded={true}>
            <div className="space-y-1 font-medium dark:text-white">
                <div>
                    {user.uid}

                    <span className="text-lime-100 text-xs ml-2">
                        Author
                    </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Joined <Moment fromNow={true} date={user.createdAt}></Moment>
                </div>
            </div>
        </Avatar>
    )
}