import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/utils/pusher";
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { userId, isGroup, members, name } = body;

    const currentUser = await getCurrentUser();

    if (!currentUser?.email || !currentUser.id) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      newConversation.users.forEach(async (user) => {
        if (user.email) {
          await pusherServer.trigger(
            user.email,
            "conversation:new",
            newConversation
          );
        }
      });

      return NextResponse.json(newConversation);
    }

    if (!userId) {
      return new NextResponse("Invalid user id", { status: 401 });
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    newConversation.users.forEach(async (user) => {
      if (user.email) {
        await pusherServer.trigger(
          user.email,
          "conversation:new",
          newConversation
        );
      }
    });

    return NextResponse.json(newConversation);
  } catch (err: any) {
    return new NextResponse("Internal error", { status: 500 });
  }
};
