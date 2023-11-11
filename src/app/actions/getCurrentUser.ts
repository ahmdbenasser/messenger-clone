import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";

const getCurrentUser = async () => {
  try {
    const session = await getAuthSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (err: any) {
    return null;
  }
};

export default getCurrentUser;
