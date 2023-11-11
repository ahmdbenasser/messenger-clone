import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/utils/connect";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Missed Info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(createdUser);
  } catch (err: any) {
    console.log(err, "REGISTRATION_ERROR");
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};
