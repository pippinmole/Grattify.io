import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import ThemeSwitch from "./ThemeSwitch";
import siteMetadata from '../data/siteMetadata'
import headerNavLinks from '../data/navLinks'
import React from "react";
import {Accordion, Avatar, Dropdown, Navbar} from "flowbite-react";
import {DefaultUser} from "next-auth";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
    const {data: session, status} = useSession()
    const loading = status === "loading"

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
                    label={<Avatar alt="User settings"
                                   img={UserImageOrDefault(session?.user)} rounded={true}/>}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                          {session?.user.name}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {session?.user.email}
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Earnings
                    </Dropdown.Item>
                    <Dropdown.Divider/>

                    <Dropdown.Header>
                        Sign out
                    </Dropdown.Header>

                </Dropdown>
                <Navbar.Toggle/>
            </div>

            <Navbar.Collapse>
                {headerNavLinks.map((link, key) => (
                    <Navbar.Link href={link.href} hidden={link.authorize && !session?.user} as={Link} key={key}>
                        {link.title}
                    </Navbar.Link>
                ))}
            </Navbar.Collapse>
        </Navbar>
    )
}

function UserImageOrDefault(user: DefaultUser | undefined): string {
    if(!user || !user.image) {
        return "https://flowbite.com/docs/images/logo.svg";
    }

    return user.image
}