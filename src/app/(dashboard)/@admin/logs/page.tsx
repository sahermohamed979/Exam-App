import Headers from "@/src/features/dashboard-admin/logs/components/headers";
import LogsScreen from "@/src/features/dashboard-admin/logs/screen/logs-screen";

export default function page() {
  return (
    <main className=" w-full">
      <Headers />
      <div className=" border-b border-gray-100 w-full mt-4" />

      <LogsScreen />
    </main>
  );
}
