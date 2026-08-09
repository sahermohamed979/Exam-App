'use client";'
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { CloudUpload, FileImage, Download, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadSchema } from "../schema/add-diplomas-schema";
import { IUploadData } from "../types/add-diplomas";
import useUploadImages from "@/src/shared/components/hooks/upload-images-hook";
import { ProgressBar } from "@/src/shared/components/ui/upload-proggres-bar";
import Image from "next/image";

export default function UploadForm({
  initialImage,
}: {
  initialImage?: string;
}) {
  const { mutate: uploadImages, uploadProgress } = useUploadImages();

  const [image, setImage] = useState(initialImage);
  const [fileDetails, setFileDetails] = useState<{
    name: string;
    size: string;
  } | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const profileForm = useFormContext();

  const form = useForm<IUploadData>({
    resolver: zodResolver(uploadSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const unsubscribe = form.subscribe({
      formState: {
        values: true,
      },
      name: "image",

      callback: ({ values }) => {
        if (values.image) {
          setIsUploading(true);
          uploadImages(values, {
            onError: () => {
              setImage(initialImage);
              setIsUploading(false);
              form.setError("image", {
                type: "manual",
                message: "Failed to upload image",
              });
            },
            onSuccess: (data, variables) => {
              profileForm.setValue("image", data.url);
              setImage(URL.createObjectURL(variables.image));

              const sizeInMB =
                (variables.image.size / (1024 * 1024)).toFixed(2) + " MB";
              setFileDetails({
                name: variables.image.name,
                size: sizeInMB,
              });

              setIsUploading(false);
            },
          });
        }
      },
    });

    return () => unsubscribe();
  }, [form, profileForm, uploadImages]);

  return (
    <div className="relative w-full min-w-0">
      <Controller
        name="image"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-2">
            <FieldLabel
              htmlFor={field.name}
              className="text-base font-medium text-slate-800"
            >
              Image
            </FieldLabel>

            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              aria-invalid={fieldState.invalid}
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />
            <div className="relative">
              {image ? (
                <div className="flex flex-col sm:flex-row min-h-26 sm:h-26 items-start sm:items-center justify-between gap-3 w-full min-w-0 border border-slate-300 bg-slate-50 p-1.5 transition-colors">
                  <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                    <div className="relative h-21.25 w-21.25 shrink-0 border border-gray-100">
                      <Image
                        src={image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="max-w-125 flex-1 min-w-0 truncate text-xl font-mono text-gray-500">
                      {fileDetails?.name || "Image.png"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 pr-4 min-w-0">
                    <span className="text-base font-mono text-gray-400">
                      {fileDetails?.size || "0.00 MB"}
                    </span>
                    <div className="mx-2 h-6 w-px bg-gray-200" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const link = document.createElement("a");
                        link.href = image;
                        link.download = fileDetails?.name || "download";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="text-blue-400 hover:text-blue-500 transition-colors"
                    >
                      <Download size={24} strokeWidth={1.5} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setImage("");
                        setFileDetails(null);
                        profileForm.setValue("image", "");
                        form.resetField("image");
                      }}
                      className="text-red-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={24} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor={field.name}
                  className="relative flex min-h-26 sm:h-26 w-full min-w-0 cursor-pointer flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 border border-slate-300 bg-slate-50 px-5 py-2 sm:py-0 transition-colors hover:bg-gray-50"
                >
                  <div className="hidden sm:flex w-10 h-10 items-center justify-center absolute left-5 text-gray-300">
                    <FileImage
                      size={45}
                      className="text-gray-400 font-light opacity-50"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-500 min-w-0 text-center sm:text-left">
                    <CloudUpload size={24} className="text-gray-400 shrink-0" />
                    <span className="font-mono text-base break-words min-w-0">
                      Drop an image here or{" "}
                      <span className="text-blue-500 hover:underline font-mono">
                        select from your computer
                      </span>
                    </span>
                  </div>
                </label>
              )}
            </div>

            <div className="absolute left-0 w-full bottom-0 ">
              {" "}
              {isUploading && <ProgressBar value={uploadProgress} />}
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}
