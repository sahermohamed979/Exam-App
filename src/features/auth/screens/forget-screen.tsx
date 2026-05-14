import AuthHero from "../components/authhero";
import ForgetForm from "../components/forget-form";

export default function ForgetScreen() {
  return (
    <main className=" grid grid-cols-1 lg:grid-cols-2 gap-12 ">
      <AuthHero />
      <ForgetForm />
    </main>
  );
}
