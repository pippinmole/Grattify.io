// import Header from "./header"
import Footer from "./footer"
import type { ReactNode } from "react"
import React from "react";
import Header from "./header";
import {ToastContainer} from "react-toast";

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
