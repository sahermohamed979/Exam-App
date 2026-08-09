"use client";

import { useForm, Controller } from "react-hook-form";
import {
  ChevronsDownUp,
  ChevronsUpDown,
  SlidersHorizontal,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/src/shared/components/ui/collapsible";
import { DEFAULT_USER_LOGS_FILTERS } from "@/src/shared/constants/api.constants";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
  SelectItem,
} from "@/src/shared/components/ui/select";
import { LOGS_ACTION, LOGS_CATEGORY } from "../constants/logs.options";
import { UseGetAllUsers } from "../hooks/logs-hooks";
import { useMemo, useState } from "react";
import { IUsers } from "../types/log";

export function FilterLogs({
  onFilter,
  onReset,
}: {
  onFilter: (filters: {
    category: string;
    action: string;
    actorUserId: string;
    sortBy: string;
    sortOrder: string;
  }) => void;
  onReset: () => void;
}) {
  const { data: users } = UseGetAllUsers();
  const [resetKey, setResetKey] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const usersList = useMemo<IUsers[]>(() => {
    if (users && "data" in users) {
      return users.data;
    }
    return [];
  }, [users]);
  const { handleSubmit, reset, control } = useForm({
    defaultValues: DEFAULT_USER_LOGS_FILTERS,
  });

  const handleReset = () => {
    reset(DEFAULT_USER_LOGS_FILTERS);
    setResetKey((k) => k + 1);

    onReset();
  };

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
      {/* className="font-mono bg-transparent text-gray-500 outline-none cursor-pointer flex-1 appearance-none" */}

      <CollapsibleContent className="flex w-full min-w-0 flex-col gap-4 p-4 sm:p-5 bg-white">
        <form
          onSubmit={handleSubmit(onFilter)}
          key={resetKey}
          className="flex w-full min-w-0 flex-col gap-4"
        >
          {/* Search */}

          <div className="flex flex-col sm:flex-row gap-2 min-w-0">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <SelectTrigger className="border flex items-center w-full max-w-full min-w-0 py-6 text-sm bg-white border-gray-200 rounded-none shadow-none h-auto">
                    <span className="flex-1 min-w-0 text-left ml-2 font-mono text-gray-500 break-words">
                      <SelectValue placeholder="Category" />
                    </span>
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="w-[var(--radix-select-trigger-width)] max-h-[200px] font-mono"
                  >
                    {LOGS_CATEGORY.map((log) => (
                      <SelectItem
                        key={log}
                        value={log}
                        className="text-gray-500"
                      >
                        {log}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <ChevronsDownUp
              size={16}
              className="text-gray-500 pointer-events-none max-sm:hidden"
            />

            {/* Immutable */}
            <Controller
              name="action"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <SelectTrigger className="border flex items-center w-full max-w-full min-w-0 py-6 text-sm bg-white border-gray-200 rounded-none shadow-none h-auto">
                    <span className="flex-1 min-w-0 text-left ml-2 font-mono text-gray-500 break-words">
                      <SelectValue placeholder="Action" />
                    </span>
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="w-[var(--radix-select-trigger-width)] max-h-[200px] font-mono"
                  >
                    {LOGS_ACTION.map((action) => (
                      <SelectItem
                        key={action}
                        value={action}
                        className="text-gray-500"
                      >
                        {action}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              name="actorUserId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <SelectTrigger className="border flex items-center w-full max-w-full min-w-0 py-6 text-sm bg-white border-gray-200 rounded-none shadow-none h-auto">
                    <span className="flex-1 min-w-0 text-left ml-2 font-mono text-gray-500 break-words">
                      <SelectValue placeholder="Users" />
                    </span>
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="w-[var(--radix-select-trigger-width)] max-h-[200px] font-mono"
                  >
                    {usersList.map((user: IUsers) => (
                      <SelectItem
                        key={user.id}
                        value={user.id}
                        className="text-gray-500"
                      >
                        {user.firstName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
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
