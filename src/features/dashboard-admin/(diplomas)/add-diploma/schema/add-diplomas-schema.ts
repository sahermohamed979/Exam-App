import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const uploadSchema = z
  .object({
    image: z
      .file()
      .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only JPEG, PNG, GIF, and WEBP are allowed",
      ),
  })
  .strict();

export const addDiplomaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
});


export type AddDiplomaInput = z.infer<typeof addDiplomaSchema>;
