import { DropdownMenuItem } from "@/src/shared/components/ui/dropdown-menu";
import { Trash } from "lucide-react";
import { useDeleteExm } from "../../add-edit-exam/hooks/add-exam-hook";

export default function DeletExam({ id }: { id: string }) {
  const deleteMutation = useDeleteExm(id)

  return (
    <DropdownMenuItem
      onClick={() => deleteMutation.mutate()}
      className="flex items-center gap-2 cursor-pointer text-red-600"
    >
      <Trash size={18} />
      <span>Delete</span>
    </DropdownMenuItem>
  );
}
