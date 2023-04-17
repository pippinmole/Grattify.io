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
        res.status(401).json({error: "Unauthorized"});
        return;
    }

    const user = session.user
    const {title, content} = req.body

    Post.create({
        title: title,
        content: content,
        author: user.id
    })
        .then(r => res.status(200).json(r))
        .catch(err => res.status(500).json(err))
}