import {Avatar} from "flowbite-react";
import React from "react";
import Link from "next/link";
import {User} from "@supabase/gotrue-js";

export default function UserProfileIcon({user}: {user: User}) {
    return (
        <Link href={`/user/${user.id}`}>
            <div className="flex flex-wrap gap-2">
                <Avatar
                    img={user.image ?? "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                    rounded={true}
                />
            </div>
        </Link>
    )
}