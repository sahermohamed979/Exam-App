"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import {
  ChevronsDownUp,
  ChevronsUpDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/src/shared/components/ui/collapsible";
import { DEFAULT_EXAMS_FILTERS } from "@/src/shared/constants/api.constants";
import { useMemo } from "react";
import { useGetExmasDipomas } from "../../add-edit-exam/hooks/get-data-exam-hook";

export function FilterExam({
  onFilter,
  onReset,
}: {
  onFilter: (filters: {
    search: string;
    immutable: boolean | undefined;
    diplomaId: string | undefined;
  }) => void;
  onReset: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const diplomas = useGetExmasDipomas();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: DEFAULT_EXAMS_FILTERS,
  });

  const handleReset = () => {
    reset(DEFAULT_EXAMS_FILTERS);
    onReset();
  };
  const diplomsData = useMemo(
    () =>
      diplomas.data?.data.flatMap((diploma) => [
        {
          id: diploma.id,
          title: diploma.title,
        },
      ]) ?? [],
    [diplomas.data],
  );

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-full min-w-0 flex-col gap-2   mb-4 transition-all bg-blue-600 "
    >
      <div className="flex w-full min-w-0 items-center justify-between gap-4 px-4  py-2 ">
        <h4 className="text-sm font-semibold flex items-center gap-2 text-white">
          <SlidersHorizontal size={20} />
          <span className="text-[16px] font-inter font-semibold">
            Search & Filters
          </span>
        </h4>
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-center gap-1 text-white">
            {isOpen ? (
              <ChevronsDownUp className="rotate-180" size={18} />
            ) : (
              <ChevronsUpDown className="rotate-0" size={18} />
            )}
            <span className="text-sm font-semibold">
              {isOpen ? "Hide" : "Show"}
            </span>
          </button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="flex w-full min-w-0 flex-col gap-4 p-4 sm:p-5 bg-white">
        <form onSubmit={handleSubmit(onFilter)} className="flex w-full min-w-0 flex-col gap-4">
          {/* Search */}
          <div className="border flex w-full min-w-0 p-4 text-sm bg-white border-gray-200">
            <input
              {...register("search")}
              type="text"
              className="w-full h-full min-w-0 outline-none font-mono"
              placeholder="Search by Name or Description"
            />
            <Search size={20} className="text-gray-200 shrink-0" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 min-w-0">
            <div className="border border-gray-200 px-4 py-3 text-sm flex justify-between w-full max-w-full sm:w-[320px] min-w-0 bg-transparent">
              <select
                {...register("diplomaId", {
                  setValueAs: (v) => (v === "" ? undefined : v),
                })}
                className="font-mono bg-transparent text-gray-500 outline-none cursor-pointer flex-1 appearance-none"
              >
                <option value="">None</option>
                {diplomsData.map((diploma) => (
                  <option key={diploma.id} value={diploma.id}>
                    {diploma.title}
                  </option>
                ))}
              </select>
              <ChevronsDownUp
                size={16}
                className="text-gray-500 pointer-events-none"
              />
            </div>
            {/* Immutable */}
            <div className="border border-gray-200 px-4 py-3 text-sm flex justify-between w-full max-w-full sm:w-[320px] min-w-0 bg-transparent">
              <select
                {...register("immutable", {
                  setValueAs: (v) => (v === "" ? undefined : v === "true"),
                })}
                className="font-mono bg-transparent text-gray-500 outline-none cursor-pointer flex-1 appearance-none"
              >
                <option value="">None</option>
                <option value="true">Immutable</option>
              </select>
              <ChevronsDownUp
                size={16}
                className="text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row-reverse flex-wrap gap-4 max-sm:w-full max-sm:flex-col">
            <button
              type="submit"
              className="bg-gray-200 cursor-pointer  text-gray-800 py-2 px-4  font-mono w-25 max-sm:w-full"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={handleReset}
              className=" p-2 text-gray-800 font-mono w-25 max-sm:w-full"
            >
              Clear
            </button>
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}
