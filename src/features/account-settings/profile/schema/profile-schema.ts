import { emailSchema } from "@/src/features/auth/Schema/verfiy-email--schema";
import { z } from "zod";

export const checkVerificationCodeSchema = z
  .object({
    code: z
      .string({ message: "Verification code is required" })
      .length(6, "Verification code must be exactly 6 digits"),
  })
  .strict();
export const changeNewEmailSchema = z
  .object({
    newEmail: emailSchema,
  })
  .strict();

export const accountProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .regex(
      /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/,
      "Please enter a valid Egyptian mobile number (e.g. 01551234567)",
    )
    .optional()
    .or(z.literal("")),
  profilePhoto: z.string().nullable().optional(),
});

