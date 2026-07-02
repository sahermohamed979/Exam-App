import AuthHero from "../components/authhero";
import LoginForm from "../components/login.form";

export default function LoginScreen() {
  return (
    <main className=" grid grid-cols-1 lg:grid-cols-2 gap-12 ">
        <AuthHero   />
        <LoginForm />
    </main>
  );
}
