import React, {ReactNode} from "react";
import Layout from "../../../components/layout";
import SettingsLayout from "../../../components/settings/SettingsLayout";

export default function AccountSettings() {
  return (
    <>
      <h1 className="text-2xl">
        Account
      </h1>

      <hr className="h-px mt-2 mb-4 bg-gray-200 border-0 dark:bg-gray-700"/>

      <h1>Do</h1>
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