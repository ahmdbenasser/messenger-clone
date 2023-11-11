import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { pusherServer } from "@/utils/pusher";
import { authOptions } from "@/utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.send(401);
  }

  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;

  console.log(req.body);
  const data = {
    user_id: session.user.email,
  };
  console.log(channel, "auth Respone");

  const authResponse = pusherServer.authorizeChannel(
    socketId,
    channel,
    data
  );

  return res.send(authResponse);
}
