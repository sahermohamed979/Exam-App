import AppSidebarAdmin from "@/src/features/dashboard-admin/(diplomas)/dashborad/components/app-sidebar-admin";
import { TooltipProvider } from "@/src/shared/components/ui/tooltip";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <AppSidebarAdmin />
      {children}
    </TooltipProvider>
  );
}
