import { z } from "zod";
import { LoginFormSchema } from "../Schema/login-schema";
import {
  registerBodySchema,
  restPassowrdScema,
} from "../Schema/register-schema";
import {
  sendEmailVerificationBodySchema,
  verifyOtpBodySchema,
} from "../Schema/verfiy-email--schema";
import { UserType } from "./user";
import { accountProfileSchema } from "../../account-settings/profile/schema/profile-schema";

export interface IloginResponse {
  user: UserType;
  token: string;
}
export type LoginField = z.infer<typeof LoginFormSchema>;
export type RegisterField = z.infer<typeof registerBodySchema>;
export type VerifyOtpField = z.infer<typeof verifyOtpBodySchema>;
export type VerifyEmailField = z.infer<typeof sendEmailVerificationBodySchema>;
export type ResetPassowrdField = z.infer<typeof restPassowrdScema>;
export type ChangeNewEmailField = z.infer<typeof changeNewEmailSchema>;
export type checkVerificationCodeField = z.infer<typeof checkVerificationCodeSchema>;
export type AccountProfileField = z.infer<typeof accountProfileSchema>;


export interface IsendEmailVerificationResponse {
  message: string;
  code: string;
}

export interface IforgetPasswordResponse {
  message: string;
}
