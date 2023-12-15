import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bycrypt from "bcrypt";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { Session, User } from "next-auth/types";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider,
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(inComingCredentials, req) {
        if (!inComingCredentials?.email || !inComingCredentials?.password) {
          throw new Error("Invalid / Missing credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: inComingCredentials.email as string,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid / Missing credentials");
        }

        const isMatch = await bycrypt.compare(
          inComingCredentials.password as string,
          user.hashedPassword
        );

        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log("signin");
      if (!user) return false;
      return true;
    },
    async session({ session, user, token }) {
      if (token?.user) {
        session.user.id = token.user.id;
        return session;
      }
      console.log("session ", session);
      session.user.id = user.id;
      console.log("session ", session);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
