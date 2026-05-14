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
import { DEFAULT_FILTERS } from "@/src/shared/constants/api.constants";

export function FilterDashboard({
  onFilter,
  onReset,
}: {
  onFilter: (filters: {
    search: string;
    immutable: boolean | undefined;
  }) => void;
  onReset: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: DEFAULT_FILTERS,
  });

  const handleReset = () => {
    reset(DEFAULT_FILTERS);
    onReset();
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-full flex-col gap-2   mb-4 transition-all bg-blue-600 "
    >
      <div className="flex items-center justify-between gap-4 px-4  py-2 ">
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

      <CollapsibleContent className="flex flex-col gap-4 p-5 bg-white">
        <form onSubmit={handleSubmit(onFilter)} className="flex flex-col gap-4">
          {/* Search */}
          <div className="border flex p-4 text-sm bg-white border-gray-200">
            <input
              {...register("search")}
              type="text"
              className="w-full h-full outline-none font-mono"
              placeholder="Search by Name or Description"
            />
            <Search size={20} className="text-gray-200" />
          </div>

          {/* Immutable */}
          <div className="border border-gray-200 px-4 py-3 text-sm flex justify-between w-[320px] bg-transparent">
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

          {/* Buttons */}
          <div className="flex flex-row-reverse gap-4">
            <button
              type="submit"
              className="bg-gray-200  text-gray-800 py-2 px-4  font-mono w-25"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={handleReset}
              className=" p-2 text-gray-800 font-mono w-25"
            >
              Clear
            </button>
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}
