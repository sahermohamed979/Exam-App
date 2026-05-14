import { z } from "zod";

export const answerBodySchema = z
  .object({
    id: z.string().optional(),
    text: z
      .string({ message: "Answer text is required" })
      .min(1, "Answer text cannot be empty"),
    isCorrect: z.boolean({
      message: "Please specify whether this answer is correct",
    }),
  })
  .strict();
export const createQuestionBodySchema = z
  .object({
    text: z
      .string({ message: "Question text is required" })
      .min(1, "Question text cannot be empty"),
    examId: z.string(),
    answers: z
      .array(answerBodySchema)
      .min(2, "At least 2 answers are required")
      .refine(
        (answers) => answers.filter((a) => a.isCorrect).length === 1,
        "Exactly one answer must be marked as correct",
      ),
  })
  .strict();
export const updateQuestionBodySchema = createQuestionBodySchema.omit({
  examId: true,
}).strip();
export const bulkQuestionsFormSchema = z.object({
  questions: z.array(createQuestionBodySchema),
});
export type ICreateQuestionBody = z.infer<typeof createQuestionBodySchema>;
export type IUpdateQuestionBody = z.infer<typeof updateQuestionBodySchema>;
export type IBulkQuestionsForm = z.infer<typeof bulkQuestionsFormSchema>;
