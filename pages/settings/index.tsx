import {useRouter} from "next/router";
import React from "react";
import Layout from "../../components/layout";

export default function Settings() {
  const router = useRouter()
  router.replace('/settings/account')
}

Settings.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>
}