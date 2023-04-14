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

    const post = new Post({
        title: "Test Title",
        content: "Test Description",
        author: "6439d26832166e3a85cb763e"
    })

    console.log("Creating new post: " + JSON.stringify(post))

    await post.save()

    res.send(JSON.stringify(post, null, 2))
}