"use client";
import { GraduationCap, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LinksNav() {
  const pathname = usePathname();
  const isAccount = pathname.startsWith("/account");

  return (
    <ul className=" space-y-3 flex flex-col">
      <Link href={"/"}>
        <li
          className={`${
            !isAccount
              ? "bg-[#dbeafe] border border-blue-600 text-blue-600"
              : "text-gray-500 border border-transparent"
          } flex items-center gap-3 p-4 `}
        >
          <GraduationCap /> <span>Diplomas</span>
        </li>
      </Link>
      <Link href={"/account"}>
        <li
          className={`${
            isAccount
              ? "bg-[#dbeafe] border border-blue-600 text-blue-600 "
              : "text-gray-500 border border-transparent"
          } flex items-center gap-3 p-4 `}
        >
          <User /> <span>Account Settings</span>
        </li>
      </Link>
    </ul>
  );
}
