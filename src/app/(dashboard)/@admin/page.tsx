import DashboardScreenAdmin from "@/src/features/dashboard-admin/(diplomas)/dashborad/screen/dashboard-screen-admin";
import Headers from "@/src/features/dashboard-admin/(diplomas)/dashborad/components/headers";

export default function page() {
  return (
    <main className=" w-full min-w-0">
      <Headers />
      <DashboardScreenAdmin />;
    </main>
  );
}
