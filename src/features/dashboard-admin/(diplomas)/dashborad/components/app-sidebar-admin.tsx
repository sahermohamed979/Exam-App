import {
  LucideFolderCode,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "../../../../../shared/components/ui/sidebar";
import Image from "next/image";
import { Suspense } from "react";
import UserSideSkeleton from "../../../../dashboard-user/dashborad/skeletons/user-side-skeleton";
import UserSide from "../../../../dashboard-user/dashborad/components/user-side";
import NavLinksAdmin from "./nav-links-admin";

export default function AppSidebarAdmin() {
  return (
    <Sidebar className="max-w-3xl  mx-auto px-8 pt-15 py-10  bg-gray-800">
      <SidebarHeader className=" bg-gray-800">
        <div>
          <Image src="/images/logo2.webp" alt="Logo" width={192} height={192} />
        </div>
        <div className="flex items-center gap-3 font-semibold text-lg text-white mt-2">
          <LucideFolderCode className="w-8 h-8" />
          <span className="font-semibold text-2xl">Exam App</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-gray-800">
        <SidebarGroup />
        <div className="pt-4">
          <NavLinksAdmin />
        </div>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-gray-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <Suspense fallback={<UserSideSkeleton />}>
              <UserSide />
            </Suspense>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
