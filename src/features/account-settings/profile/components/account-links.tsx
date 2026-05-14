"use client";

import { CircleUser, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-4 ">
      <li
        className={
          pathname === "/account"
            ? "text-blue-600 bg-blue-50"
            : "text-gray-500"
        }
      >
        <Link
          href="/account"
          className="flex  p-3 gap-2 font-mono text-[16px]"
        >
          <CircleUser size={24} />
          Profile
        </Link>
      </li>
      <li
        className={
          pathname === "/account/change-password"
            ? "text-blue-600 bg-blue-50"
            : "text-gray-500"
        }
      >
        <Link
          className="flex  p-3 gap-2 font-mono text-[16px]"
          href="/account/change-password "
        >
          <Lock />
          Change Password
        </Link>
      </li>
    </ul>
  );
}
