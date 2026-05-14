import { z } from "zod";

export const emailSchema = z
  .string({ message: "Email is required" })
  .pipe(z.email("Please enter a valid email address"));

export const sendEmailVerificationBodySchema = z
  .object({
    email: emailSchema,
    redirectUrl: z.url("Invalid URL").optional(),
  })
  .strict();


export const verifyOtpBodySchema = z
  .object({
    email: emailSchema,
    code: z
      .string({ message: "Verification code is required" })
      .length(6, "Verification code must be exactly 6 digits"),
  })
  .strict();

