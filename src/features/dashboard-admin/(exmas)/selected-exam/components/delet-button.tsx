"use client"; // ← add this
import { Trash } from "lucide-react";
import { deleteQuestionById } from "../../../Questions/apis/get-question-actions";

function DeletButton({ id }: { id: string }) {
  return (
    <button
      onClick={async () => {
        await deleteQuestionById(id);
        window.location.reload();
      }}
      className=" text-gray-800  flex cursor-pointer items-center gap-2"
    >
      <Trash size={18} className="text-red-500" />
      <span className="font-mono text-sm text-red-500">Delete</span>
    </button>
  );
}

export default DeletButton;
