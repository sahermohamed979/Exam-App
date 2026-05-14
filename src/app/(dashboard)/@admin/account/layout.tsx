import AccountLinks from "@/src/features/account-settings/profile/components/account-links";
import HeaderAccount from "@/src/features/account-settings/profile/components/header-account";
import LogoutAccount from "@/src/features/account-settings/profile/components/logout-account";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 p-4">
      <HeaderAccount />
      <div className="grid grid-cols-8 gap-3 ">
        <aside className="w-full p-6 max-w-4xl mx-auto  col-span-2 flex flex-col justify-between   h-screen max-h-[740px]">
          <AccountLinks />

          <LogoutAccount />
        </aside>

        <div className="col-span-6">{children}</div>
      </div>
    </main>
  );
}
