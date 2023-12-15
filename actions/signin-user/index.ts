// "use server";
// import { signIn } from "next-auth/react";

// import { createSafeAction } from "@/lib/create-safe-action";

// import { InputType, ReturnType } from "./input-types";
// import { SignInUserSchema } from "./schema";

// const handler = async (data: InputType): Promise<ReturnType> => {
//   const { email, password } = data;

//   let user;
//   try {
//     // user = await db.user.create({
//     //   data: {
//     //     name,
//     //     hashedPassword,
//     //     email,
//     //   },
//     //   select: {
//     //     id: true,
//     //     name: true,
//     //     email: true,
//     //     emailVerified: true,
//     //     image: true,
//     //   },
//     // });
//     signIn("credentials", {
//       ...data,
//       redirect: false,
//     });

//     console.log(user);

//     return { data: user };
//   } catch (error) {
//     console.log(error);
//     return {
//       error: "Database Internal Error while signing in user",
//     };
//   }
// };

// export const signInUser = createSafeAction(SignInUserSchema, handler);
