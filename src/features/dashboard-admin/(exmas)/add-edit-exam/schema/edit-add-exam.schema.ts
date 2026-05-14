import { z } from "zod";

export const AddExamSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  diplomaId: z
    .string()
    .min(1, "Diploma is required")
    .refine((value) => value !== "", {
      message: "Diploma is required",
    }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  duration: z.coerce
    .number({ message: "Duration must be a number" })
    .int("Duration must be a whole number")
    .min(1, "Duration is required"),
  image: z.string().min(1, "Image is required"),
});

export type AddExamInput = z.infer<typeof AddExamSchema>;

