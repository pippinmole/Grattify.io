import {NextApiRequest, NextApiResponse} from "next";
import {supabase} from "../../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const {email, password} = req.body;

  const {data} = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  const session = data.session;
  const user = data.user;

  console.log("Signed in?", session, user);

  res.status(200).json({session, user});
}