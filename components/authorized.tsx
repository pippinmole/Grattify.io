import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSessionContext} from "@supabase/auth-helpers-react";

export default function Authorized({children}: { children: React.ReactNode}) {

  const router = useRouter()
  const { isLoading, session, error } = useSessionContext();
  const {isReady} = router

  useEffect(() => {
    if(!isReady || isLoading) {
      return
    }

    if(!session) {
      router.replace("/")
    }
  }, [isReady, session, isLoading])

  return (
    <>
      {children}
    </>
  )
}