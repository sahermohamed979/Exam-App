import { Suspense } from "react";
import { getLogsById } from "@/src/features/dashboard-admin/logs/apis/logs.action";
import Header_logs_veiw from "@/src/features/dashboard-admin/logs/components/header-logs-veiw";
import TitleButtonsLogsView from "@/src/features/dashboard-admin/logs/components/title-button-logs";
import { extractId } from "@/src/shared/components/lib/utils";
import Veiw_logs_screen from "@/src/features/dashboard-admin/logs/screen/veiw-los-screen";
import { Ilogs } from "@/src/features/dashboard-admin/logs/types/log";
import { SelectedDiplomaSkeleton } from "@/src/features/dashboard-admin/(diplomas)/selected-diplomas-admin/skeleton/selected-diploma-skeleton";
export default async function page({
  searchParams,
  params,
}: {
  params: Promise<{ log: string }>;
  searchParams: Promise<{ logs?: string }>;
}) {
  const { log: logSlug } = await params;
  const logId = extractId(logSlug);
  const data = getLogsById(logId);

  return (
    <main className=" w-full">
      <Header_logs_veiw prams={{ log: logSlug }} />
      <TitleButtonsLogsView params={{ id: logSlug }} />

      <div className="p-4  bg-gray-100 max-h-[700px] ">
        <Suspense fallback={<SelectedDiplomaSkeleton />}>
          <Veiw_logs_screen logData={data as Promise<Ilogs>} />
        </Suspense>
      </div>
    </main>
  );
}
