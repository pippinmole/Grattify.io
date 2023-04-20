import React from "react";
import {useProfile} from "../../lib/supabaseUtils";
import ProfileFor from "../../components/profile/ProfileFor";
import Layout from "../../components/layout";

export default function MyProfile() {

  // This matches the '/profile' route, so should be the locally logged in profile
  const profile = useProfile()

  return (
    <ProfileFor profile={profile}/>
  )
}

MyProfile.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>