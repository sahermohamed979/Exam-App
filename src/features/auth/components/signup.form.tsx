"use client";
import { Input } from "@/src/shared/components/ui/input";
import { CircleX, Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useVerifyEmail } from "../hooks/verify-email-hook";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/shared/components/ui/input-otp";
import ProgressBar from "./progres-bar";
import { useSignup } from "../hooks/signup-hook";
import Image from "next/image";
import { useResendTimer } from "@/src/shared/components/hooks/usetimer-hook";

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const [part, setPart] = useState(2);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { remaining, start } = useResendTimer(1);

  useEffect(() => {
    if (step === 1) {
      document.getElementById("email")?.focus();
    }
    if (step === 2) {
      start();
    }
  }, [step]);
  const {
    handleSubmitEmail,
    controlEmail,
    isPendingEmail,
    onSubmitEmail,
    formStateEmail,
    otpSubmit,
    otpControl,
    resetOtp,

    otpFormState,
    isPendingOtp,
    onSubmitOtp,
  } = useVerifyEmail();
  const {
    handelRegister,
    controlRegister,
    isPendingRegister,
    onSubmitRegister,
    formStateRegister,
    triggerRegister,
    setValueRegister,
  } = useSignup();

  return (
    <div className="h-screen flex items-center justify-center  ">
      <div className="w-full  max-w-2xl flex flex-col gap-5    ">
        {/* progress bar */}
        {step > 1 && (
          <ProgressBar
            totalSteps={4}
            step={part}
            className="ms-6 max-w-[480px]"
          />
        )}
        {/* email form */}

        {step === 1 && (
          <form
            className="w-full max-w-xl px-10"
            onSubmit={handleSubmitEmail(async (emailvalues) => {
              try {
                await onSubmitEmail(emailvalues);
                setEmail(emailvalues.email);

                setStep(2);
                setPart(2);
              } catch {}
            })}
          >
            <div className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <h2 className="text-3xl font-bold text-gray-900 mb-1 font-inter">
                  Create Account
                </h2>
                <FieldGroup className="mb-2">
                  <Controller
                    name="email"
                    control={controlEmail}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2"
                      >
                        <FieldLabel
                          htmlFor="email"
                          className="font-mono text-lg text-gray-800 font-medium"
                        >
                          Email
                        </FieldLabel>

                        <Input
                          {...field}
                          id="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="user@example.com"
                          autoComplete="email"
                          className="pr-10 py-3  placeholder:text-gray-400  placeholder:font-mono"
                        />
                        {fieldState.invalid && (
                          <FieldError
                            className="text-red-500 text-sm capitalize font-mono"
                            errors={[
                              fieldState.error ?? formStateEmail.errors.form,
                            ]}
                          />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  isPendingEmail ||
                  (formStateEmail.isSubmitted && !formStateEmail.isValid)
                }
                className={`w-full cursor-pointer  ${isPendingEmail ? "opacity-75  cursor-not-allowed" : "hover:opacity-90"} gap-2 flex border border-blue-600 justify-center bg-[#eff6ff] hover:bg-[#eff6ff] text-blue-600 font-semibold py-3  text-sm transition-all duration-150`}
              >
                {isPendingEmail && <LoaderCircle className="animate-spin  " />}
                Next
              </button>

              {/* Register link */}
              <p className="text-center text-xs text-gray-500 font-mono">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        )}

        {/* verify email */}
        {step === 2 && (
          <form
            className="w-full max-w-xl px-10"
            onSubmit={otpSubmit(async (otpvalues) => {
              try {
                await onSubmitOtp({ ...otpvalues, email });
                setValueRegister("email", email);

                setStep(3);
                setPart(3);
                resetOtp();
              } catch {}
            })}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-inter">
              Create Account
            </h2>

            <div className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <FieldGroup className="mb-2">
                  <Controller
                    name="code"
                    control={otpControl}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2 flex-col"
                      >
                        <FieldLabel
                          htmlFor="code"
                          className="text-blue-600 font-inter text-2xl font-bold"
                        >
                          {" "}
                          Verify OTP
                        </FieldLabel>
                        <p className="text-gray-500 font-mono text-[16px] font-medium">
                          Please enter the 6-digits code we have sent to:{" "}
                          <span className="flex items-center gap-2">
                            <span className="font-mono font-normal  text-black">
                              {email}
                            </span>
                            <button
                              onClick={() => setStep(1)}
                              className="text-blue-600 cursor-pointer font-mono font-normal text-[16px] underline"
                            >
                              Edit
                            </button>
                          </span>
                        </p>

                        <InputOTP
                          id="code"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          maxLength={6}
                        >
                          <InputOTPGroup className="space-x-2  w-full  justify-center py-3 ">
                            {Array.from({ length: 6 }, (_, i) => (
                              <InputOTPSlot key={i} index={i} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                        {fieldState.invalid && (
                          <FieldError
                            className="text-red-500 text-sm capitalize font-mono"
                            errors={fieldState.error ? [fieldState.error] : []}
                          />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>

              {otpFormState.errors.form && (
                <div
                  className={` relative font-normal mt-1 flex items-center bg-red-600/10  justify-center border border-red-500 text-red-500 text-xs font-mono`}
                >
                  <CircleX className="w-5 h-5 absolute top-0 -translate-y-1/2 z-1 bg-white rounded-full" />
                  <span className="text-red-500 text-sm capitalize font-mono inline-block p-3 ">
                    {otpFormState.errors.form?.message}
                  </span>
                </div>
              )}
              <span className="text-center text-xs text-gray-500 font-mono flex items-center gap-2 justify-center">
                you can request new code in :
                <span className={`${remaining <= 0 ? "hidden" : "block"} `}>
                  {remaining}
                </span>
                {remaining <= 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      onSubmitEmail({ email });
                      start();
                    }}
                    className="text-blue-600 font-medium hover:underline cursor-pointer"
                  >
                    Resend code
                  </button>
                )}
              </span>
              {/* Submit */}
              <button
                type="submit"
                disabled={
                  isPendingOtp ||
                  (otpFormState.isSubmitted && !otpFormState.isValid)
                }
                className={`w-full cursor-pointer  ${isPendingOtp ? "opacity-75  cursor-not-allowed" : "hover:opacity-90"} gap-2 flex  justify-center  font-mono text-[14px]  text-black font-medium py-3   transition-all duration-150`}
              >
                {isPendingOtp && <LoaderCircle className="animate-spin  " />}
                Verify OTP
              </button>

              {/* Register link */}
            </div>
          </form>
        )}
        {/* register form */}
        {step === 3 && (
          <form
            className="w-full max-w-xl px-10"
            onSubmit={handelRegister(onSubmitRegister)}
          >
            <h2 className="text-3xl font-bold text-gray-900  font-inter mb-2">
              Create Account
            </h2>

            <div className={part === 3 ? "block" : "hidden"}>
              <h2 className="text-blue-600 font-inter text-2xl font-bold mb-6">
                Tell us about you{" "}
              </h2>

              <div className="flex flex-col gap-5">
                {/* Email */}
                <div className="flex  gap-1.5 justify-center items-center">
                  <FieldGroup className=" gap-4">
                    <div className=" grid grid-cols-2 gap-5">
                      <Controller
                        name="firstName"
                        control={controlRegister}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1"
                          >
                            <FieldLabel
                              htmlFor="first-name"
                              className="text-[16px] font-mono font-medium  gap-0"
                            >
                              First Name
                              <span className="text-red-500">*</span>
                            </FieldLabel>
                            <Input
                              id="first-name"
                              placeholder="Ahmad"
                              className="h-[46px]"
                              {...field}
                            />
                            {fieldState.invalid && (
                              <FieldError
                                className="text-red-500 text-sm capitalize font-mono"
                                errors={
                                  fieldState.error ? [fieldState.error] : []
                                }
                              />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="lastName"
                        control={controlRegister}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1"
                          >
                            <FieldLabel
                              htmlFor="last-name"
                              className=" text-[16px] font-mono font-medium gap-0"
                            >
                              Last Name
                              <span className="text-red-500">*</span>
                            </FieldLabel>
                            <Input
                              id="last-name"
                              placeholder="Lee"
                              className="h-[46px]"
                              {...field}
                            />
                            {fieldState.invalid && (
                              <FieldError
                                className="text-red-500 text-sm capitalize font-mono"
                                errors={
                                  fieldState.error ? [fieldState.error] : []
                                }
                              />
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    <Controller
                      name="username"
                      control={controlRegister}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="gap-1"
                        >
                          <FieldLabel
                            htmlFor="username"
                            className="text-[16px] font-mono font-medium gap-0"
                          >
                            username <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Input
                            id="username"
                            placeholder="Jordan"
                            autoComplete="username"
                            className="h-[46px]"
                            {...field}
                          />
                          {fieldState.invalid && (
                            <FieldError
                              className="text-red-500 text-sm capitalize font-mono"
                              errors={
                                fieldState.error ? [fieldState.error] : []
                              }
                            />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="phone"
                      control={controlRegister}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="gap-1"
                        >
                          <FieldLabel
                            htmlFor="form-phone"
                            className="text-[16px] font-mono font-medium"
                          >
                            Phone
                          </FieldLabel>

                          <div
                            className={`flex items-center border  bg-white h-[46px] px-3 gap-2
          ${fieldState.invalid ? "border-red-500" : "border-gray-300"}
          focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500`}
                          >
                            <div className="flex items-center gap-1.5 shrink-0 border-r border-gray-300 pr-3">
                              <Image
                                src="https://flagcdn.com/w20/eg.png"
                                alt="Egypt"
                                width={20}
                                height={20}
                                className=" object-cover "
                              />
                              <span className="text-sm font-mono text-gray-700">
                                EG (+20)
                              </span>
                            </div>

                            <Input
                              id="form-phone"
                              type="tel"
                              placeholder="1012345678"
                              className="flex-1 !border-none !outline-none !shadow-none !ring-0 !p-0 !h-full bg-transparent font-mono"
                              {...field}
                            />
                          </div>

                          {fieldState.invalid && (
                            <FieldError
                              className="text-red-500 text-sm capitalize font-mono"
                              errors={
                                fieldState.error ? [fieldState.error] : []
                              }
                            />
                          )}
                        </Field>
                      )}
                    />

                    {part === 3 && (
                      <button
                        type="button"
                        onClick={async () => {
                          const valid = await triggerRegister([
                            "firstName",
                            "lastName",
                            "username",
                            "phone",
                          ]);
                          if (valid) {
                            setPart(4);
                          }
                        }}
                        className="w-full cursor-pointer  mt-12 hover:opacity-90 gap-2 flex border border-blue-600 justify-center bg-[#eff6ff] hover:bg-[#eff6ff] text-blue-600 font-semibold py-3  text-sm transition-all duration-150"
                      >
                        Next
                      </button>
                    )}
                  </FieldGroup>
                </div>

                {formStateRegister.errors.form && (
                  <div
                    className={` relative font-normal mt-1 flex items-center bg-red-600/10  justify-center border border-red-500 text-red-500 text-xs font-mono`}
                  >
                    <CircleX className="w-5 h-5 absolute top-0 -translate-y-1/2 z-1 bg-white rounded-full" />
                    <span className="text-red-500 text-sm capitalize font-mono inline-block p-3 ">
                      {formStateRegister.errors.form?.message}
                    </span>
                  </div>
                )}

                {/* Submit */}

                {/* Register link */}
              </div>
            </div>

            {part === 4 && (
              <>
                <h2 className="text-blue-600 font-inter text-2xl font-bold mb-6">
                  Create a strong password{" "}
                </h2>

                <div className="flex flex-col gap-5">
                  {/* Email */}
                  <div className="flex  gap-1.5 justify-center items-center">
                    <FieldGroup className=" gap-4">
                      <Controller
                        name="password"
                        control={controlRegister}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1"
                          >
                            <FieldLabel
                              htmlFor="password"
                              className="text-[16px] font-mono font-medium gap-0"
                            >
                              password <span className="text-red-500">*</span>
                            </FieldLabel>
                            <div className="relative">
                              <Input
                                {...field}
                                id="password"
                                aria-invalid={fieldState.invalid}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                type={showPassword ? "text" : "password"}
                                className="pr-10 py-3"
                              />

                              {/* button */}
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <Eye className="w-5 h-5" />
                                ) : (
                                  <EyeOff className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                            {fieldState.invalid && (
                              <FieldError
                                className="text-red-500 text-sm capitalize font-mono"
                                errors={
                                  fieldState.error ? [fieldState.error] : []
                                }
                              />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="confirmPassword"
                        control={controlRegister}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1"
                          >
                            <FieldLabel
                              htmlFor="form-confirmPassword"
                              className="text-[16px] font-mono font-medium gap-0"
                            >
                              Confirm Password
                              <span className="text-red-500">*</span>
                            </FieldLabel>
                            <div className="relative">
                              <Input
                                {...field}
                                id="form-confirmPassword"
                                aria-invalid={fieldState.invalid}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                type={showPassword ? "text" : "password"}
                                className="pr-10 py-3"
                              />

                              {/* button */}
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <Eye className="w-5 h-5" />
                                ) : (
                                  <EyeOff className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                            {fieldState.invalid && (
                              <FieldError
                                className="text-red-500 text-sm capitalize font-mono"
                                errors={
                                  fieldState.error ? [fieldState.error] : []
                                }
                              />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </div>

                  {formStateRegister.errors.form && (
                    <div
                      className={` relative font-normal mt-1 flex items-center bg-red-600/10  justify-center border border-red-500 text-red-500 text-xs font-mono`}
                    >
                      <CircleX className="w-5 h-5 absolute top-0 -translate-y-1/2 z-1 bg-white rounded-full" />
                      <span className="text-red-500 text-sm capitalize font-mono inline-block p-3 ">
                        {formStateRegister.errors.form?.message}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
            {/* Submit */}

            <button
              type="submit"
              disabled={
                isPendingRegister ||
                (formStateRegister.isSubmitted && !formStateRegister.isValid)
              }
              className={` ${part === 3 ? "hidden" : ""} w-full cursor-pointer  mt-12 ${isPendingRegister ? "opacity-75  cursor-not-allowed" : "hover:opacity-90"} gap-2 flex border ${part === 3 ? "border-blue-600" : "text-white bg-blue-600"} justify-center  hover:bg-blue-700 text-blue-600 font-semibold py-3  text-sm transition-all duration-150`}
            >
              {isPendingRegister && <LoaderCircle className="animate-spin  " />}
              {part === 3 ? "Next" : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
