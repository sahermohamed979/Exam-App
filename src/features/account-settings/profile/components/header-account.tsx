import BackButton from "@/src/shared/components/ui/backButton";
import { User } from "lucide-react";

export default function HeaderAccount() {
  
  return (
    <>
    
      <header className="mb-3 w-full max-w-full text-gray-400 break-words">Account</header>

      <div className="flex items-center gap-3 mb-3 w-full max-w-full text-white">
        <BackButton />{" "}
        <div className="flex items-center gap-2 sm:gap-3 bg-blue-600 w-full max-w-full min-w-0 p-2 py-3">
          <User size={28} className="shrink-0 sm:hidden" />
          <User size={45} className="hidden sm:block shrink-0" />
          <h1 className="text-xl sm:text-3xl font-semibold capitalize max-sm:truncate min-w-0">
            Account Settings
          </h1>
        </div>
      </div>
    </>
  );
}
