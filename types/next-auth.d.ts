// auth.ts
import NextAuth, { type DefaultSession, User } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "@auth/core/jwt";

declare module "@auth/core/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
    role: string;
  }
}
