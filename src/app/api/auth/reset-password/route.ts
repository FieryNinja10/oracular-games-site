import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import z from "zod";
import { fromZodError } from "zod-validation-error";

import { env } from "@/lib";

import db from "@/db";
import { users } from "@/db/schema/next-auth";
import { eq } from "drizzle-orm";

export const POST = async (req: Request) => {
  const userResetSchema = z.object({
    email: z.string().email(),
  });
  const data = await req.json();

  // validate data
  const result = userResetSchema.safeParse(data);
  if (!result.success) {
    const message = fromZodError(result.error, {
      prefix: "",
      prefixSeparator: "",
    });
    return NextResponse.json({
      user: null,
      profile: null,
      error: message.message,
    });
  }

  const { email } = result.data;

  try {
    const user = await db.select().from(users).where(eq(users.email, email));
    const oldUser = user[0];
    if (!oldUser) return NextResponse.json({ error: "User does not exist" });

    const secret: string = env.JWT_SECRET + oldUser.password;
    const token = jwt.sign(
      { email: oldUser.email, password: oldUser.password },
      secret,
      {
        expiresIn: "10m",
      },
    );

    const link = `${env.NEXTAUTH_URL}/reset-password/${oldUser.id}/${token}`;
    console.log(link);

    return NextResponse.json({
      message: "Password successfully reset",
    });

    //! send link email
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  }
};
