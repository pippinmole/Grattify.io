import {Avatar, Dropdown} from "flowbite-react";
import Link from "next/link";
import React from "react";
import {User} from "@supabase/gotrue-js";
import {ProfileResponse} from "../../models/types";

export default function AuthorizedProfileDropdown({user, profile, signOut}: {
  user: User,
  profile: ProfileResponse | null | undefined,
  signOut: () => void
}) {
  return (
    <>
      <Dropdown
        arrowIcon={false}
        inline={true}
        label={<Avatar alt="User settings" img={UserImageOrDefault(profile?.data)} rounded={true}/>}
      >
        <Dropdown.Header>
        <span className="block text-sm">
      {profile?.data?.username}
      </span>
          <span className="block truncate text-sm font-medium">
            {user.email}
          </span>
        </Dropdown.Header>

        <Link href="/profile">
          <Dropdown.Item>
            My Profile
          </Dropdown.Item>
        </Link>

        <Link href="/settings">
          <Dropdown.Item>
            Settings
          </Dropdown.Item>
        </Link>

        <Dropdown.Divider/>

        {user ? (
          <Dropdown.Item onClick={signOut}>
            Sign out
          </Dropdown.Item>
        ) : (
          <Link href="/login">
            <Dropdown.Header>
              Sign in
            </Dropdown.Header>
          </Link>
        )}
      </Dropdown>
    </>
  )
}

function UserImageOrDefault(profile: ProfileResponse['data'] | undefined): string {
  if (!profile || !profile.profile_picture) {
    return "https://flowbite.com/docs/images/logo.svg";
  }

  return profile.profile_picture
}