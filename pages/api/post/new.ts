import {NextApiRequest, NextApiResponse} from "next";
import Post from "../../../models/post";
import dbConnect from "../../../lib/mongoose";
import {getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();

    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const user = session.user
    const {content} = req.body

    const post = await Post.create({
        content: content,
        author: user.id
    })

    console.log("Created new post: " + JSON.stringify(post))

    res.send(JSON.stringify(post, null, 2))
}