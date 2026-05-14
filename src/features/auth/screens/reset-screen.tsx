import AuthHero from "../components/authhero";
import ResetForm from "../components/reset-form";

export default async function ResetScreen() {
  return (
    <main className=" grid grid-cols-1 lg:grid-cols-2 gap-12 ">
      <AuthHero />
      <ResetForm  />
    </main>
  );
}
