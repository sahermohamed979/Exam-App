export interface ErrorResponse {
  status: false;
  message: string;
  code?: number;
}

export interface SuccessResponse<T> {
  status: true;
  message?: string;
  code?: number;

  payload: T;
}

export interface SuccessResponseNoPayload {
  status: true;
  message?: string;
}

export type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;

export interface IDocumentFields {
  createdAt: string;
  updatedAt: string;
}

export interface IPaginationResponse<T> {
  data: T[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
export interface IUploadImageResponse {
  url: string;
}
export interface Iimmutable{
  message?: string;
}