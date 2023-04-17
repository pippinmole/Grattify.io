import {NextApiRequest, NextApiResponse} from "next";
import User from "../../../models/user";
import Post from "../../../models/post";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    // await User.create({name: "test", email: "", image: ""})
    // await Post.create({title: "test", content: "test", author: "60b1f1b0b0c1c8a0c0e1c0c2"})

    // console.log("1")
    // await User.create({name: "test", email: "", image: ""})
    // console.log("2")
    // // await TestUser.create({name: "test", email: "", image: ""})
    // console.log("3")

    await User.find().lean() // TODO: Figure out why I need to import and use User here
    const results = await Post.find().populate("author").lean()

    res.status(200).json(results);
}