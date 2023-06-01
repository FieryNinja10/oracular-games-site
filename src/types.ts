import { Prisma, User } from "@prisma/client";

export type UserDataType = Prisma.UserCreateInput;
export type UserType = User;
export type UserOptionType = {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
  gamerTag?: string;
  tag?: string;
  region?: string;
  age?: string | Date;
};
