import React, {ReactNode} from "react";
import Layout from "../../../components/layout";
import SettingsLayout from "../../../components/settings/SettingsLayout";
import BasicProfile from "../../../components/settings/BasicProfile";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {getProfile, useProfile} from "../../../lib/supabaseUtils";
import {Database} from "../../../models/schema";

export default function AccountSettings() {

  const session = useSession();
  const profile = useProfile()

  return (
    <>
      <h1 className="text-2xl">
        Account
      </h1>

      <hr className="h-px mt-2 mb-4 bg-gray-200 border-0 dark:bg-gray-700"/>

      <div>
        <BasicProfile />
      </div>
    </>
  )
}

AccountSettings.getLayout = function getLayout(page: ReactNode) {
  return (
    <Layout>
      <SettingsLayout>
        {page}
      </SettingsLayout>
    </Layout>
  )
}