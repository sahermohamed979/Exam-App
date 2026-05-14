"use client";
import { Input } from "@/src/shared/components/ui/input";
import { CircleX, Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useLogin } from "../hooks/login-hook";
import { useState } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Controller } from "react-hook-form";

export default function LoginForm() {
  const { handleSubmit, control, isPending, onSubmit, formState } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="h-screen flex items-center justify-center bg-white ">
      <form className="w-full max-w-xl px-10" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-gray-900 mb-7">Login</h2>

        <div className="flex flex-col gap-5">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <FieldGroup className="mb-2">
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    {/* label */}
                    <FieldLabel htmlFor="username">Username</FieldLabel>

                    <Input
                      {...field}
                      id="username"
                      aria-invalid={fieldState.invalid}
                      placeholder="user123"
                      autoComplete="username"
                      
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
            {/* Password */}
            <FieldGroup>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>

                    {/* wrapper */}
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
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          <Link
            href="/forget-password"
            className="text-xs ml-auto text-blue-600 hover:underline font-mono"
          >
            Forgot your password?
          </Link>
          {formState.errors.form && (
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
            Login
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
