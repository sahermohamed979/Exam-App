"use client";
import { Label } from "@/src/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import { useGetExmaFroQues } from "../hooks/add-edit-question-hook";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Input } from "@/src/shared/components/ui/input";

export function QuestionInfoForm({
  examId,
  examTitle,
  mode,
}: {
  examId: string;
  examTitle: string;
  mode: "add" | "edit";
}) {
  const examData = useGetExmaFroQues();
  const examsData = useMemo(
    () =>
      examData?.data?.data.flatMap((exam) => [
        {
          id: exam.id,
          title: exam.title,
        },
      ]) ?? [],
    [examData.data],
  );

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex w-full flex-col gap-2   mb-6 transition-all bg-blue-600 ">
      <div>
        <div className="flex items-center justify-between gap-4 px-4  py-2 ">
          <h4 className="text-sm font-semibold flex items-center gap-2 text-white">
            <span className="text-[16px] font-inter font-semibold">
              Question Information{" "}
            </span>
          </h4>
        </div>

        <div className="flex flex-col gap-2 p-5  bg-white">
          <FieldGroup>
            <Select>
              <Label className="text-gray-800 text-[16px] font-mono  pointer-events-none">
                Exam
              </Label>

              <Controller
                control={control}
                name="examId"
                defaultValue={examId || ""}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={mode === "edit"}
                  >
                    <SelectTrigger className="border flex items-center w-full py-6  text-sm bg-white border-gray-200 rounded-none shadow-none  h-auto">
                      <span className="flex-1 text-left ml-2 font-mono text-gray-500">
                        <SelectValue
                          defaultValue={examId || ""}
                          placeholder={examTitle || "None"}
                        />
                      </span>
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="w-[var(--radix-select-trigger-width)] max-h-[200px] font-mono"
                    >
                      {examsData.map((exam) => (
                        <SelectItem
                          key={exam.id}
                          value={exam.id}
                          className="text-gray-500"
                        >
                          {exam.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Select>
            {errors.examId && ( // ← examId error
              <span className="text-red-500 text-xs font-mono">
                {errors.examId.message as string}
              </span>
            )}{" "}
            <FieldLabel htmlFor="text">Question Headline</FieldLabel>
            <Controller
              name="text"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="text"
                    aria-invalid={fieldState.invalid}
                    className="w-full h-full outline-none font-mono py-2"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[{ message: fieldState.error?.message || " " }]}
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}
