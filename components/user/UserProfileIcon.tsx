import {CustomUser} from "../../types/next-auth";
import {Avatar} from "flowbite-react";
import React from "react";
import Link from "next/link";

export interface UserProfileIconProps {
    user: CustomUser
}

export default function UserProfileIcon(props: UserProfileIconProps) {
    return (
        <Link href={`/user/${props.user.id}`}>
            <div className="flex flex-wrap gap-2">
                <Avatar
                    img={props.user.image ?? "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                    rounded={true}
                />
            </div>
        </Link>
    )
}