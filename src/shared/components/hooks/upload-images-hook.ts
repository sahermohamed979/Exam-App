import { IUploadData } from "@/src/features/dashboard-admin/(diplomas)/add-diploma/types/add-diplomas";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { ApiResponse, IUploadImageResponse } from "../../types/api";

export default function useUploadImages() {
  const [uploadProgress, setUploadProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: async (files: IUploadData) => {
      const formData = new FormData();
      formData.append("image", files.image);

      const response = await axios.post<ApiResponse<IUploadImageResponse>>(
        "/api/images",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!,
            );
            setUploadProgress(progress);
          },
        },
      );

      if (response.data.status === false) {
        throw new Error(response.data.message);
      }

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      return response.data.payload;
    },
  });

  return { ...mutation, uploadProgress };
}
