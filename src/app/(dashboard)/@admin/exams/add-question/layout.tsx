import HeaderAddQuestion from "@/src/features/dashboard-admin/add-edit-question/components/header-add-question";
import AddQuestionButtons from "@/src/features/dashboard-admin/add-edit-question/components/add-question-button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full bg-[#f8fafc]">
      <HeaderAddQuestion />
      <AddQuestionButtons mode="add" />
      {children}
    </main>
  );
};
export default Layout;
