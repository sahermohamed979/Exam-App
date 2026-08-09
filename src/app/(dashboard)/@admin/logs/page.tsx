import Headers from "@/src/features/dashboard-admin/logs/components/headers";
import LogsScreen from "@/src/features/dashboard-admin/logs/screen/logs-screen";

export default function page() {
  return (
    <main className="w-full min-w-0">
      <Headers />
      <div className="border-b border-gray-100 w-full min-w-0 mt-4" />

      <LogsScreen />
    </main>
  );
}
