import dbConnect from "../../../../lib/mongoose";
import Post, {IPost} from "../../../../models/post";
import {NextApiRequest, NextApiResponse} from "next";
import User from "../../../../models/user";

async function getPostsByUserId(userId: string): Promise<IPost[]> {
    await dbConnect();

    // const result = Post.find({}).populate('author');
    // console.log("Start")
    // result.lean().then(x=>console.log(x));
    //
    // console.log("End")
    // return result.lean();

    const x = await User.find();
    const result = Post.find({ author: userId }).populate('author')

    return result.lean();
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