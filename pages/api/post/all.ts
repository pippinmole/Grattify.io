import {NextApiRequest, NextApiResponse} from "next";
import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({req, res})
    // Check if we have a session
    const {
        data: {session},
    } = await supabase.auth.getSession()

    const response = await supabase
      .from('posts')
      .select('*')
      .order('created_at', {ascending: false});

    res.status(200).send(response)
}