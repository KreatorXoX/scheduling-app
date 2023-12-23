import { cache } from "react";

import { Prisma } from "@prisma/client";

import { db } from "./db";

export const getAppointments = cache(
  async (query?: Prisma.AppointmentFindManyArgs) => {
    try {
      const userAppointments = await db.appointment.findMany(query);
      return userAppointments;
    } catch (error) {
      console.log(error);
    }
  }
);
