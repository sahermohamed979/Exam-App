import { USER_role } from "../constant/user.constant";
export type UserRole = (typeof USER_role)[keyof typeof USER_role];

export interface UserType {

    id: string;
    username: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    role: UserRole;
  
}
