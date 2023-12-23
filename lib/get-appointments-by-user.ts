import { cache } from "react";

import { db } from "./db";

export const getAppointmentsByUser = cache(async (id: string) => {
  try {
    const userAppointments = await db.appointment.findMany({
      where: { userId: id },
      select: {
        date: true,
        id: true,
        isApproved: true,
      },
    });

    return userAppointments;
  } catch (error) {
    console.log(error);
  }
});
