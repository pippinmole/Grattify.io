import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch";
import siteMetadata from '../data/siteMetadata'
import headerNavLinks from '../data/navLinks'
import React, {useEffect, useState} from "react";
import {Avatar, Dropdown, Navbar} from "flowbite-react";
import {useSession, useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {User} from "@supabase/gotrue-js";
import {getProfile, ProfileResponse} from "../models/types";

export default function Header() {
  const user = useUser();
  const session = useSession();
  const supabaseClient = useSupabaseClient()

  const [profile, setProfile] = useState<ProfileResponse>()

  useEffect(() => {
    if (!session) return

    getProfile(supabaseClient, session)
      .then(p => setProfile(p))
  }, [session])

  return (
    <Navbar fluid={false} rounded={true}>
      <Navbar.Brand href="https://flowbite.com/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    {siteMetadata.headerTitle}
                </span>
      </Navbar.Brand>

      <div className="flex md:order-2">
        <ThemeSwitch/>

        <Dropdown
          arrowIcon={false}
          inline={true}
          label={<Avatar alt="User settings" img={UserImageOrDefault(profile?.data)} rounded={true}/>}
        >

          {user
            ? <AuthorizedDropdown user={user} signOut={() => supabaseClient.auth.signOut()}/>
            : <UnauthorizedDropdown/>}

        </Dropdown>

        <Navbar.Toggle/>
      </div>

      <Navbar.Collapse>
        {headerNavLinks.map((link, key) => (
          <Navbar.Link href={link.href} hidden={link.authorize && !user} as={Link} key={key}>
            {link.title}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  )
}

const UnauthorizedDropdown = () => (
    <>
        {/*<Link href="/profile">*/}
        {/*    <Dropdown.Item>*/}
        {/*        My Profile*/}
        {/*    </Dropdown.Item>*/}
        {/*</Link>*/}

        {/*<Dropdown.Divider/>*/}

        <Link href="/login">
            <Dropdown.Item>
                Sign in
            </Dropdown.Item>
        </Link>
    </>
);

const AuthorizedDropdown = ({user, signOut}: {
  user: User,
  signOut: () => void
}) => (
    <>
        <Dropdown.Header>
          <span className="block text-sm">
            {user.aud}
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

        {/*<Dropdown.Item>*/}
        {/*    Earnings*/}
        {/*</Dropdown.Item>*/}

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
    </>
);

function UserImageOrDefault(profile: ProfileResponse['data'] | undefined): string {
  if (!profile || !profile.profile_picture) {
      return "https://flowbite.com/docs/images/logo.svg";
  }

  return profile.profile_picture
}