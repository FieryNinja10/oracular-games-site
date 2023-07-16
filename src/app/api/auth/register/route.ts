import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { fromZodError } from "zod-validation-error";
import { UserRegisterSchema } from "@/types";
import bcrypt from "bcrypt";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  // check for zod errors

  const result = UserRegisterSchema.safeParse(req.body);

  if (!result.success) {
    const message = fromZodError(result.error, {
      prefix: "",
      prefixSeparator: ""
    });

    return res.send({
      user: null,
      profile: null,
      success: false,
      message: message.message
    });
  }

  const { email, password, username, birthday, newsletter } = result.data;

  // check if user exists

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (user === null)
    return res.send({
      user: null,
      profile: null,
      success: false,
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
      birthday,
      newsletter: newsletter === undefined ? false : newsletter
    }
  });

  return res.send({
    user: newUser,
    profile: newProfile,
    success: true,
    message: "User successfully created"
  });
};
