import { authOptions } from "@/src/auth";
import DropdownUse from "@/src/shared/components/ui/drop.down.use";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function UserSide() {
  const data = await getServerSession(authOptions);
  return (
    <div className="flex items-center gap-3">
      <div
        className={`${data?.user.role == "ADMIN" ? "border-gray-400" : "border-blue-500"} relative shrink-0 w-12 h-12   overflow-hidden shadow-sm`}
      >
        {data?.user?.profilePhoto ? (
          <Image
            src={data.user.profilePhoto}
            alt="User Avatar"
            width={55}
            height={55}
            className="object-cover"
          />
        ) : (
          <div
            className={`flex items-center justify-center w-full bg-linear-to-r ${data?.user.role == "ADMIN" ? "from-gray-500 to-gray-300" : "from-blue-900 to-blue-500"} h-full`}
          ></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        {" "}
        <span className={`block text-lg font-semibold ${data?.user.role == "ADMIN" ? "text-gray-400" : "text-blue-600"} truncate`}>
          {data?.user.firstName}
        </span>
        <p className="text-xs text-gray-400 truncate">
          {data?.user.email}
        </p>{" "}
      </div>
      <div>
        {" "}
        <DropdownUse  role = {data?.user.role} />
      </div>
    </div>
  );
}
