import { Ilogs } from "../types/log";
import { ExternalLink } from "lucide-react";

export default async function Veiw_logs_screen({
  logData,
}: {
  logData: Promise<Ilogs>;
}) {
  const data = await logData;
  

  const getActionColor = (action: string) => {
    const upperAction = action.toUpperCase();
    if (upperAction === "UPDATE") return "text-amber-600";
    if (upperAction === "DELETE") return "text-red-600";
    if (upperAction === "CREATE") return "text-green-600";
    return "text-blue-600";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };



  return (
    <div className="w-full bg-white border border-gray-200 p-8 text-sm text-gray-700">
      <div className="flex flex-col  gap-3 mb-4">
        <div>
          <p className="text-xs text-gray-400 uppercase mb-1 font-mono">Action</p>
          <p className={`font-semibold ${getActionColor(data.action)}`}>
            {data.action}
          </p>
        </div>

        <div className="">
          <p className="text-xs text-gray-400 uppercase mb-1 font-mono">Method</p>
          <p className="text-gray-700 font-medium font-mono">{data.httpMethod}</p>
        </div>
      </div>

      {/* User */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 uppercase mb-2 font-mono">User</p>
        <p className="font-medium text-gray-900 font-mono">{data.actorUsername}</p>
        <p className="text-gray-500 text-sm font-mono">Email: {data.actorEmail}</p>
        <p className="text-gray-500 text-sm font-mono">IP Address: {data.ipAddress}</p>
        <p className="text-sm mt-1 font-mono">
          Role:{" "}
          <span className="text-red-500 font-medium font-mono">{data.actorRole}</span>
        </p>
      </div>

      {/* Entity */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 uppercase mb-2 font-mono">Entity</p>
        <div className="flex items-center gap-2 text-gray-800">
          <span>
            {data.entityType}: {data.entityId}
          </span>
          <ExternalLink size={14} className="text-gray-400" />
        </div>
      </div>

      {/* Date */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 uppercase mb-2 font-mono">Date & Time</p>
        <p className="text-gray-800 font-mono">{formatDate(data.createdAt)}</p>
      </div>

      {/* Updated Fields */}
   

      {/* Metadata */}
      <div>
        <p className="text-xs text-gray-400 uppercase mb-2 font-mono">Metadata</p>
        <div className="bg-gray-100 rounded p-3 text-xs text-gray-700 overflow-auto">
          <div className="space-y-1 text-sm font-mono">
            {data.metadata && typeof data.metadata === "object" ? (
              Object.entries(data.metadata).map(([key, value]) => (
                <p key={key} className="font-mono">
                  <span className="text-gray-500 font-mono">{key}</span>:{" "}
                  <span className="text-gray-800 font-mono">{String(value)}</span>
                </p>
              ))
            ) : (
              <p className="text-gray-500 font-mono">No metadata</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
