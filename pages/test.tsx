import {useEffect, useState} from "react";
import {PostResponse} from "../models/types";
import {getAllPosts} from "../lib/supabaseUtils";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

export default function Test() {

  const supabaseClient = useSupabaseClient()
  const [data, setData] = useState<any>()

  useEffect(() => {
    getAllPosts(supabaseClient)
      .then(r => setData(r))
  }, [])

  return (
    <div className="container m-auto mt-5">
      {JSON.stringify(data, null, '\t')}
    </div>
  )
}