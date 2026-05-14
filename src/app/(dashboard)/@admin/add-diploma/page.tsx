import HeadersAddDiploma from "@/src/features/dashboard-admin/(diplomas)/add-diploma/components/headers";
import AddButtons from "@/src/features/dashboard-admin/(diplomas)/add-diploma/components/title-buttons";
import AddDiplomaScreen from "@/src/features/dashboard-admin/(diplomas)/add-diploma/screen/add-diploma-screen";

export default function page() {
  return (
    <main className="w-full">
      <HeadersAddDiploma />
      <AddButtons form="add-diploma-form" title="Add Diploma" />

      <AddDiplomaScreen mode="add" />
    </main>
  );
}
