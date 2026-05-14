import { LOGS_PER_PAGE } from "@/src/shared/constants/api.constants";

export const logs_options = {
  list: (page: number = 1, limit: number = LOGS_PER_PAGE) =>
    ["logs-list", page, limit] as const,
} as const;

export const LOGS_CATEGORY = ["Diploma", "EXAM", "QUESTION", "USER", "SYSTEM"];

export const LOGS_ACTION = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "SET_IMMUTABLE",
  "SEED_DATA",
];
