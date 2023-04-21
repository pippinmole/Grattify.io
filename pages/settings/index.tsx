import React from "react";
import Layout from "../../components/layout";
import BasicProfile from "../../components/settings/BasicProfile";
import NotificationsSettings from "../../components/settings/Notifications";
import Authorized from "../../components/authorized";

export default function Settings() {
  return (
    <div className="md:flex flex-row">
      <div className="w-full p-4 md:w-3/4 m-auto">
      <h1 className="text-2xl">
        Account
      </h1>

      <hr className="h-px mt-2 mb-4 bg-gray-200 border-0 dark:bg-gray-700"/>

      <div className="flex flex-col gap-5">
        <BasicProfile />
        <NotificationsSettings />
      </div>
      </div>
    </div>
  )
}

Settings.title = "Settings"
Settings.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout><Authorized>{page}</Authorized></Layout>
}