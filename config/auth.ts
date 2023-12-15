import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bycrypt from "bcrypt";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider,
    CredentialsProvider({
      name: "Credentials",
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
        console.log(isMatch);

        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
    async jwt({ token, user, session, account }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
  },
});
