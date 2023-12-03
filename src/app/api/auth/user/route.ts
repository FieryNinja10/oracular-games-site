import { NextResponse } from "next/server";
import { fromZodError } from "zod-validation-error";
import { userRegisterSchema } from "@/db/types";
import bcrypt from "bcrypt";

import db from "@/db";
import { users } from "@/db/schema/next-auth";
import { profiles } from "@/db/schema/profile";
import { eq } from "drizzle-orm";

export const POST = async (req: Request) => {
  const data = await req.json();

  const result = userRegisterSchema.safeParse(data);

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

  const user = await db.select().from(users).where(eq(users.email, email));

  if (user !== null)
    return NextResponse.json({
      user: null,
      profile: null,
      message: "Error: User already exists"
    });

  // hash password and create user

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db
    .insert(users)
    .values({
      username,
      password: hashedPassword,
      email
    })
    .returning();

  if (newUser[0] === undefined)
    return NextResponse.json({
      user: null,
      profile: null,
      message: "Error: Something went wrong"
    });

  const newProfile = await db
    .insert(profiles)
    .values({
      userId: newUser[0].id,
      birthday,
      newsletter
    })
    .returning();

  if (newProfile[0] === undefined)
    return NextResponse.json({
      user: null,
      profile: null,
      message: "Error: Something went wrong"
    });

  return NextResponse.json({
    user: newUser[0],
    profile: newProfile[0],
    message: "User successfully created"
  });
};
