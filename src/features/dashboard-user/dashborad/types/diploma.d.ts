import { IDocumentFields } from "@/src/shared/types/api";

export interface IDiploma extends IDocumentFields {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  immutable: boolean;
}

export interface IDiplomaWithExams<T> extends IDiploma {
  exams: T[];
}
export interface IDiplomaResponse<T> {
  diploma: IDiplomaWithExams<T>;
}