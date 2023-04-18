import React, {ReactNode} from "react";
import Layout from "../../../components/layout";
import SettingsLayout from "../../../components/settings/SettingsLayout";

export default function NotificationsSettings() {
  return (
    <>
      <h1 className="text-2xl">
        Notifications
      </h1>

      <hr className="h-px mt-2 mb-4 bg-gray-200 border-0 dark:bg-gray-700"/>

      <h1>Do</h1>
    </>
  )
}

NotificationsSettings.getLayout = function getLayout(page: ReactNode) {
  return (
    <Layout>
      <SettingsLayout>
        {page}
      </SettingsLayout>
    </Layout>
  )
}