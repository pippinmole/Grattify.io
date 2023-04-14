import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import Post from "../../../models/post";
import dbConnect from "../../../lib/mongoose";

const getAllPosts = async () => {
    const posts = await Post.find()
    return posts;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    await dbConnect();

    const session = await getServerSession(req, res, authOptions)

    const result = await getAllPosts()
    console.log(result)

    res.send(JSON.stringify(session, null, 2))
}