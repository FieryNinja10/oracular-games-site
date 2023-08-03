import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import z from "zod";
import { fromZodError } from "zod-validation-error";

export const POST = async (req: Request) => {
  const UserResetSchema = z.object({
    email: z.string().email()
  });

  const data = await req.json();

  // validate data
  const result = UserResetSchema.safeParse(data);
  if (!result.success) {
    const message = fromZodError(result.error, {
      prefix: "",
      prefixSeparator: ""
    });
    return NextResponse.json({
      user: null,
      profile: null,
      message: message.message
    });
  }

  const { email } = result.data;

  try {
    const oldUser = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (!oldUser) return NextResponse.json({ error: "User does not exist" });

    const secret: string = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign(
      { email: oldUser.email, password: oldUser.password },
      secret,
      {
        expiresIn: "10m"
      }
    );

    const link = `http://localhost:3000/reset-password/${oldUser.id}/${token}`;
    console.log(link);

    // send link email
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  }
};
