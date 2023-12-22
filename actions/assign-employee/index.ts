"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./input-types";
import { AssignEmployeeSchema } from "./schema";
import { auth } from "@/config/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || session?.user.role !== "admin")
    return {
      error: "Unauthorized",
    };

  const { employeeId, appointmentId } = data;

  let appointment;

  try {
    appointment = await db.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        employeeId: employeeId,
        isApproved: true,
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

export const assignAppointment = createSafeAction(
  AssignEmployeeSchema,
  handler
);
