import AppSidebarUser from "@/src/features/dashboard-user/dashborad/components/app-sidebar-user";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppSidebarUser />
      {children}
    </>
  );
}
