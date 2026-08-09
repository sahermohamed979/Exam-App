import { authOptions } from "@/src/auth";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/src/shared/components/ui/sidebar";
import { getServerSession } from "next-auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}
export default async function layout({
  children,
  admin,
  user,
}: Readonly<DashboardLayoutProps>) {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "400px",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      <SidebarTrigger className="fixed right-3 top-2 z-50" size="lg" />

      {children}

      {role === "ADMIN" ? admin : user}
    </SidebarProvider>
  );
}
