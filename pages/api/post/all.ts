import {NextApiRequest, NextApiResponse} from "next";
import Post from "../../../models/post";
import dbConnect from "../../../lib/mongoose";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();

    const result = await Post.find().lean()

    res.send(JSON.stringify(result, null, 2))
}