import { z } from "zod";

export const PostCreateUserRequest = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
    })
    .trim()
    .min(2, { message: "Must be from 2 to 100 characters long" })
    .max(100, { message: "Must be from 2 to 100 characters long" }),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .trim()
    .min(2, { message: "Must be from 2 to 100 characters long" })
    .max(100, { message: "Must be from 2 to 100 characters long" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .email({ message: "Invalid email" }),
});

export type PostCreateUserRequestModel = z.infer<typeof PostCreateUserRequest>;
