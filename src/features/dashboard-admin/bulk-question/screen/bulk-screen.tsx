"use client";
import { BulkQuestionBody } from "../components/add-bulk-question";
import ExamFormBulk from "../components/exam-form-bulk";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bulkQuestionItemSchema,
  BulkQuestionItemType,
} from "../schema/bulk-question-schema";
import { useAddBulkQuestion } from "../hook/bulk-hook";

export default function BulkQuestionScreen() {
  const { mutate } = useAddBulkQuestion();
  const form = useForm({
    defaultValues: {
      examId: "",
      questions: [],
    },
    resolver: zodResolver(bulkQuestionItemSchema),
  });
  const SubmitHand = (value: BulkQuestionItemType) => {
    mutate(value);
  };

  return (
    <div className="w-full min-w-0 bg-gray-100 ">
      <FormProvider {...form}>
        <form
          id="bulk-question-form"
          onSubmit={form.handleSubmit(SubmitHand)}
          className="w-full max-w-full min-w-0"
        >
          <ExamFormBulk />

          <div className="bg-gray-100 w-full max-w-full min-w-0">
            <BulkQuestionBody />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
