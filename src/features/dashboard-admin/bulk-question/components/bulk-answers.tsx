"use client";
import { Check, CheckCheck, Plus, Trash2, X } from "lucide-react";
import {  useFieldArray, useFormContext } from "react-hook-form";
import { useState } from "react";
import { IBulkQuestionsForm } from "../../add-edit-question/schema/add-questions-schema";
const MAX_ANSWERS = 4;

function BulkAnswers({ activeQuestionIndex }: { activeQuestionIndex: number }) {
  const {
    control,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext<IBulkQuestionsForm>();
  const [newAnswerText, setNewAnswerText] = useState("");
  const handleConfirmAdd = () => {
    if (newAnswerText.trim()) {
      append({ text: newAnswerText.trim(), isCorrect: false });
      setNewAnswerText("");
      setIsAdding(false);
    }
  };
  const answers = watch(`questions.${activeQuestionIndex}.answers`);

  const toggleCorrect = (index: number) => {
    const isAlreadyCorrect = answers[index].isCorrect;
    fields.forEach((_, i) =>
      setValue(
        `questions.${activeQuestionIndex}.answers.${i}.isCorrect`,
        false,
      ),
    );
    if (!isAlreadyCorrect)
      setValue(
        `questions.${activeQuestionIndex}.answers.${index}.isCorrect`,
        true,
      );
  };

  const [isAdding, setIsAdding] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${activeQuestionIndex}.answers`,
  });

  return (
    <div className="">
      {" "}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Question Headline
      </label>
      <input
        type="text"
        placeholder="Question Headline"

        {...register(`questions.${activeQuestionIndex}.text`)}
        className="w-full p-3 border border-gray-300 rounded text-sm font-mono text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
      />
      {errors?.questions?.[activeQuestionIndex]?.text?.message && (
        <p className="text-red-500 text-sm mt-1">
          {errors?.questions?.[activeQuestionIndex]?.text?.message}
        </p>
      )}
      {/* Body Section Header */}
      <div className="flex items-center justify-between mb-4 bg-gray-200  mt-6">
        <span className="ms-13">Body</span>
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          disabled={isAdding || fields.length >= MAX_ANSWERS}
          className={`flex items-center ms-auto gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-mono font-medium px-4 py-2.5 transition-colors cursor-pointer ${
            isAdding || fields.length >= MAX_ANSWERS ? "invisible" : "visible"
          }`}
        >
          <Plus size={16} />
          Add Answer
        </button>
      </div>
      {/* Answer Rows */}
      <ul className="space-y-0">
        {/* Answer 1 */}
        {fields.map((field, index) => (
          <li
            key={field.id}
            className="flex items-center gap-3  border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="flex items-center justify-center  w-12.5 h-12.5 text-red-500 bg-red-50 cursor-pointer"
            >
              <Trash2 size={18} />
            </button>

            <span className="flex-1 text-sm font-mono text-gray-800">
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
          </li>
        ))}

        {/* Input Row */}
        {isAdding && (
          <div className="flex items-center gap-4 px-2 py-3 bg-emerald-50 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="flex items-center justify-center w-7.5 h-7.5 ms-1 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-200 cursor-pointer"
            >
              <X size={14} />
            </button>

            <input
              autoFocus
              type="text"
              placeholder="Enter answer body"
              required
              value={newAnswerText}
              onChange={(e) => setNewAnswerText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleConfirmAdd()}
              className="flex-1 border border-emerald-300 focus:border-emerald-400 focus:outline-none px-3 py-2 text-xs font-mono text-gray-700 placeholder:text-gray-400 bg-white transition-colors"
            />
            <button
              type="button"
              onClick={() => handleConfirmAdd()}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-mono font-medium px-8 py-2 transition-colors cursor-pointer"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        )}
      </ul>{" "}
    </div>
  );
}

export default BulkAnswers;
