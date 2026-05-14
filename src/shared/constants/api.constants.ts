export const HEADERS = {
  jsonBody: {
    "Content-Type": "application/json",
  },
  authorization: (token: string) => ({
    Authorization: `Bearer ${token}`,
  }),
};

export const DEFAULT_PAGINATION = 6;

export const LOGS_PER_PAGE = 20;

export const DIPLOMAS_PER_PAGE = 12;
export const DEFAULT_FILTERS = {
  search: "",
  immutable: undefined,
  sortBy: "createdAt",
  sortOrder: "desc",
};
export const DEFAULT_EXAMS_FILTERS = {
  search: "",
  immutable: undefined,
  sortBy: "createdAt",
  sortOrder: "desc",
  diplomaId: undefined,
};
export const DEFAULT_USER_LOGS_FILTERS = {
  category: "",
  action: "",
  actorUserId: "",
  sortBy: "createdAt",
  sortOrder: "",
};
