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
import siteMetadata from "../data/siteMetadata";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode,
  title?: string
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
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>

          <title>{Component.title} | {siteMetadata.headerTitle}</title>
        </Head>

        {getLayout(<Component {...pageProps}/>)}

        <Analytics />
      </ThemeProvider>
    </SessionContextProvider>
  )
}
