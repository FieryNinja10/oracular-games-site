import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import z from "zod";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcrypt";

import { env } from "@/lib";

import db from "@/db";
import { users } from "@/db/schema/next-auth";
import { eq } from "drizzle-orm";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string; token: string } },
) => {
  const { userId, token } = params;

  const user = await db.select().from(users).where(eq(users.id, userId));
  const oldUser = user[0];

  if (!oldUser)
    return NextResponse.json({
      error: "User does not exist",
    });

  const secret: string = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    return NextResponse.json({
      verified: true,
      verify: verify,
    });
  } catch (error) {
    return NextResponse.json({
      verified: false,
    });
  }
};

export const POST = async (
  req: Request,
  { params }: { params: { userId: string; token: string } },
) => {
  const ResetPasswordSchema = z.object({
    password: z.string().min(6, "Password should be at least 6 characters"),
  });

  const { userId, token } = params;
  const data = await req.json();

  // validation
  const result = ResetPasswordSchema.safeParse(data);

  if (!result.success) {
    const message = fromZodError(result.error, {
      prefix: "",
      prefixSeparator: "",
    });
    return NextResponse.json({ error: message });
  }

  const user = await db.select().from(users).where(eq(users.id, userId));
  const oldUser = user[0];

  if (!oldUser)
    return NextResponse.json({
      error: "User does not exist",
    });

  const { password } = result.data;

  const secret: string = env.JWT_SECRET + oldUser.password;

  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await db
      .update(users)
      .set({ password: encryptedPassword })
      .where(eq(users.id, userId));

    return NextResponse.json({
      message: "Password successfully reset",
      user: updatedUser,
      verify,
    });
  } catch (error) {
    return NextResponse.json({
      error: `${error}`,
    });
  }
};
