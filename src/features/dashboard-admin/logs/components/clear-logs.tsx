import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/components/ui/dialog";
import { LoaderCircle, Shredder, TriangleAlert } from "lucide-react";
import { useClearLogs } from "../hooks/logs-hooks";

export default function ClearLogs() {
  const { mutate: clearLogs, isPending: isLoading } = useClearLogs();
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-red-500 w-full p-4 flex justify-center items-center gap-2 text-white font-mono font-medium  text-sm">
            <Shredder size={18} />
            Clear All Logs
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-[558px]  flex flex-col  justify-center items-center">
          <div className=" bg-red-50  p-8  text-red-600 flex  rounded-full  justify-center items-center    font-mono font-medium  text-sm">
            <span className="  bg-red-100 p-7 rounded-full">
              <TriangleAlert size={50} />
            </span>
          </div>
          <DialogHeader>
            <DialogTitle className="text-red-500 text-lg font-mono text-center">
              Are you sure you want to clear all logs?{" "}
            </DialogTitle>
            <DialogDescription className="text-center font-mono  text-sm text-gray-500 ">
              This action is permanent and cannot be undone.{" "}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="grid grid-cols-2 gap-4 mt-5">
            <DialogClose asChild>
              <button className="w-full bg-gray-200 flex py-4  px-17 cursor-pointer  justify-center align-center text-gray-800 text-sm font-mono ">
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={() => clearLogs()}
              disabled={isLoading}
              className="w-full bg-red-500 py-4  px-17 flex items-center cursor-pointer  justify-center align-center text-white text-sm font-mono "
            >
              {isLoading && <LoaderCircle className="animate-spin mr-2" />}
              Yes, delete{" "}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
