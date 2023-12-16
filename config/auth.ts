import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const { handlers, auth, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [GoogleProvider],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;

      return session;
    },
  },
});
