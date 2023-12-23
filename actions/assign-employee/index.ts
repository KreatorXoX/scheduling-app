"use server";

import { revalidatePath } from "next/cache";

import { Role } from "@prisma/client";

import { auth } from "@/config/auth";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./input-types";
import { AssignEmployeeSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || session?.user.role !== Role.ADMIN)
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
  revalidatePath("/waiting-appointments");
  return { data: appointment };
};

export const assignAppointment = createSafeAction(
  AssignEmployeeSchema,
  handler
);
