import { cache } from "react";
import { Role } from "@prisma/client";

import { db } from "./db";

export const getAppointmentsByAllEmployees = cache(async () => {
  try {
    const employeesAppointments = await db.user.findMany({
      where: { role: Role.EMPLOYEE },
      select: {
        employeeAppointments: true,
      },
    });

    return employeesAppointments;
  } catch (error) {
    console.log(error);
  }
});
