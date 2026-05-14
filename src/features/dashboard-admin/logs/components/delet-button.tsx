import { Shredder } from "lucide-react";
import { deleteLogs } from "../apis/logs.action";

export default  function DeletButton() {
  return (
    <button
      onClick={async() => {
        await deleteLogs();
      }}
      className="w-[178px] h-[40px]  text-white  bg-red-500 ms-auto  flex gap-2 items-center justify-center cursor-pointer "
    >
      <Shredder size={18} />{" "}
      <span className="font-mono text-sm ">Clear All logs</span>{" "}
    </button>
  );
}
