"use server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./input-types";
import { RegisterUserSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { email, name, password } = data;

  const hashedPassword = await bcrypt.hash(password, 12);

  let user;
  try {
    user = await db.user.create({
      data: {
        name,
        hashedPassword,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
      },
    });

    return { data: user };
  } catch (error) {
    return {
      error: "Database Internal Error while creating user",
    };
  }
};

export const registerUser = createSafeAction(RegisterUserSchema, handler);
