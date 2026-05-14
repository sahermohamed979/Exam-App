import { LucideFolderCode, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "../../../../shared/components/ui/sidebar";
import Image from "next/image";
import LinksNav from "./links-nav";
import UserSide from "./user-side";
import UserSideSkeleton from "../skeletons/user-side-skeleton";
import { Suspense } from "react";

export default function AppSidebarUser() {
  return (
    <Sidebar className="max-w-3xl  mx-auto px-8 pt-15 py-10  bg-[#eff6ff]">
      <SidebarHeader className=" bg-[#eff6ff]">
        <div>
          <Image
            src="/images/Final Logo 1.png"
            alt="Logo"
            width={192}
            height={192}
          />
        </div>
        <div className="flex items-center gap-3 font-semibold text-lg text-blue-600 mt-2">
          <LucideFolderCode className="w-8 h-8" />
          <span className="font-semibold text-2xl">Exam App</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#eff6ff]">
        <SidebarGroup />
        <div className="pt-4">
          <LinksNav />
        </div>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-[#eff6ff]">
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
