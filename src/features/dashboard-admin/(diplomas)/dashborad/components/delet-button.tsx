import { DropdownMenuItem } from "@/src/shared/components/ui/dropdown-menu";
import { useDeleteDiploma } from "../hooks/admin-diplomas-hook";
import { Trash } from "lucide-react";

export default function DeletButton({ id }: { id: string }) {
  const deleteMutation = useDeleteDiploma();

  return (
    <DropdownMenuItem
      onClick={() => deleteMutation.mutate(id)}
      className="flex items-center gap-2 cursor-pointer text-red-600"
    >
      <Trash size={18} />
      <span>Delete</span>
    </DropdownMenuItem>
  );
}
