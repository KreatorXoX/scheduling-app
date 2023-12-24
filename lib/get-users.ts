import { cache } from "react";

import { Prisma } from "@prisma/client";

import { db } from "./db";

export const getUsers = cache(async (query?: Prisma.UserFindManyArgs) => {
  try {
    const user = await db.user.findMany(query);

    return user;
  } catch (error) {
    console.log(error);
  }
});
