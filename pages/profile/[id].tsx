import {getProfileById} from "../../lib/supabaseUtils";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import React, {useEffect, useState} from "react";
import {ProfileResponse} from "../../models/types";
import ProfileFor from "../../components/profile/ProfileFor";
import Layout from "../../components/layout";
import {useRouter} from "next/router";

export default function ProfilePage() {

  const router = useRouter();
  const {id} = router.query

  const [profile, setProfile] = useState<ProfileResponse>();
  const supabaseClient = useSupabaseClient()

  useEffect(() => {
    if(!router.isReady) return

    async function getProfile() {
      console.log(id)

      if (!id) {
        router.push('/')
        return
      }

      const result = await getProfileById(supabaseClient, id as string)
      if (result) {
        setProfile(result)
      } else {
        router.push('/')
      }
    }

    getProfile()
  }, [router.isReady])

  return (
    <ProfileFor profile={profile}/>
  )
}

ProfilePage.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>