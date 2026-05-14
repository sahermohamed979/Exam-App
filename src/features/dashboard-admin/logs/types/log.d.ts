export interface Ilogs {
  id: string;
  createdAt: string;
  actorUserId: string;
  actorUsername: string;
  actorEmail: string;
  actorRole: string;
  category: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Metadata;
  ipAddress: string;
  userAgent: string;
  httpMethod: string;
  path: string;
}
export interface IdeleteLogs {
  deletedCount: number;
}

export interface log<T> {
  auditLog: T;
}

export interface IUsers {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: null;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

