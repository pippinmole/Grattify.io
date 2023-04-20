import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSession} from "@supabase/auth-helpers-react";

export default function Authorized({children}: { children: React.ReactNode}) {

  const router = useRouter()
  const session = useSession()
  const {isReady} = router

  useEffect(() => {
    if(!isReady) return

    if(!session) {
      router.replace("/")
    }
  }, [isReady, session])

  return (
    <>
      {children}
    </>
  )
}