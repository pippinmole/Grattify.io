import React from "react";
import Layout from "../../components/layout";

export default function Settings() {
  return <></>
}

export async function getServerSideProps(context: any) {
  return {
    redirect: {
      destination: '/settings/account',
      permanent: true,
    },
  }
}


Settings.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>
}