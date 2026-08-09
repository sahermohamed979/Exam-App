"use client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Input } from "@/src/shared/components/ui/input";
import { Textarea } from "@/src/shared/components/ui/textarea";
import { Controller, FormProvider, useForm } from "react-hook-form";
import UploadForm from "./upload-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddDiplomaInput,
  addDiplomaSchema,
} from "../schema/add-diplomas-schema";
import { useAddDiploma, useEditDiploma } from "../hooks/add-diplomas-hooks";
import { IDiploma } from "@/src/features/dashboard-user/dashborad/types/diploma";
import { useEffect } from "react";

export default function AddForm({
  mode,
  id,
  data,
}: {
  mode: "add" | "edit";
  id?: string;
  data?: IDiploma | undefined;
}) {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
    resolver: zodResolver(addDiplomaSchema),
  });
  useEffect(() => {
    if (!data) return;

    if (data) {
      form.reset({
        title: data.title,
        description: data.description,
        image: data.image || "",
      });
    }
  }, [data]);

  const addMutation = useAddDiploma();
  const editMutation = useEditDiploma(id || "");

  const onSubmit = async (values: AddDiplomaInput) => {
    if (mode === "add") {
      addMutation.mutate(values);
    } else {
      editMutation.mutate(values);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        id="add-diploma-form"
        className="w-full max-w-full min-w-0"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup className="space-y-6">
          <UploadForm initialImage={data?.image || ""} />
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  className="py-3"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />{" "}
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="w-full border border-gray-200  p-3 min-h-25 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
