import { ChevronDown } from "lucide-react";

export default function ScrollMore() {
  return (
    <div className=" flex  items-center  z-0 gap-1  bg-[#f9fafb]  flex-col sticky bottom-0 left-0 right-0">
      <h2 className="text-1xl text-gray-400 font-semibold py-2 ">
        Scroll to view more
      </h2>
      <ChevronDown size={20} className="animate-bounce text-gray-400" />
    </div>
  );
}
