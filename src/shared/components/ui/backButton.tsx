"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="border border-blue-600 px-2 py-4 cursor-pointer md:py-6"
    >
      <ChevronLeft size={20} color="#3b82f6" />
    </button>
  );
}
