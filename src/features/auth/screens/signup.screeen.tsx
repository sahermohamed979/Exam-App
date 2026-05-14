import AuthHero from "../components/authhero";
import SignUpForm from "../components/signup.form";

export default function SignUpScreen() {
  return (
    <main className=" grid grid-cols-1 lg:grid-cols-2 gap-12 ">
      <AuthHero />
      <SignUpForm />
    </main>
  );
}
