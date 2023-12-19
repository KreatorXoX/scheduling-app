import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export const { handlers, auth, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      profile(profile) {
        return {
          email: profile.email,
          image: profile.picture,
          id: profile.sub,
          role: "Google User",
          name: profile.name,
          emailVerified: profile.email_verified,
        };
      },
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid / Missing credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid / Missing credentials");
        }

        const isMatch = await bcrypt.compare(
          credentials.password as string,
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
    async signIn({ user, profile }) {
      if (user) {
        return true;
      } else {
        return false;
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});
