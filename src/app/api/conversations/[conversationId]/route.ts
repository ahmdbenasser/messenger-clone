import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { pusherServer } from "@/utils/pusher";

type TParams = {
  conversationId?: string;
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: TParams }
) => {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.email || !currentUser.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConversation =
      await prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: {
          users: true,
        },
      });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deletedConversation =
      await prisma.conversation.deleteMany({
        where: {
          id: conversationId,
          /*it's important we are going to protect that not anyone can remove
        any conversation so only users whick are part of the group can
        remove the group
        */
          userIds: {
            hasSome: [currentUser.id],
          },
        },
      });

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          existingConversation
        );
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (err: any) {
    console.log("DELETE_CONVERSATION_ERROR", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
