import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     EmailProvider({
//       server: process.env.EMAIL_SERVER,
//       from: process.env.EMAIL_FROM
//     })
//   ]
// });

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password"
        }
      },
      async authorize(credentials, req) {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          })
        });

        const user = await res.json;

        if (user) return user;
        else return null;
      }
    })
  ]
});

export { handler as GET, handler as POST };
