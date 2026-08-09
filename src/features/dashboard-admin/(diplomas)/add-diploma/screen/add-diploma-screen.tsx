import { IDiploma } from "@/src/features/dashboard-user/dashborad/types/diploma";
import AddForm from "../components/add-form";
import { getDiploma } from "../../selected-diplomas-admin/apis/get-diploma";

export default async function AddDiplomaScreen({
  mode,
  id,
}: {
  mode: "add" | "edit";
  id?: string;
}) {
  const res = mode === "edit" && id ? await getDiploma(id) : undefined;
  const data = res && "id" in res ? (res as IDiploma) : undefined;

  return (
    <div className="bg-[#f5f6f8] min-h-screen w-full min-w-0 p-4 sm:p-8">
      <div className="mx-auto w-full max-w-full min-w-0 bg-white border border-gray-100  overflow-hidden shadow-sm">
        <div
          className={`bg-blue-600 text-white font-semibold px-4 sm:px-6 py-3 text-sm`}
        >
          {mode === "add" ? "Add New Diploma" : "Edit Diploma"}
        </div>

        <div className="p-4 sm:p-6">
          <AddForm mode={mode} id={id} data={data} />
        </div>
      </div>
    </div>
  );
}
