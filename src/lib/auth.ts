import { prisma, randomString } from "@/lib";
import * as bcrypt from "bcrypt";

import { UserType, UserOptionType, UserDataType } from "@/types";

export const register = async (user: UserDataType) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const finalData: UserDataType = {
    email: user.email,
    password: hashedPassword,
    name: user.name,
    gamerTag: user.gamerTag,
    tag: randomString(6),
    region: user.region,
    age: user.age
  };

  const userData: UserType | null = await prisma.user.create({
    data: finalData
  });
  if (userData === null) return { data: null, error: "An error occurred" };
  else return { data: userData, error: null };
};

export const signIn = async (
  email: UserDataType["email"],
  password: UserDataType["password"]
) => {
  const user: {
    id: string;
    email: string;
    password: string;
  } | null = await prisma.user.findUnique({
    where: {
      email: email
    },
    select: {
      id: true,
      email: true,
      password: true
    }
  });
  if (user === null) return { id: null, error: "Email not found" };

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return { id: null, error: "Password incorrect" };
  else return { id: user.id, error: null };
};

export const getUserInfo = async (id: UserType["id"]) => {
  const user: UserType | null = await prisma.user.findUnique({
    where: {
      id: id
    }
  });
  return { data: user, error: user === null ? "User not found" : null };
};

export const updateUserInfo = async (
  session: string,
  newData: UserOptionType
) => {
  let user: UserType;
  try {
    user = await prisma.user.update({
      where: { id: session },
      data: newData
    });
  } catch (err) {
    return { data: null, error: "Something went wrong" };
  }
  return { data: user, error: null };
};
