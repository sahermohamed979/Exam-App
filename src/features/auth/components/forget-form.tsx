"use client";
import { Input } from "@/src/shared/components/ui/input";
import Link from "next/link";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Controller } from "react-hook-form";
import { useUpdatePassword } from "../hooks/update-password-hook";
import { CircleX, LoaderCircle, MoveLeft } from "lucide-react";
import { useState } from "react";

export default function ForgetForm() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const { control, formState, onSubmit, handleSubmit, isPending } =
    useUpdatePassword(null!);

  return (
    <div className="h-screen flex items-center justify-center bg-white ">
      {step === 1 && (
        <form
          className="w-full max-w-xl px-10"
          onSubmit={handleSubmit(async (emailvalues) => {
            const payload = {
              ...emailvalues,
              redirectUrl: `${window.location.origin}/reset-password`, 
            };

            await onSubmit(payload);
            setEmail(emailvalues.email);
            setStep(2);
          })}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password
          </h2>
          <p className="text-gray-500 font-mono text-[16px] mb-8 line-clamp-2 max-w-[410px]">
            Don’t worry, we will help you recover your account.
          </p>

          <div className="flex flex-col gap-5">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <FieldGroup className="mb-2">
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-2">
                      {/* label */}
                      <FieldLabel
                        htmlFor="email"
                        className="Geist Mono

"
                      >
                        Email
                      </FieldLabel>

                      <Input
                        {...field}
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="user@example.com"
                        autoComplete="email"
                        className="pr-10 py-3 "
                      />
                      {fieldState.invalid && (
                        <FieldError
                          className="text-red-500 text-sm capitalize font-mono"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>

            {formState.errors.form?.message && (
              <div
                className={` relative font-normal mt-1 flex items-center bg-red-600/10  justify-center border border-red-500 text-red-500 text-xs font-mono`}
              >
                <CircleX className="w-5 h-5 absolute top-0 -translate-y-1/2 z-1 bg-white rounded-full" />
                <span className="text-red-500 text-sm capitalize font-mono inline-block p-3 ">
                  {formState.errors.form?.message || " Something went wrong"}
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={
                isPending || (formState.isSubmitted && !formState.isValid)
              }
              className={`w-full cursor-pointer  ${isPending ? "opacity-75  cursor-not-allowed" : "hover:opacity-90"} gap-2 flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3  text-sm transition-all duration-150`}
            >
              {isPending && <LoaderCircle className="animate-spin  " />}
              Next
            </button>

            {/* Register link */}
            <p className="text-center text-xs text-gray-500 font-mono">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 font-medium hover:underline"
              >
                Create yours
              </Link>
            </p>
          </div>
        </form>
      )}
      {step === 2 && (
        <div className="flex-col space-y-6 max-w-[420px]  w-full ">
          <span className="cursor-pointer mb-10 inline-block border p-1.5  border-gray-400">
            <MoveLeft size={24} onClick={() => setStep(1)} />
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-inter">
            Password Reset Sent
          </h2>
          <p className="font-mono text-[16px]  ">
            We have sent a password reset link to:
            <span className="font-mono text-[16px] font-semibold text-blue-600 ">
              {email}
            </span>
          </p>
          <p className="font-mono text-[16px]  ">
            Please check your inbox and follow the instructions to reset your
            password.
          </p>
          <p className="font-mono   text-sm   text-gray-500">
            If you don’t see the email within a few minutes, check your spam or
            junk folder.
          </p>
          <p className="font-mono text-sm   ">
            Don’t have an account?{" "}
            <Link href={"/signup"} className="text-blue-600">
              Create yours{" "}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
