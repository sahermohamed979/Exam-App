import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/shared/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  ChangeNewEmailField,
  checkVerificationCodeField,
} from "../../../auth/types/auth";
import { DialogFooter } from "@/src/shared/components/ui/dialog";
import { Loader } from "lucide-react";
import { useConfirmChangeEmail } from "../hooks/verfiy-code-hook";
import { checkVerificationCodeSchema } from "../schema/profile-schema";

export default function VerifyChangedEmailForm({
  otpEmail,
  onEdit,
  remaining,
  start,
  onSubmitEmail,
  onSuccess,
}: {
  otpEmail: string;
  onEdit: () => void;
  remaining: number;
  start: () => void;
  onSubmitEmail: ({ email }: { email: string }) => void;
  onSuccess: () => void;
}) {
  const { mutate, isPending } = useConfirmChangeEmail();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(checkVerificationCodeSchema),
    mode: "onSubmit",
  });
  const onSubmit = (data: checkVerificationCodeField) => {
    mutate(data, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <FieldGroup className="mb-2">
            <Controller
              name="code"
              control={control}
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
                        {otpEmail}
                      </span>
                      <button
                        onClick={onEdit}
                        type="button"
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
        <span className="text-center text-xs text-gray-500 font-mono flex items-center gap-2 justify-center">
          you can request new code in :
          <span className={`${remaining <= 0 ? "hidden" : "block"} `}>
            {remaining}
          </span>
          {remaining <= 0 && (
            <button
              type="button"
              onClick={() => {
                onSubmitEmail({ newEmail: otpEmail } as ChangeNewEmailField);
                start();
              }}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Resend code
            </button>
          )}
        </span>

        <div className="h-[1px] bg-gray-200 w-full    mt-3   " />

        <DialogFooter className=" ">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 p-3 w-full  text-white font-mono flex justify-center items-center gap-2 "
          >
            {isPending ? <Loader className="animate-spin" /> : "Verify Code"}
          </button>
        </DialogFooter>
      </div>
    </form>
  );
}
