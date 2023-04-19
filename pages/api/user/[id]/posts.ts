import {NextApiRequest, NextApiResponse} from "next";
import {supabase} from "../../../../lib/supabaseClient";

async function getPostsByUserId(userId: string) {
    const {data} = await supabase
      .from('posts')
      .select('*')
      .eq('author', userId)
      .order('created_at', {ascending: false});

    return data
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const { query, method } = req;

    // await new Promise((resolve) => setTimeout(resolve, 5000));

    switch (method) {
        case "GET":
            if (!query.id) {
                res.status(400).json({error: "Missing user id"});
                return;
            }

            try {
                const posts = await getPostsByUserId(query.id as string);
                res.status(200).json(posts);
            } catch (error) {
                res.status(500).json({error: error});
            }
            break;

        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}