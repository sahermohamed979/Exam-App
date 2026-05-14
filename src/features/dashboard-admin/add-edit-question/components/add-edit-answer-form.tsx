"use client";
import {
  TableRow,
  TableCell,
  TableBody,
} from "@/src/shared/components/ui/table";
import { Trash2, Plus, X, Check, CheckCheck } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ICreateQuestionBody } from "../schema/add-questions-schema";

const MAX_ANSWERS = 4;

export function AddEditAnswerForm() {
  const { control, watch, setValue } = useFormContext<ICreateQuestionBody>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });
  const answers = watch("answers");

  const [isAdding, setIsAdding] = useState(false);
  const [newAnswerText, setNewAnswerText] = useState("");

  const handleConfirmAdd = () => {
    if (newAnswerText.trim()) {
      append({ text: newAnswerText.trim(), isCorrect: false });
      setNewAnswerText("");
      setIsAdding(false);
    }
  };

  const toggleCorrect = (index: number) => {
    const isAlreadyCorrect = answers[index].isCorrect;
    fields.forEach((_, i) => setValue(`answers.${i}.isCorrect`, false));
    if (!isAlreadyCorrect) setValue(`answers.${index}.isCorrect`, true);
  };

  return (
    <TableBody className="bg-[#f8fafc]">
      <TableRow className="bg-gray-200">
        <TableCell className="font-mono text-[#334155] text-sm font-medium px-0 py-0">
          <div className="flex items-center ">
            <span className="ms-15">Body</span>
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              disabled={isAdding || fields.length >= MAX_ANSWERS}
              className={`flex items-center ms-auto gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-mono font-medium px-4 py-2.5 transition-colors cursor-pointer ${
                isAdding || fields.length >= MAX_ANSWERS
                  ? "invisible"
                  : "visible"
              }`}
            >
              <Plus size={16} />
              Add Answer
            </button>
          </div>
        </TableCell>
      </TableRow>

      {fields.map((field, index) => (
        <TableRow
          key={field.id}
          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <TableCell className="px-0 py-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => remove(index)}
                className="flex items-center justify-center w-12.5 h-12.5 bg-red-50 cursor-pointer"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
              <span className="flex-1 font-mono text-sm text-gray-800 font-regular">
                {field.text}
              </span>
              <button
                type="button"
                onClick={() => toggleCorrect(index)}
                className={`flex items-center justify-center gap-1.5 w-32 h-8 font-mono text-[12px] me-2 cursor-pointer ${
                  answers[index]?.isCorrect
                    ? "text-emerald-500"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {answers[index]?.isCorrect ? (
                  <>
                    <CheckCheck size={14} /> Correct Answer
                  </>
                ) : (
                  <>
                    <Check size={14} /> Mark Correct
                  </>
                )}
              </button>
            </div>
          </TableCell>
        </TableRow>
      ))}

      {/* Input row */}
      {isAdding && (
        <TableRow className="border-b border-gray-100 bg-emerald-50">
          <TableCell className="px-0 py-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setNewAnswerText("");
                }}
                className="flex items-center justify-center w-7.5 h-7.5 ms-2 border border-gray-300 text-gray-600 rounded-full transition-colors cursor-pointer shrink-0"
              >
                <X size={15} />
              </button>
              <input
                autoFocus
                type="text"
                value={newAnswerText}
                onChange={(e) => setNewAnswerText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleConfirmAdd()}
                placeholder="Enter answer body"
                className="flex-1   border border-emerald-300 focus:border-emerald-400 outline-none px-4 py-2 text-sm font-mono text-gray-700 placeholder:text-gray-400 bg-white transition-colors"
              />
              <button
                type="button"
                onClick={handleConfirmAdd}
                className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm me-2 font-mono font-medium px-10 py-2.5 transition-colors cursor-pointer shrink-0"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
