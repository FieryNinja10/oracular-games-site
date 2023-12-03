import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { z } from "zod";
import bcrypt from "bcrypt";

import db from "@/db";
import { users } from "@/db/schema/next-auth";
import { eq } from "drizzle-orm";

const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password should be at least 6 characters")
});

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password"
        }
      },
      async authorize(credentials, req) {
        // Get credentials inputted by user
        const result = UserLoginSchema.safeParse(credentials);

        if (!result.success) return null;

        const { email, password } = result.data;

        // Find user by email
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email));
        if (!user[0]) return null;

        // Check if password is correct
        const isPassword = await bcrypt.compare(password, user[0].password);
        if (!isPassword) return null;

        return user[0];
      }
    })
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.email = user.email;
        token.username = (user as any).username;
      }

      return token;
    }
  },
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.JWT_SECRET
});
