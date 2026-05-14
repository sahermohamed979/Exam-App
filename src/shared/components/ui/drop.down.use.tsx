"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { EllipsisVertical, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function DropdownUse({ role }: { role?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-transparent border-0 ">
        <button className="h-8 w-8 p-0 rounded-md">
          <EllipsisVertical
            size={18}
            className={`r${role === "ADMIN" ? " text-gray-400" : " text-gray-800"}`}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="w-4 h-4 " />
            <Link href="/account">Account</Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-[#dc2626]"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="w-4 h-4 " />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
