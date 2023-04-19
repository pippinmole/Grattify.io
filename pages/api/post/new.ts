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

    if (!session) {
        res.status(401).json({error: "Unauthorized"});
        return;
    }

    const user = session.user
    const {title, content} = req.body

    const {data} = await supabase
      .from('posts')
      .insert({
          title: "This is a title",
          content: "This is content",
          images: [],
          author: user.id
      })
      .select()
      .maybeSingle()
      .throwOnError();

    console.log("Created post with user id of " + user.id)

    res.status(200).json(data)

    // Post.create({
    //     title: title,
    //     content: content,
    //     author: user.id
    // })
    //     .then(r => res.status(200).json(r))
    //     .catch(err => res.status(500).json(err))
}