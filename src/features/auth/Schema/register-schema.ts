import { z } from "zod";

export const restPassowrdScema = z
  .object({
    password: z
      .string({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must include at least one special character",
      ),
    confirmPassword: z.string({ message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .strict();

export const registerBodySchema = z
  .object({
    username: z
      .string({ message: "Username is required" })
      .min(2, "Username must be at least 2 characters")
      .max(50, "Username must be at most 50 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ),
    email: z
      .string({ message: "Email is required" })
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address"),
    password: z
      .string({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must include at least one special character",
      ),
    confirmPassword: z.string({ message: "Please confirm your password" }),
    firstName: z
      .string({ message: "First name is required" })
      .min(1)
      .max(100, "First name is too long"),
    lastName: z
      .string({ message: "Last name is required" })
      .min(1)
      .max(100, "Last name is too long"),
    phone: z
      .string()
      .regex(
        /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/,
        "Please enter a valid Egyptian mobile number (e.g. 01551234567)",
      )
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .strict();
