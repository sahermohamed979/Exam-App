import { useMutation } from "@tanstack/react-query";
import { addBulkQuestion } from "../api/bulk-actions";
import { BulkQuestionItemType } from "../schema/bulk-question-schema";

export function useAddBulkQuestion() {
  const query = useMutation({
    mutationFn: async (values: BulkQuestionItemType) => {
      const res = await addBulkQuestion(values);

      return res;
    },
    onSuccess: () => {
      window.location.href = "/exams";
    },
  });

  return {
    ...query,
  };
}
