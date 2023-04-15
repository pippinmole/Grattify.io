import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"
import ThemeSwitch from "./ThemeSwitch";
import SectionContainer from "./SectionContainer";
import siteMetadata from '../data/siteMetadata'
import headerNavLinks from '../data/navLinks'

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
    const {data: session, status} = useSession()
    const loading = status === "loading"

    return (
        <SectionContainer>
            <header className="flex items-center justify-between py-10">
                <Link href="/" aria-label={siteMetadata.headerTitle}
                      className="flex title-font font-medium items-center mb-4 md:mb-0 ml-3 text-xl">
                    {siteMetadata.headerTitle}
                </Link>

                <div className="flex items-center text-base leading-5">
                    <div className="hidden sm:block">
                        {headerNavLinks.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="p-1 font-medium sm:p-4"
                                hidden={link.authorize && !session?.user}
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>

                    <ThemeSwitch/>
                </div>
            </header>

            <noscript>
                <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>

            <div className={styles.signedInStatus + " pb-5"}>
                <p
                    className={`nojs-show ${!session && loading ? styles.loading : styles.loaded}`}>
                    {!session && (
                        <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
                            <a
                                href={`/api/auth/signin`}
                                className={styles.buttonPrimary}
                                onClick={(e) => {
                                    e.preventDefault()
                                    signIn()
                                }}
                            >
                                Sign in
                            </a>
                        </>
                    )}
                    {session?.user && (
                        <>
                            {session.user.image && (
                                <span
                                    style={{backgroundImage: `url('${session.user.image}')`}}
                                    className={styles.avatar}
                                />
                            )}
                            <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br/>
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
                            <a
                                href={`/api/auth/signout`}
                                className={styles.button}
                                onClick={(e) => {
                                    e.preventDefault()
                                    signOut()
                                }}
                            >
                                Sign out
                            </a>
                        </>
                    )}
                </p>
            </div>
        </SectionContainer>
    )
}