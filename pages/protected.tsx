import { useState, useEffect } from "react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"
import {useSession} from "@supabase/auth-helpers-react";

export default function ProtectedPage() {
  const session = useSession()
  const [content, setContent] = useState()

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])
 

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>{content ?? "\u00a0"}</strong>
      </p>
    </Layout>
  )
}
