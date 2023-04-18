import { SessionProvider } from "next-auth/react"
import "./styles.css"

import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import {ThemeProvider} from "next-themes";
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import NextNProgress from 'nextjs-progressbar';
import * as NProgress from "nprogress";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }> & {Component: NextPageWithLayout}) {

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <NextNProgress options={{showSpinner: false}}/>
        {getLayout(<Component {...pageProps}/>)}
      </ThemeProvider>
    </SessionProvider>
  )
}
