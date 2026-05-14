import * as React from "react";

import { cn } from "@/src/shared/components/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("flex w-full items-center justify-end", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
} & React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        "inline-flex items-center justify-center  border border-gray-300 bg-gray-300",
        "text-sm font-medium text-gray-700 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive && "bg-gray-100 border-gray-400 font-semibold",
        size === "icon" && "h-8 w-8",
        size === "default" && "h-8 w-8",
        size === "sm" && "h-7 w-7",
        size === "lg" && "h-9 w-9",
        className,
      )}
      {...props}
    />
  );
}
function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("text-gray-500", className)}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
    </PaginationLink>
  );
}
function PaginationPageLabel({
  current,
  total,
  className,
}: {
  current: number;
  total: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "px-1 text-sm text-gray-400 font-mono select-none whitespace-nowrap",
        className,
      )}
    >
      Page {current} of {total}
    </span>
  );
}
function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("text-gray-500", className)}
      {...props}
    >
      <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
  );
}
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex h-8 w-8 items-center justify-center text-gray-400",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPageLabel,
  PaginationPrevious,
};
