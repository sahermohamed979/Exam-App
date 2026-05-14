"use client";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { AddEditAnswerForm } from "../components/add-edit-answer-form";
import { QuestionInfoForm } from "../components/question-info-form";
import { FormProvider, useForm } from "react-hook-form";
import {
  createQuestionBodySchema,
  ICreateQuestionBody,
  IUpdateQuestionBody,
  updateQuestionBodySchema,
} from "../schema/add-questions-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddQuestion,
  useGetQuestionById,
  useUpdateQuestion,
} from "../hooks/add-edit-question-hook";
import { useEffect } from "react";

export default function AddEditQuestionScreen({
  mode,
  examId,
  examTitle,
  questionId,
}: {
  examId: string;
  examTitle?: string;
  mode: "add" | "edit";
  questionId?: string;
}) {
  const { mutate: addQuestion } = useAddQuestion();
  const { mutate: updateQuestion } = useUpdateQuestion(questionId || "");
  const { data: questionData } = useGetQuestionById(questionId || "", {
    enabled: mode === "edit" && !!questionId,
  });

  const form = useForm<ICreateQuestionBody | IUpdateQuestionBody>({
    defaultValues: {
      text: "",
      examId: examId || "",
      answers: [],
    },
    resolver: zodResolver(
      mode === "add" ? createQuestionBodySchema : updateQuestionBodySchema,
    ),
  });

  const onSubmit = (values: ICreateQuestionBody | IUpdateQuestionBody) => {
    if (mode === "add") {
      addQuestion(values as ICreateQuestionBody);
    } else {
      updateQuestion(values as IUpdateQuestionBody);
    }
  };
  useEffect(() => {
    if (mode === "edit" && questionId && questionData) {
      form.reset({
        text: questionData.text,
        examId: questionData.examId,
        answers: questionData.answers.map((ans) => ({
          text: ans.text,
          isCorrect: ans.isCorrect,
        })),
      });
    }
  }, [questionData, mode, questionId, form]);

  return (
    <div className="  p-4">
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-3 "
          id="add-edit-question"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <QuestionInfoForm
            examId={examId}
            examTitle={examTitle || ""}
            mode={mode}
          />

          <div className="  bg-gray-100  w-full">
            <Table className="w-full border-collapse">
              <TableHeader className="bg-blue-600">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="text-white font-mono font-medium py-2.5 px-4">
                    Question Answers
                  </TableHead>
                </TableRow>
              </TableHeader>
              <AddEditAnswerForm />
            </Table>
          </div>
          {form.formState.errors.answers?.message && (
            <span className="text-red-500 text-sm font-mono">
              {form.formState.errors.answers.message}
            </span>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
