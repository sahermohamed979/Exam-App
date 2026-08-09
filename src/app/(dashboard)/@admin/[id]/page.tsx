import { getDiploma } from "@/src/features/dashboard-admin/(diplomas)/selected-diplomas-admin/apis/get-diploma";
import Headers from "@/src/features/dashboard-admin/(diplomas)/selected-diplomas-admin/components/headers";
import TitleButtons from "@/src/features/dashboard-admin/(diplomas)/selected-diplomas-admin/components/title-buttons";
import ViewScreenDiploma from "@/src/features/dashboard-admin/(diplomas)/selected-diplomas-admin/screen/veiw-screen-diploma";
import { SelectedDiplomaSkeleton } from "@/src/features/dashboard-admin/(diplomas)/selected-diplomas-admin/skeleton/selected-diploma-skeleton";
import { Suspense } from "react";

export default async function page({
  searchParams,
  params,
}: {
  params: Promise<{ id: string }>;

  searchParams: { diploma?: string };
}) {
  const { diploma } = await searchParams;
  const { id } = await params;
  const diplomaPromise = getDiploma(id);

  return (
    <main className="w-full min-w-0">
      <Headers prams={{ diploma }} />
      <TitleButtons params={{ id, diploma }} />
      <div className="p-4 w-full min-w-0  bg-gray-100">
        {" "}
        <Suspense fallback={<SelectedDiplomaSkeleton />}>
          <ViewScreenDiploma diplomaPromise={diplomaPromise} />
        </Suspense>{" "}
      </div>
    </main>
  );
}
