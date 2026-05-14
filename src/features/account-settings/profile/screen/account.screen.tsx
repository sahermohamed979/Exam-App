"use client";
import { useForm } from "react-hook-form";

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Input } from "@/src/shared/components/ui/input";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { ChangeEmailForm } from "../components/change-email-form";
import DeleteAcount from "../components/delet-account";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountProfileSchema } from "../schema/profile-schema";
import { AccountProfileField } from "@/src/features/auth/types/auth";
import { useUpdateAccount } from "../hooks/update-profile-hook";

export default function AccountScreen() {
  const { data } = useSession();
  const { mutate, isPending } = useUpdateAccount();
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AccountProfileField>({
    defaultValues: {
      firstName: data?.user.firstName || "",
      lastName: data?.user.lastName || "",
      phone: data?.user.phone || "",
      profilePhoto: data?.user?.profilePhoto || "",
    },
    resolver: zodResolver(accountProfileSchema),
  });

  const onSubmt = (data: AccountProfileField) => {
    mutate(data);
  };
  useEffect(() => {
    if (data?.user) {
      reset({
        firstName: data.user.firstName || "",
        lastName: data.user.lastName || "",
        phone: data.user.phone || "",
        profilePhoto: data.user.profilePhoto || "",
      });
    }
  }, [data, reset]);
  return (
    <main className="flex-1 p-4">
      <form className="w-full  px-10" onSubmit={handleSubmit(onSubmt)}>
        <div>
          <div className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex  gap-1.5 justify-center items-center">
              <FieldGroup className=" gap-4">
                <div className=" grid grid-cols-2 gap-5">
                  <Field className="gap-1">
                    <FieldLabel
                      htmlFor="first-name"
                      className="text-[16px] font-mono font-medium  gap-0"
                    >
                      First Name
                    </FieldLabel>
                    <Input
                      id="first-name"
                      placeholder="Ahmad"
                      className="h-[46px]"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-red-500">{errors.firstName.message}</p>
                    )}
                  </Field>

                  <Field className="gap-1">
                    <FieldLabel
                      htmlFor="last-name"
                      className=" text-[16px] font-mono font-medium gap-0"
                    >
                      Last Name
                    </FieldLabel>
                    <Input
                      id="last-name"
                      placeholder="Lee"
                      {...register("lastName")}
                      className="h-[46px]"
                    />
                    {errors.lastName && (
                      <p className="text-red-500">{errors.lastName.message}</p>
                    )}
                  </Field>
                </div>

                <FieldGroup>
                  <FieldLabel
                    htmlFor="username"
                    className="text-[16px] font-mono font-medium gap-0"
                  >
                    Username
                  </FieldLabel>
                  <Input
                    id="username"
                    placeholder="Jordan"
                    autoComplete="username"
                    value={data?.user.username || ""}
                    className="h-[46px] disabled:bg-gray-100  disabled:border-gray-300 disabled:placeholder:text-gray-800 font-mono"
                    disabled
                  />
                </FieldGroup>

                <div>
                  <FieldGroup className=" relative ">
                    <FieldLabel
                      htmlFor="email"
                      className="text-[16px] font-mono font-medium gap-0"
                    >
                      Email
                    </FieldLabel>

                    <ChangeEmailForm />
                    <Input
                      id="email"
                      placeholder="Jordan"
                      autoComplete="email"
                      className="h-[46px]  font-mono "
                      value={data?.user.email ?? ""}
                      readOnly
                    />
                  </FieldGroup>
                </div>
                <Field data-invalid={errors} className="gap-1">
                  <FieldLabel
                    htmlFor="form-phone"
                    className="text-[16px] font-mono font-medium"
                  >
                    Phone
                  </FieldLabel>

                  <div
                    className={`flex items-center border  bg-white h-[46px] px-3 gap-2
         
          focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500`}
                  >
                    <div className="flex items-center gap-1.5 shrink-0 border-r border-gray-300 pr-3">
                      <Image
                        src="/images/eg.png"
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
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                </Field>

                <div className="flex items-center justify-between gap-4">
                  <DeleteAcount />
                  <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 w-full p-4 text-white  font-mono font-medium p-2 text-sm"
                  >
                    {isPending ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </FieldGroup>
            </div>
          </div>
        </div>{" "}
      </form>
    </main>
  );
}
