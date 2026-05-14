"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutAccount() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-red-50  px-4 py-3 w-full   text-red-600 flex gap-2 cursor-pointer"
    >
      <LogOut className="rotate-180" size={24} />
      Log out
    </button>
  );
}
