import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import z from "zod";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcrypt";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string; token: string } }
) => {
  const { userId, token } = params;

  const oldUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!oldUser)
    return NextResponse.json({
      error: "User does not exist"
    });

  const secret: string = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    return NextResponse.json({
      verified: true,
      verify: verify
    });
  } catch (error) {
    return NextResponse.json({
      verified: false
    });
  }
};

export const POST = async (
  req: Request,
  { params }: { params: { userId: string; token: string } }
) => {
  const ResetPasswordSchema = z.object({
    password: z.string().min(6, "Password should be at least 6 characters")
  });

  const { userId, token } = params;
  const data = await req.json();

  // validation
  const result = ResetPasswordSchema.safeParse(data);

  if (!result.success) {
    const message = fromZodError(result.error, {
      prefix: "",
      prefixSeparator: ""
    });
    return NextResponse.json({ error: message });
  }

  const oldUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!oldUser)
    return NextResponse.json({
      error: "User does not exist"
    });

  const { password } = result.data;

  const secret: string = process.env.JWT_SECRET + oldUser.password;

  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password: encryptedPassword
      }
    });

    return NextResponse.json({
      message: "Password successfully reset",
      user: updatedUser,
      verify
    });
  } catch (error) {
    return NextResponse.json({
      error: `${error}`
    });
  }
};
