// "use server";

// import { revalidatePath } from "next/cache";

// import { db } from "@/lib/db";
// import { createSafeAction } from "@/lib/create-safe-action";

// import { InputType, ReturnType } from "./input-types";
// import { CreateAppointmentSchema } from "./schema";

// const handler = async (data: InputType): Promise<ReturnType> => {
//   const { userId, orgId } = auth();

//   if (!userId || !orgId)
//     return {
//       error: "Unauthorized",
//     };

//   const { userdId, time } = data;

//   let appointment;

//   try {
//     appointment = await db.appointment.create({
//       data: {
//         userId,
//         time,
//       },
//     });

//     revalidatePath("/my-appointments");
//     return { data: appointment };
//   } catch (error) {
//     return {
//       error: "Database Internal Error",
//     };
//   }
// };

// export const createAppointment = createSafeAction(
//   CreateAppointmentSchema,
//   handler
// );
