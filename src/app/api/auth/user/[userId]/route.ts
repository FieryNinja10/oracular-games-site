import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  const userId = params.userId;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId
      }
    });

    return NextResponse.json({
      user: user,
      profile: profile
    });
  } catch (e) {
    return NextResponse.json({
      error: `${e}`
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  const userId = params.userId;

  try {
    const profile = await prisma.profile.delete({
      where: {
        userId: userId
      }
    });

    const user = await prisma.user.delete({
      where: {
        id: userId
      }
    });

    return NextResponse.json({
      user: user,
      profile: profile
    });
  } catch (e) {
    return NextResponse.json({
      error: `${e}`
    });
  }
};
