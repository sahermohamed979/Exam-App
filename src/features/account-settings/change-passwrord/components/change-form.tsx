"use client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Input } from "@/src/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useChangePassword from "../hooks/change-pass-hook";
import {
  ChangePassowrdField,
  restPassowrdScema,
} from "../schema/change-pass-schema";

export default function ChangeForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const { mutate, isPending } = useChangePassword();
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",

      confirmPassword: "",
    },

    resolver: zodResolver(restPassowrdScema),
  });
  const onSubmit = (data: ChangePassowrdField) => {
    mutate(data);
  };
  return (
    <main className="flex-1 min-w-0 w-full p-4 mt-4">
      <form className="w-full max-w-full min-w-0" onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <div className="flex flex-col gap-5 ">
          <FieldGroup className="mb-2 relative">
            <Controller
              name="currentPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  {/* label */}
                  <FieldLabel
                    htmlFor="currentPassword"
                    className="font-mono text-[16px]"
                  >
                    Current Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="currentPassword"
                      aria-invalid={fieldState.invalid}
                      autoComplete="currentPassword"
                      placeholder="••••••••"
                      className="pr-10 py-3 "
                      type={oldPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setOldPassword(!oldPassword)}
                    >
                      {oldPassword ? (
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
          </FieldGroup>
          <div className="h-[1px] bg-gray-200 w-full     " />

          {/* Password */}
          <FieldGroup>
            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="newPassword"
                    className="font-mono text-[16px]"
                  >
                    New Password
                  </FieldLabel>

                  {/* wrapper */}
                  <div className="relative">
                    <Input
                      {...field}
                      id="newPassword"
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
          {/* Password */}
          <FieldGroup>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="confirmPassword"
                    className="font-mono text-[16px]"
                  >
                    Confirm New Password
                  </FieldLabel>

                  {/* wrapper */}
                  <div className="relative">
                    <Input
                      {...field}
                      id="confirmPassword"
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
        {formState.errors.form && (
          <div
            className={` relative font-normal mt-1 flex items-center bg-red-600/10  justify-center border border-red-500 text-red-500 text-xs font-mono`}
          >
            <CircleX className="w-5 h-5 absolute top-0 -translate-y-1/2 z-1 bg-white rounded-full" />
            <span className="text-red-500 text-sm capitalize font-mono inline-block p-3 ">
              Something went wrong
            </span>
          </div>
        )}
        {/* Submit */}
        <button
          type="submit"
          disabled={isPending || (formState.isSubmitted && !formState.isValid)}
          className={`w-full cursor-pointer  ${isPending ? "opacity-75   cursor-not-allowed" : "hover:opacity-90"} gap-2 flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4  mt-8 text-sm transition-all duration-150`}
        >
          {isPending && <LoaderCircle className="animate-spin  " />}
          Update Password{" "}
        </button>
      </form>
    </main>
  );
}
