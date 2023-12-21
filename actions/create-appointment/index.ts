"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./input-types";
import { CreateAppointmentSchema } from "./schema";
import { auth } from "@/config/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return {
      error: "Unauthorized",
    };

  const { time } = data;

  let appointment;

  try {
    appointment = await db.appointment.create({
      data: {
        userId,
        date: time,
      },
    });
  } catch (error) {
    return {
      error: "Database Internal Error",
    };
  }
  revalidatePath("/my-appointments");
  return { data: appointment };
};

export const createAppointment = createSafeAction(
  CreateAppointmentSchema,
  handler
);
