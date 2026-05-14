import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Input } from "@/src/shared/components/ui/input";
import { ChevronRight, Loader2, PencilLine } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import ProgressBar from "../../../auth/components/progres-bar";
import { useEffect, useState } from "react";
import { useChangeEmail } from "../hooks/change-email-hook";
import { ChangeNewEmailField } from "../../../auth/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import VerifyChangedEmailForm from "./verfiy-changed-email-form";
import { useResendTimer } from "@/src/shared/components/hooks/usetimer-hook";
import { changeNewEmailSchema } from "../schema/profile-schema";
export function ChangeEmailForm() {
  const { mutate, isPending, error } = useChangeEmail();
  const { remaining, start } = useResendTimer(1);

  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);

  const [otptEmail, setOtpEmail] = useState("");
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      newEmail: "",
    },
    resolver: zodResolver(changeNewEmailSchema),
    mode: "onSubmit",
  });
  const onSubmit = (data: ChangeNewEmailField) => {
    setOtpEmail(data.newEmail);
    mutate(data, {
      onSuccess: () => {
        setStep(2);
        start();
      },
    });
  };

  useEffect(() => {
    if (step === 1) {
      document.getElementById("newEmail")?.focus();
    }
  }, [step]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="absolute top-0 right-1 flex items-center gap-2 text-blue-600 font-mono font-medium">
          <PencilLine size={16} /> Change
        </button>
      </DialogTrigger>
      <DialogContent className="w-[589 px] ">
        <DialogHeader className="space-y-5">
          <ProgressBar totalSteps={2} step={step} className="mt-6" />
          <DialogTitle className="font-inter font-bold text-3xl text-gray-800">
            Change Email
          </DialogTitle>
          <DialogTitle className="font-inter  text-2xl font-bold text-blue-600">
            {step === 1 && "Enter your new email"}
          </DialogTitle>
        </DialogHeader>
        {step === 1 && (
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
            })}
          >
            {" "}
            <FieldGroup className="mt-6">
              <FieldGroup>
                <Controller
                  name="newEmail"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-2">
                      <FieldLabel
                        htmlFor="email"
                        className="font-mono text-lg text-gray-800 font-medium"
                      >
                        Email
                      </FieldLabel>

                      <Input
                        {...field}
                        id="newEmail"
                        aria-invalid={fieldState.invalid}
                        placeholder="user@example.com"
                        autoComplete="email"
                        className="pr-10 py-3 placeholder:text-gray-400  placeholder:font-mono "
                      />
                      {fieldState.error && (
                        <FieldError
                          className="text-red-500 text-sm capitalize font-mono"
                          errors={[fieldState.error]}
                        />
                      )}
                      {error && (
                        <p className="text-red-500 text-sm capitalize font-mono">
                          {error.message}
                        </p>
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              {formState.errors.newEmail && (
                <FieldError
                  className="text-red-500 text-sm capitalize font-mono"
                  errors={[formState.errors.newEmail || error]}
                />
              )}
              <div className="h-[1px] bg-gray-200 w-full    mt-3   " />

              <DialogFooter className=" ">
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-blue-600 p-3 w-full  text-white font-mono flex justify-center items-center gap-2 "
                >
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin" /> Next
                    </>
                  ) : (
                    "Next"
                  )}
                  <ChevronRight />
                </button>
              </DialogFooter>
            </FieldGroup>
          </form>
        )}
        {step === 2 && (
          <VerifyChangedEmailForm
            otpEmail={otptEmail}
            onEdit={() => setStep(1)}
            remaining={remaining}
            start={start}
            onSubmitEmail={onSubmit}
            onSuccess={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
