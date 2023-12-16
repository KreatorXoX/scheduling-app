"use server";
import { signOut } from "@/config/auth";
export const signOutUser = async () => {
  await signOut({ redirectTo: "/" });
};
