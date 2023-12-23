"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

import { Role } from "@prisma/client";

import { auth } from "@/config/auth";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./input-types";
import { CreateUserSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  const userId = session?.user?.id;
  const isAdmin = session?.user.role === Role.ADMIN;

  if (!userId && !isAdmin)
    return {
      error: "Unauthorized",
    };

  const { name, email, password, role } = data;

  let user;

  try {
    const userExists = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });

    if (userExists) {
      return {
        error: "User email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role,
      },
    });
  } catch (error) {
    return {
      error: "Database Internal Error",
    };
  }

  revalidatePath("/employee-list");
  return { data: user };
};

export const createUser = createSafeAction(CreateUserSchema, handler);
