import {NextApiRequest, NextApiResponse} from "next";
import {supabase} from "../../../lib/supabaseClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {data} = await supabase
      .from('posts')
      .select('*')
      .order('created_at', {ascending: false});

    res.send(data)
}