import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const PUT = async (req: NextRequest) => {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();
    const { name, image } = body;

    if (!currentUser) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err: any) {
    console.log(err, "SETTIGN_ERROR");
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};
