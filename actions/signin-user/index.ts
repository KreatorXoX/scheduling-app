"use server";

import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./input-types";

import { signIn } from "@/config/auth";
import { SignInUserSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "http://localhost:3000/",
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Database Internal Error while signing in user",
    };
  }
  return { data: null };
};

export const signInUser = createSafeAction(SignInUserSchema, handler);
