"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import { FieldGroup } from "@/src/shared/components/ui/field";
import { Label } from "@/src/shared/components/ui/label";
import { useGetExmaFroQues } from "../../add-edit-question/hooks/add-edit-question-hook";
import { useMemo } from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
import { BulkQuestionItemType } from "../schema/bulk-question-schema";

export default function ExamFormBulk() {
  const examData = useGetExmaFroQues();
  const examsData = useMemo(
    () =>
      examData?.data?.data.flatMap((exam) => ({
        id: exam.id,
        title: exam.title,
      })) ?? [],
    [examData.data],
  );

  const { control } = useFormContext<BulkQuestionItemType>();


  return (
    <div className="flex w-full min-w-0 flex-col gap-2 mb-6 transition-all bg-blue-600">
      <div>
        <div className="flex items-center justify-between gap-4 px-4 py-2">
          <h4 className="text-sm font-semibold flex items-center gap-2 text-white">
            <span className="text-[16px] font-inter font-semibold">
              Question Information
            </span>
          </h4>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-2 p-4 sm:p-5 bg-white">
          <FieldGroup>
            <Label className="text-gray-800 text-[16px] font-mono pointer-events-none">
              Exam
            </Label>

            <Controller
              name="examId"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border flex items-center w-full max-w-full min-w-0 py-6 text-sm bg-white border-gray-200 rounded-none shadow-none h-auto">
                    <span className="flex-1 min-w-0 text-left ml-2 font-mono text-gray-500 break-words">
                      <SelectValue placeholder="None" />
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
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}
