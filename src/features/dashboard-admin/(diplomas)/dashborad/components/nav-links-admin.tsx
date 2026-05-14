"use client";
import { BookOpen, GraduationCap, Logs, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLinksAdmin() {
  const pathname = usePathname();

  const isDiploma = pathname === "/";
  const isExam = pathname.startsWith("/exams");
  const isAccount = pathname.startsWith("/account");
  const isLogs = pathname.startsWith("/logs");
  return (
    <ul className="space-y-3  ">
      <Link href="/">
        <li
          className={`${
            isDiploma
              ? "bg-gray-700 border border-gray-400 text-white"
              : "text-white border border-transparent"
          } flex items-center gap-3 p-4 `}
        >
          {" "}
          <GraduationCap /> <span>Diplomas</span>
        </li>
      </Link>
      <Link href="/exams">
        <li
          className={`${
            isExam
              ? "bg-gray-700 border border-gray-400 text-white"
              : "text-white border border-transparent"
          } flex items-center gap-3 p-4 `}
        >
          <BookOpen /> <span>Exams</span>
        </li>
      </Link>
      <Link href="/account">
        <li
          className={`${
            isAccount
              ? "bg-gray-700 border border-gray-400 text-white"
              : "text-white border border-transparent"
          } flex items-center gap-3 p-4 `}
        >
          <User /> <span>Account Settings</span>
        </li>
      </Link>
      <Link href="/logs">
        <li
          className={`${
            isLogs
              ? "bg-gray-700 border border-gray-400 text-white"
              : "text-white border border-transparent"
          } flex items-center gap-3 p-4 `}
        >
          <Logs /> <span>Audit Log</span>
        </li>
      </Link>
    </ul>
  );
}
