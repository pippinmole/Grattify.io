import {NextApiRequest, NextApiResponse} from "next";
import Post from "../../../models/post";
import dbConnect from "../../../lib/mongoose";
import User from "../../../models/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();

    const x = await User.find()
    const result = await Post.find().populate('author').lean()

    console.log(result)

    res.send(JSON.stringify(result, null, 2))
}