import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fromZodError } from "zod-validation-error";
import { UserRegisterSchema } from "@/types";
import bcrypt from "bcrypt";
import z from "zod";

export const POST = async (req: Request) => {
  const data = await req.json();
  // check for zod errors
  const UserRegisterReqSchema = UserRegisterSchema.merge(
    z.object({
      birthday: z
        .string({ required_error: "Birthday is required" })
        .datetime({ offset: true })
    })
  );

  const result = UserRegisterReqSchema.safeParse(data);

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

  const { email, password, username, birthday, newsletter } = result.data;

  // check if user exists

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (user !== null)
    return NextResponse.json({
      user: null,
      profile: null,
      message: "Error: User already exists"
    });

  // hash password and create user

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username
    }
  });

  const newProfile = await prisma.profile.create({
    data: {
      userId: newUser.id,
      birthday: new Date(birthday),
      newsletter: newsletter === undefined ? false : newsletter
    }
  });

  return NextResponse.json({
    user: newUser,
    profile: newProfile,
    message: "User successfully created"
  });
};
