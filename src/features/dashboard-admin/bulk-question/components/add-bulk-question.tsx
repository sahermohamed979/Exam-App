"use client";
import { X, PlusIcon } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { useState } from "react";
import BulkAnswers from "./bulk-answers";
import { useFormContext } from "react-hook-form";
import { BulkQuestionItemType } from "../schema/bulk-question-schema";

export function BulkQuestionBody() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const form = useFormContext<BulkQuestionItemType>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  return (
    <div className="w-full min-w-0 ">
      {/* Header */}

      <div className="bg-blue-600 text-white px-4 py-2 font-semibold text-sm flex items-center gap-2">
        Questions
      </div>
      <ul className="bg-white flex items-center w-full min-w-0 ">
        {fields.map((field, index) => (
          <li
            key={field.id}
            onClick={() => setActiveQuestionIndex(index)}
            className={`flex-1 min-w-0 relative px-4 border-s border-e   group py-2 text-sm font-medium    text-center ${
              index === activeQuestionIndex
                ? "bg-blue-100  border-blue-500  text-blue-500"
                : " border-gray-200 text-gray-700 "
            } ${form.formState.errors.questions?.[index] ? "bg-red-200 border-red-500 text-red-600 " : ""}`}
          >
            Q{index + 1}
            <X
              size={14}
              onClick={() => remove(index)}
              className="cursor-pointer absolute top-1 right-1 text-red-500  group-hover:visible invisible"
            />
          </li>
        ))}

        <li
          onClick={() => append({ text: "", answers: [] })}
          className="shrink-0 ms-auto px-3 py-2.5 bg-gray-200 text-sm font-medium text-gray-800  text-center"
        >
          <PlusIcon size={18} />
        </li>
      </ul>

      {/* Content Area */}
      {fields.length > 0 && (
        <div className="bg-white w-full max-w-full min-w-0 p-4 border border-blue-600">
          {/* Question Headline */}

          <BulkAnswers
            key={activeQuestionIndex}
            activeQuestionIndex={activeQuestionIndex}
          />
        </div>
      )}
      {form.formState.errors.questions?.[activeQuestionIndex]?.answers
        ?.message && (
        <span className="text-red-500 text-sm font-mono">
          {
            form.formState.errors.questions?.[activeQuestionIndex]?.answers
              ?.message
          }
        </span>
      )}
    </div>
  );
}
