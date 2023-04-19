import "./styles.css"

import type { AppProps } from "next/app"
import {ThemeProvider} from "next-themes";
import {NextPage} from "next";
import React, {ReactElement, ReactNode, useEffect, useState} from "react";
import NextNProgress from 'nextjs-progressbar';
import {createBrowserSupabaseClient} from "@supabase/auth-helpers-nextjs";
import {SessionContextProvider, Session, useUser} from "@supabase/auth-helpers-react";
import {ToastContainer} from "react-toast";
import {Analytics} from "@vercel/analytics/react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export default function App({
  Component,
  pageProps: { initialSession, ...pageProps },
}: AppProps<{
  initialSession: Session
}> & {Component: NextPageWithLayout}) {

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  const user = useUser();

  useEffect(() => {
    console.log("User is now: ", user)
  }, [user])

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={initialSession}
    >
      <ThemeProvider attribute="class">
        <ToastContainer position="top-right"/>
        <NextNProgress options={{showSpinner: false}}/>

        {getLayout(<Component {...pageProps}/>)}

        <Analytics />
      </ThemeProvider>
    </SessionContextProvider>
  )
}
