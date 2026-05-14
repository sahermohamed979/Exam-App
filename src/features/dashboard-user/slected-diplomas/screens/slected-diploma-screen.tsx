"use client";
import { useParams } from "next/navigation";
import UseExamList from "../hooks/use-exam-list";
import CardExam from "../components/card-exam";
import EndList from "@/src/shared/components/ui/end-list";
import HeaderUserDashboard from "@/src/features/dashboard-user/slected-diplomas/components/header-usre-dashboard";
import ExamSkeleton from "../skeletons/Exam-Skeleton";
import { formatSlugName } from "@/src/shared/components/lib/utils";

export default function SlectedDiplomaScreen() {
  const params = useParams();
  const { data, isLoading } = UseExamList(params.id as string);

  return (
    <>
      <HeaderUserDashboard title={params.id as string} />
      <div className="p-2">
        <div className="relative flex flex-col gap-3 bg-white">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <ExamSkeleton key={i} />)
            : data?.exams?.map((exam) => (
                <CardExam key={exam.id} exams={exam} />
              ))}
          {!isLoading && <EndList />}
        </div>
      </div>
    </>
  );
}
