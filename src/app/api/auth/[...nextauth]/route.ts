import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@prisma/client";

const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password should be at least 6 characters")
});

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
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
        const user = await prisma.user.findUnique({
          where: { email }
        });
        if (!user) return null;

        // Check if password is correct
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) return null;

        return user;
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
        token.username = (user as User).username;
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
