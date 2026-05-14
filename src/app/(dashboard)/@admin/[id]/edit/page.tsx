import HeadersAddDiploma from "@/src/features/dashboard-admin/(diplomas)/add-diploma/components/headers";
import AddButtons from "@/src/features/dashboard-admin/(diplomas)/add-diploma/components/title-buttons";
import AddDiplomaScreen from "@/src/features/dashboard-admin/(diplomas)/add-diploma/screen/add-diploma-screen";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  return (
    <main className="w-full">
      <HeadersAddDiploma />
      <AddButtons form="add-diploma-form" title="Edit Diploma" />
      <AddDiplomaScreen mode="edit" id={id} />
    </main>
  );
}
