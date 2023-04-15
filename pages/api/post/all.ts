import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import Post from "../../../models/post";
import dbConnect from "../../../lib/mongoose";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    await dbConnect();

    const session = await getServerSession(req, res, authOptions)

    const result = await Post.find().populate('author')

    res.send(JSON.stringify(result, null, 2))
}