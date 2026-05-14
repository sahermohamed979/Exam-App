import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { IDiploma } from "@/src/features/dashboard-user/dashborad/types/diploma";
import {
  ArrowDownWideNarrow,
  Ellipsis,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/shared/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu";
import Link from "next/link";
import DeletButton from "./delet-button";

export function TableDiplomas({
  currentDiplomas,
  onSort,
}: {
  currentDiplomas: IDiploma[];
  onSort?: (sortBy: string, sortOrder: string) => void;
}) {
  return (
    <Table className="w-full border-collapse">
      <TableHeader className="bg-blue-600">
        <TableRow className="hover:bg-transparent border-none">
          <TableHead className="text-white font-medium py-2 px-4">
            Image
          </TableHead>
          <TableHead className="text-white font-medium py-2 px-4">
            Title
          </TableHead>
          <TableHead className="text-white font-medium py-2 px-4">
            Description
          </TableHead>
          <TableHead className="text-white flex gap-2 flex-row-reverse font-medium py-2 px-4 text-right">
            {onSort ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <ArrowDownWideNarrow size={18} />
                    <span>Sort</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onSort("title", "desc")}>
                    Title (descending)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSort("title", "asc")}>
                    Title (ascending)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSort("createdAt", "desc")}>
                    Newest (descending)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSort("createdAt", "asc")}>
                    Newest (ascending)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <ArrowDownWideNarrow size={18} />
                <span>Sort</span>
              </>
            )}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-[#f8fafc]">
        {currentDiplomas.map((diploma) => (
          <TableRow
            key={diploma.id}
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <TableCell className="py-3 px-3">
              <div className="relative w-auto h-20 overflow-hidden ">
                <Image
                  src={diploma.image || ""}
                  alt={diploma.title}
                  fill
                  className="object-contain"
                />
              </div>
            </TableCell>

            <TableCell className="font-mono text-[#334155] text-sm font-medium px-4">
              <Tooltip>
                <TooltipTrigger>{diploma.title}</TooltipTrigger>
                <TooltipContent>
                  <p> {diploma.title}</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>

            <TableCell className="py-3 px-3 max-w-md align-top">
              <p className="font-mono text-gray-500 text-sm leading-relaxed line-clamp-2 overflow-hidden">
                {diploma.description}
              </p>
            </TableCell>

            <TableCell className="text-right px-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#475569] rounded transition-colors inline-flex items-center justify-center">
                    <Ellipsis size={18} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem className=" cursor-pointer">
                    <Link
                      href={`/${diploma.id}?diploma=${encodeURIComponent(diploma.title)}`}
                      className="flex items-center gap-2"
                    >
                      <Eye size={18} />
                      <span>View</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Pencil size={18} />
                    <Link
                      href={`/${diploma.id}/edit`}
                      className="flex items-center gap-2"
                    >
                      <span>Edit</span>
                    </Link>
                  </DropdownMenuItem>
                  <DeletButton id={diploma.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
