import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { Ilogs } from "../types/log";
import { FormattedDate } from "@/src/shared/components/ui/formatted-date";
import { Ellipsis, Eye,  Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu";
import Link from "next/link";
import { deleteLogsById } from "../apis/logs.action";
import { generateSlug } from "@/src/shared/components/lib/utils";

const corls = {
  method: {
    CREATE: "text-emerald-600 font-bold font-mono  text-sm  ",
    UPDATE: "text-yellow-600 font-bold font-mono  text-sm  ",
    DELETE: "text-red-600 font-bold font-mono  text-sm  ",
  },
  roleColor: {
    SUPER_ADMIN: "text-red-600 font-medium font-mono  text-[12px]  ",
    ADMIN: "text-blue-600 font-medium font-mono  text-[12px]  ",
  },
};
function LogActions({ log }: { log: Ilogs }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#475569] rounded transition-colors inline-flex items-center justify-center">
          <Ellipsis size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem className=" cursor-pointer">
          <Link
            href={`/logs/${generateSlug(
              `${log.category} ${log.httpMethod} by ${log.actorUsername}`,
            )}-${log.id}`}
            className="flex items-center gap-2"
          >
            <Eye size={18} />
            <span>View</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <button
            onClick={async () => {
              await deleteLogsById(log.id);
            }}
            className="flex items-center gap-2"
          >
            <Trash2 size={18} className="text-red-600" />
            <span className="text-red-600">Delete</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TableLogs({ logs }: { logs: Ilogs[] }) {
  return (
    <>
      <div className="hidden md:block w-full max-w-full min-w-0">
        <Table>
      <TableHeader className="bg-blue-600  ">
        <TableRow>
          <TableHead className="w-[120px]  ">Action</TableHead>
          <TableHead className="w-[250px]  ">User</TableHead>
          <TableHead className="w-[300px] ">Entity</TableHead>
          <TableHead className="w-[200px] ">time</TableHead>
          <TableHead className="w-[80px] ">sort</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white ">
        {logs.map((log, i) => (
          <TableRow key={i}>
            <TableCell
              className={`${corls.method[log.action as keyof typeof corls.method] || " text-gray-800"}  $ {"  flex flex-col gap-1   justify-center"}`}
            >
              {log.action}
              <span className="text-gray-400 font-semibold  font-mono text-[12px]">
                Method: {log.httpMethod}{" "}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex flex-col ">
                <span className=" font-medium  font-mono text-sm text-gray-800 capitalize">
                  {log.actorUsername}
                </span>
                <span className=" font-medium font-mono text-gray-400 text-[12px] ">
                  {log.actorEmail}
                </span>
                <span
                  className={`   ${corls.roleColor[log.actorRole as keyof typeof corls.roleColor]}`}
                >
                  {log.actorRole.charAt(0).toUpperCase() +
                    log.actorRole.slice(1).toLowerCase()}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-gray-800 font-mono text-[16px] capitalize">

              {log.entityType }
              <p className="text-gray-400 font-mono text-[12px]">
                {log.entityId}
              </p>
            </TableCell>
            <TableCell>
              <FormattedDate date={log.createdAt} />
            </TableCell>
            <TableCell>
              <LogActions log={log} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
        </Table>
      </div>

      <div className="md:hidden flex w-full min-w-0 flex-col gap-4">
        {logs.map((log, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-md p-4 w-full min-w-0"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p
                  className={`${corls.method[log.action as keyof typeof corls.method] || "text-gray-800"} text-sm`}
                >
                  {log.action}
                </p>
                <p className="text-gray-400 font-semibold font-mono text-[12px]">
                  Method: {log.httpMethod}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[12px] text-gray-400">
                  <FormattedDate date={log.createdAt} />
                </span>
                <LogActions log={log} />
              </div>
            </div>

            <div className="mt-3 min-w-0">
              <p className="text-sm font-medium text-slate-400">User</p>
              <p className="font-medium font-mono text-sm text-gray-800 capitalize break-words min-w-0">
                {log.actorUsername}
              </p>
              <p className="font-medium font-mono text-gray-400 text-[12px] break-words min-w-0">
                {log.actorEmail}
              </p>
              <p
                className={`${corls.roleColor[log.actorRole as keyof typeof corls.roleColor]} capitalize`}
              >
                {log.actorRole.charAt(0).toUpperCase() +
                  log.actorRole.slice(1).toLowerCase()}
              </p>
            </div>

            <div className="mt-3 min-w-0">
              <p className="text-sm font-medium text-slate-400">Entity</p>
              <p className="text-gray-800 font-mono text-[16px] capitalize break-words min-w-0">
                {log.entityType}
              </p>
              <p className="text-gray-400 font-mono text-[12px] break-words min-w-0">
                {log.entityId}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
