import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
export function formatSlugName(slug: string): string {
  if (!slug) return "";

  return slug
    .replace(/[\s-][0-9a-f]{8}[\s-][0-9a-f]{4}[\s-][0-9a-f]{4}[\s-][0-9a-f]{4}[\s-][0-9a-f]{12}.*/i, "") // ✅ بيمسك spaces و dashes
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .trim();
}
export function extractId(slug: string): string {
  return (
    slug.match(
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
    )?.[0] ?? ""
  );
}
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
