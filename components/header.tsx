import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch";
import siteMetadata from '../data/siteMetadata'
import headerNavLinks from '../data/navLinks'
import React, {useEffect, useState} from "react";
import {Navbar} from "flowbite-react";
import {useSession, useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {getProfile, ProfileResponse} from "../models/types";
import AuthorizedProfileDropdown from "./header/AuthorizedProfileDropdown";
import UnauthorizedDropdown from "./header/UnauthorizedProfileDropdown";

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

        {user
          ? <AuthorizedProfileDropdown user={user} profile={profile} signOut={() => supabaseClient.auth.signOut()}/>
          : <UnauthorizedDropdown/>}
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