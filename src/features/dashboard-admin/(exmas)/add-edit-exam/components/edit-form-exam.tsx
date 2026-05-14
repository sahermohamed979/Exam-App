"use client";

import { Controller, useForm, FormProvider } from "react-hook-form";
import { useMemo, useEffect} from "react";
import type { z } from "zod";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Input } from "@/src/shared/components/ui/input";
import { Textarea } from "@/src/shared/components/ui/textarea";

import { FieldGroup } from "@/src/shared/components/ui/field";
import UploadForm from "../../../(diplomas)/add-diploma/components/upload-form";
import { useGetExmasDipomas } from "../hooks/get-data-exam-hook";
import { AddExamInput, AddExamSchema } from "../schema/edit-add-exam.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddExam, useUpdateExam } from "../hooks/add-exam-hook";
import { IExam } from "../../Exams/types/exams";

export default function EditExamForm({
  examId,
  initialData,
}: {
  examId?: string;
  initialData: IExam | null;
}) {
  const mutate = useAddExam();

  const updateMutate = useUpdateExam(examId);
  const diplomas = useGetExmasDipomas();
  const diplomsData = useMemo(
    () =>
      diplomas.data?.data.flatMap((diploma) => [
        {
          id: diploma.id,
          title: diploma.title,
        },
      ]) ?? [],
    [diplomas.data],
  );

  const form = useForm<z.input<typeof AddExamSchema>, unknown, AddExamInput>({
    defaultValues: {
      title:  "",
      duration:  20,
      description:  "",
      diplomaId: "",
      image: "",
    },
    resolver: zodResolver(AddExamSchema),
  });

  useEffect(() => {
    if (!initialData) return;
    form.reset({
      title: initialData.title ?? "",
      duration: initialData.duration ?? 20,
      description: initialData.description ?? "",
      diplomaId: initialData.diplomaId ?? "",
      image: initialData.image ?? "",
    });
  }, [initialData]);
  const onSumbit = (data: AddExamInput) => {
    if (examId) {
      updateMutate.mutate(data);
      return;
    }

    mutate.mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form
        id="add-exam-form"
        className="overflow-hidden"
        onSubmit={form.handleSubmit(onSumbit)}
      >
        <FieldGroup className="grid grid-cols-1 gap-x-3 gap-y-2 md:grid-cols-2">
          {/* <UploadFor /> */}
          <Controller
            name="title"
            control={form.control}
            
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-2 md:col-start-1"
              >
                <FieldLabel
                  htmlFor={field.name}
                  className="text-base font-medium text-slate-800"
                >
                  Title
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  className="h-10 rounded-none border-slate-300 bg-slate-50 px-3 text-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />{" "}
          <Controller
            name="diplomaId"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-2 md:col-start-2 md:row-start-1"
                >
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-base font-medium text-slate-800"
                  >
                    Diploma
                  </FieldLabel>
                  <select
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="h-10 w-full rounded-none border border-slate-300 bg-slate-50 px-3 text-sm leading-6 text-slate-800"
                  >
                    <option value="">Select diploma</option>
                    {diplomsData.map((diploma) => (
                      <option key={diploma.id} value={diploma.id}>
                        {diploma.title}
                      </option>
                    ))}
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-2 md:col-start-2 md:row-start-2"
                >
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-base font-medium text-slate-800"
                  >
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="h-26 min-h-26 w-full resize-none rounded-none border-slate-300 bg-slate-50 p-3 text-sm leading-6"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
          <div className="md:col-start-1 md:row-start-2 max-w-174.25 w-full">
            <UploadForm initialImage={initialData?.image}  />
          </div>
          <Controller
            name="duration"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-2 md:col-start-1 md:row-start-3"
                >
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-base font-medium text-slate-800"
                  >
                    Duration in minutes
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    min={1}
                    aria-invalid={fieldState.invalid}
                    value={field.value as string | number | undefined}
                    className="h-10 w-full rounded-none border-slate-300 bg-slate-50 px-3 text-sm leading-6"
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
