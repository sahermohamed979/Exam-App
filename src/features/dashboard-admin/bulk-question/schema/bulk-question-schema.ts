import z, { optional } from "zod";
export const answerBodySchema = z
  .object({
    text: z
      .string({ message: "Answer text is required" })
      .min(1, "Answer text cannot be empty"),
    isCorrect: z.boolean({
      message: "Please specify whether this answer is correct",
    }),
  })
  .strict();

export const questionBodySchema = z
  .object({
    text: z
      .string({ message: "Question text is required" })
      .min(1, "Question text cannot be empty"),
    answers: z
      .array(answerBodySchema, "Answers must be a valid array")
      .min(2, "At least 2 answers are required")
      .refine(
        (answers: z.infer<typeof answerBodySchema>[]) =>
          answers.filter((a) => a.isCorrect).length === 1,
        "Exactly one answer must be marked as correct",
      ),
  })
  .strict();

export const bulkQuestionItemSchema = z

  .object({
    questions: z
      .array(questionBodySchema, "Questions must be a valid array")
      .min(1, "At least 1 question is required"),

    examId: z.string({
      message: "Exam is required",
    }),
  })

  .strict();

export type AnswerBodyType = z.infer<typeof answerBodySchema>;
export type QuestionBodyType = z.infer<typeof questionBodySchema>;

export type BulkQuestionItemType = z.infer<typeof bulkQuestionItemSchema>;
