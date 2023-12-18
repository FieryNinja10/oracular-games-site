import { NextResponse } from "next/server";

import { users } from "@/db/schema/next-auth";
import { profiles } from "@/db/schema/profile";
import db from "@/db";
import { eq } from "drizzle-orm";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } },
) => {
  const userId = params.userId;

  try {
    const user = await db.select().from(users).where(eq(users.id, userId));

    const profile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, userId));

    return NextResponse.json({
      user: user[0],
      profile: profile[0],
    });
  } catch (e) {
    return NextResponse.json({
      error: `${e}`,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { userId: string } },
) => {
  const userId = params.userId;

  try {
    // const profile = await prisma.profile.delete({
    //   where: {
    //     userId: userId
    //   }
    // });

    const profile = await db
      .delete(profiles)
      .where(eq(profiles.userId, userId))
      .returning();

    const user = await db.delete(users).where(eq(users.id, userId)).returning();

    return NextResponse.json({
      user: user,
      profile: profile,
    });
  } catch (e) {
    return NextResponse.json({
      error: `${e}`,
    });
  }
};
