// import Header from "./header"
import type { ReactNode } from "react"
import React from "react";
import Header from "./header";
import {ToastContainer} from "react-toast";
import Footer from "./footer";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header/>

            <div className={"mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 mt-10"}>
                <main>{children}</main>
                <Footer/>
            </div>

            <ToastContainer position="top-right" />
        </>
    )
}
