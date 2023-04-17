import React from "react";
import Layout from "../components/layout";
import {useSession} from "next-auth/react";
import AccessDenied from "../components/access-denied";

export default function Profile() {
    const { data: session } = useSession()

    // If no session exists, display access denied message
    if (!session) {
        return (
            <Layout>
                <AccessDenied />
            </Layout>
        )
    }

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-center">
                {session.user.name}
            </h1>
        </Layout>
    )
}