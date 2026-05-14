import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddExamInput } from "../schema/edit-add-exam.schema";
import {
  addExamAction,
  deleteExm,
  updateExamAction,
} from "../apis/add-exam.action";

export function useAddExam() {
  return useMutation({
    mutationFn: async (values: AddExamInput) => {
      const data = await addExamAction(values);

      return data;
    },

    onSuccess: () => {
      window.location.href = "/exams";
    },
  });
}

export function useUpdateExam(id?: string) {
  return useMutation({
    mutationFn: async (values: Partial<AddExamInput>) => {
      if (!id) throw new Error("Missing exam id for update");
      const data = await updateExamAction(id, values);
      return data;
    },
    onSuccess: () => {
      window.location.href = "/";
    },
  });
}

export function useDeleteExm(id?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!id) throw new Error("Missing exam id for delete");
      const data = await deleteExm(id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams-admin"] });

      window.location.href = "/exams";
    },
  });
}
