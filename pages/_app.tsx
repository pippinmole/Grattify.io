import "./styles.css"

import type { AppProps } from "next/app"
import {ThemeProvider} from "next-themes";
import {NextPage} from "next";
import React, {ReactElement, ReactNode, useState} from "react";
import NextNProgress from 'nextjs-progressbar';
import {createBrowserSupabaseClient} from "@supabase/auth-helpers-nextjs";
import {SessionContextProvider, Session} from "@supabase/auth-helpers-react";
import {ToastContainer} from "react-toast";
import {Analytics} from "@vercel/analytics/react";
import Head from "next/head";

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

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={initialSession}
    >
      <ThemeProvider attribute="class">
        <ToastContainer position="top-right" delay={5000}/>
        <NextNProgress options={{showSpinner: false}}/>

        <Head>
          <meta name="viewport" content="width=device-width, user-scalable=yes"/>
        </Head>

        {getLayout(<Component {...pageProps}/>)}

        <Analytics />
      </ThemeProvider>
    </SessionContextProvider>
  )
}
