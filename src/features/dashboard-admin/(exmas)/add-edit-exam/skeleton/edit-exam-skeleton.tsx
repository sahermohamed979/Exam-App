import React from "react";

export default function EditExamSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 rounded w-1/3" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-8 bg-gray-200 rounded" />
        <div className="h-8 bg-gray-200 rounded" />
      </div>

      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-2/3" />
        <div className="h-40 bg-gray-200 rounded" />
      </div>

      <div className="flex items-center gap-4">
        <div className="h-10 w-32 bg-gray-200 rounded" />
        <div className="h-10 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
