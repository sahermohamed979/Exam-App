import { DEFAULT_PAGINATION } from "@/src/shared/constants/api.constants";

export const DIPLOMA_OPTIONS = {
  list: (page: number = 1, limit: number = DEFAULT_PAGINATION) =>
    ["diploma-list", page, limit] as const,
} as const;
