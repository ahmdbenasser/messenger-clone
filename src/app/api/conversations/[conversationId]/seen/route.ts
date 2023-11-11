import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { pusherServer } from "@/utils/pusher";

type TParams = {
  conversationId?: string;
};

export const POST = async (
  req: NextRequest,
  { params }: { params: TParams }
) => {
  try {
    const { conversationId } = params;

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse("Unauthenticated", {
        status: 401,
      });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid ID", {
        status: 400,
      });
    }

    // find last message
    const lastMessage =
      conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // update seen of last message
    const updatedSeenMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      data: {
        seen: {
          connect: {
            id: currentUser?.id,
          },
        },
      },
      include: {
        sender: true,
        seen: true,
      },
    });

    /* if we already seen this message or perhaps we might be the sender of this
        message, so NO need to go further
    */
    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json("Already Seen");
    }

    /*if we did not see the last message that mean we aren't in the
      lastMessage.seenIds array
      then we can go ahead and alert every new user that we have seen that message
    */
    await pusherServer.trigger(
      conversationId!,
      "message:update",
      updatedSeenMessage
    );

    await pusherServer.trigger(
      currentUser.email!,
      "conversation:update",
      {
        id: conversationId,
        messages: [updatedSeenMessage],
      }
    );

    return NextResponse.json(updatedSeenMessage);
  } catch (err: any) {
    console.log("SEEN_CONVERATIONS_ERROR", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
