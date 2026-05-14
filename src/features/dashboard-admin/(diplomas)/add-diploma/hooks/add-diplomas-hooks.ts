import { useMutation } from "@tanstack/react-query";
import { AddDiplomaInput } from "../schema/add-diplomas-schema";
import { addDiploma, editDiploma } from "../apis/diplomas-action";

export function useAddDiploma() {
  return useMutation({
    mutationFn: async (values: AddDiplomaInput) => {
      const data = await addDiploma(values);

      return data;
    },

    onSuccess: () => {
      window.location.href = "/";
    },
  });
}

export function useEditDiploma(id: string) {
  return useMutation({
    mutationFn: async (values: AddDiplomaInput) => {
      const data = await editDiploma({ id, values });

      return data;
    },

    onSuccess: () => {
      window.location.href = "/";
    },
  });
}
