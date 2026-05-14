"use client";
import { Input } from "@/src/shared/components/ui/input";
import { CircleX, Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Controller } from "react-hook-form";
import { useUpdatePassword } from "../hooks/update-password-hook";
import { useSearchParams } from "next/navigation";

export default function ResetForm( ) {
    const params = useSearchParams();
  const token = params.get("token");
  const { 
    handleSubmitReset,
    controlReset,
    isPendingReset,
    onSubmitReset,
    formStateReset,
  } = useUpdatePassword(token!);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="h-screen flex items-center justify-center bg-white ">
      <form
        className="w-full max-w-xl px-10"
        onSubmit={handleSubmitReset(onSubmitReset)}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-3 font-inter">
          Create a New Password
        </h2>
        <p className="mb-7 text-gray-500 text-[16px] font-mono">
          Create a new strong password for your account.
        </p>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <FieldGroup className="mb-2 relative">
              <Controller
                name="password"
                control={controlReset}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    {/* label */}
                    <FieldLabel
                      htmlFor="username"
                      className="font-mono text-[16px]"
                    >
                      New Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="username"
                        aria-invalid={fieldState.invalid}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="pr-10 py-3 "
                        type={showPassword ? "text" : "password"}
                      />
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
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />
              {/* button */}
            </FieldGroup>
            {/* Password */}
            <FieldGroup>
              <Controller
                name="confirmPassword"
                control={controlReset}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="password"
                      className="font-mono text-[16px]"
                    >
                      Confirm New Password
                    </FieldLabel>

                    {/* wrapper */}
                    <div className="relative">
                      <Input
                        {...field}
                        id="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="••••••••"
                        autoComplete="confirm-password"
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
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          {formStateReset.errors.form && (
            <div
              className={` relative font-normal mt-1 flex items-center bg-red-600/10  justify-center border border-red-500 text-red-500 text-xs font-mono`}
            >
              <CircleX className="w-5 h-5 absolute top-0 -translate-y-1/2 z-1 bg-white rounded-full" />
              <span className="text-red-500 text-sm capitalize font-mono inline-block p-3 ">
                {formStateReset.errors.form?.message || " Something went wrong"}
              </span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={
              isPendingReset ||
              (formStateReset.isSubmitted && !formStateReset.isValid)
            }
            className={`w-full cursor-pointer  ${isPendingReset ? "opacity-75  cursor-not-allowed" : "hover:opacity-90"} gap-2 flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3  text-sm transition-all duration-150`}
          >
            {isPendingReset && <LoaderCircle className="animate-spin  " />}
            Reset Password
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
    </div>
  );
}
