import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/utils/connect";
import { pusherServer } from "@/utils/pusher";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { message, conversationId, image } = body;

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversationId: conversationId,
        senderId: currentUser.id,
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: { id: newMessage.id },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    await pusherServer.trigger(
      conversationId,
      "messages:new",
      newMessage
    );
    const lastMessage =
      updatedConversation.messages[
        updatedConversation.messages.length - 1
      ];

    /* we want to iterate or all of the users in the group chat and send and
      update the conversation for each and every one of them great so let's go
    */
    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });
    return NextResponse.json(newMessage);
  } catch (err: any) {
    console.log("MESSAGE_POST_ERROR", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
