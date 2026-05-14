import BackButton from "@/src/shared/components/ui/backButton";
import { User } from "lucide-react";

export default function HeaderAccount() {
  
  return (
    <>
    
      <header className="mb-3 text-gray-400">Account</header>

      <div className={`flex items-center gap-3 mb-3 text-white `}>
        <BackButton />{" "}
        <div className="flex items-center gap-3  bg-blue-600 w-full p-2 py-3">
          <User size={45} />
          <h1 className="text-3xl font-semibold capitalize">
            Account Settings
          </h1>
        </div>
      </div>
    </>
  );
}
