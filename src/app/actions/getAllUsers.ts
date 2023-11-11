import { getAuthSession } from "@/utils/auth";

import prisma from "@/utils/connect";

const getAllUsers = async () => {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return [];
    }

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: session.user.email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (err: any) {
    return [];
  }
};

export default getAllUsers;
