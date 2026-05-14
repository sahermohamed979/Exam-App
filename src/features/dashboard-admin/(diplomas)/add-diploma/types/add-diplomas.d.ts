import { uploadSchema } from "../schema/add-diplomas-schema";

export type IUploadData = z.infer<typeof uploadSchema>;
