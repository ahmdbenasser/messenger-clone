import prisma from "@/utils/connect";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      return null;
    }
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (err: any) {
    return null;
  }
};

export default getConversationById;
