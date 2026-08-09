"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderUserDashboard from "@/src/features/dashboard-user/slected-diplomas/components/header-usre-dashboard";
import { Progress } from "@/src/shared/components/ui/progress";
import CircularProgress from "@/src/features/dashboard-user/exams/components/circular-progress";
import { Controller, useForm } from "react-hook-form";
import useGetExam from "../hooks/exmas.hook";
import {
  ChevronLeft,
  ChevronRight,
  FolderSearch,
  RotateCcw,
} from "lucide-react";
import {
  extractId,
  formatSlugName,
  formatTime,
} from "@/src/shared/components/lib/utils";
import { useResendTimer } from "@/src/shared/components/hooks/usetimer-hook";
import { Answer, FormValues, Question } from "../types/questions";
import useSubmitExam from "../hooks/submissions-hook";
import ResultScreen from "../components/result.screen";
import Link from "next/link";
import ExamTestSkeleton from "../skeletons/exam-test-skeleton";

export default function ExamTestScreen() {
  const [currentQ, setCurrentQ] = useState(0);
  const [startedAt] = useState(new Date().toISOString());
  const params = useParams();
  const searchParams = useSearchParams();
  const duration = Number(searchParams.get("duration"));
  const [timeLeft] = useState(duration);
  const { remaining, stop, start } = useResendTimer(timeLeft);
  const [step, setStep] = useState<"exam" | "result">("exam");
  const examId = extractId(params.exam as string);
  const { data: questions, isLoading } = useGetExam(examId);
  const mutation = useSubmitExam();

  const form = useForm<FormValues>({
    defaultValues: {
      examId: examId,
      answers: [],
    },
  });

  const currentAnswer = form.watch(`answers.${currentQ}.answerId`);

  useEffect(() => {
    if (questions) {
      const formatted = questions.map((q: Question) => ({
        questionId: q.id,
        answerId: "",
      }));

      form.reset({
        examId: examId,
        answers: formatted,
      });
    }
  }, [questions, examId]);

  const onSubmit = (data: FormValues) => {
    const finalPayload = {
      ...data,
      startedAt,
    };
    mutation.mutate(finalPayload, {
      onSuccess: () => {
        stop();
        sessionStorage.removeItem("exam_timer_expiry");
      },
    });
  };
  useEffect(() => {
    if (mutation.isSuccess) {
      setStep("result");
    }
  }, [mutation.isSuccess]);

  return (
    
    <div className="w-full max-w-full min-w-0">
      <HeaderUserDashboard title={`${params.exam} `} />

      {isLoading || mutation.isPending ? (
        <ExamTestSkeleton />
      ) : (
        <>
          <div className="flex flex-col gap-5 bg-white rounded-lg w-full max-w-full min-w-0">
            {/* Header */}
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-5 px-3 sm:px-4 py-2 w-full max-w-full min-w-0">
              <div className="flex w-full min-w-0 flex-col relative">
                <h2 className="mb-3 font-mono text-[16px] max-sm:mb-10 max-sm:pr-20 max-sm:truncate">
                  {formatSlugName(`${params.exam} `)}
                </h2>

                <Progress
                  value={((currentQ + 1) / (questions?.length || 1)) * 100}
                  className="h-4 rounded-none"
                />

                <div className="flex justify-between absolute right-0 max-sm:static max-sm:mt-1.5 max-sm:right-auto">
                  <span className="text-sm font-mono">
                    Question{" "}
                    <span className="font-semibold text-blue-600">
                      {currentQ + 1}
                    </span>{" "}
                    of {questions?.length || 0}
                  </span>
                </div>
              </div>

              {step === "exam" && (
                <>
                  {" "}
                  <div className="w-px h-12 bg-gray-300 mx-2 shrink-0 hidden sm:block" />
                  <div className="absolute right-3 top-2 shrink-0 origin-center scale-75 sm:static sm:right-auto sm:top-auto sm:scale-100">
                    <CircularProgress
                      value={(remaining / (duration * 60 || 1)) * 100}
                      takneColor="#155dfc"
                      trackColor="#e0e7ff"
                      className="rotate-90 scale-x-[-1]"
                      size={64}
                      strokeWidth={10}
                    >
                      <span className="text-xs font-semibold">
                        {formatTime(remaining)}
                      </span>
                    </CircularProgress>
                  </div>
                </>
              )}
            </div>
            {step === "exam" && (
              <>
                {}
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-3 sm:p-5 w-full max-w-full min-w-0">
                  {questions && (
                    <div className="flex flex-col gap-4 w-full max-w-full min-w-0">
                      {/* Question */}
                      <h2 className="font-mono text-base sm:text-2xl text-blue-600 font-semibold break-words min-w-0">
                        {questions[currentQ].text}
                      </h2>

                      {/* Answers */}
                      {questions[currentQ].answers.map((answer: Answer) => (
                        <div
                          key={answer.id}
                          className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-mono text-sm flex items-center min-w-0 w-full max-w-full"
                        >
                          <Controller
                            control={form.control}
                            name={`answers.${currentQ}.answerId`}
                            render={({ field }) => (
                              <>
                                <input
                                  type="radio"
                                  value={answer.id}
                                  checked={field.value === answer.id}
                                  onChange={() => field.onChange(answer.id)}
                                  id={answer.id}
                                  className=" accent-[#155dfc] ms-2 shrink-0 "
                                  required
                                />
                                <label
                                  className="ms-2 w-full min-w-0 py-4 break-words"
                                  htmlFor={answer.id}
                                >
                                  {answer.text}
                                </label>
                              </>
                            )}
                          />
                        </div>
                      ))}

                      {/* Navigation */}
                      <div className="flex gap-2 mt-7 w-full max-w-full min-w-0">
                        <button
                          disabled={currentQ === 0}
                          type="button"
                          className="px-2 sm:px-4 py-2 sm:py-3 bg-gray-200 text-gray-700 w-full flex items-center justify-center gap-2"
                          onClick={() => setCurrentQ((prev) => prev - 1)}
                        >
                          <ChevronLeft size={18} />
                          <span className="font-mono text-gray-500">
                            Previous
                          </span>
                        </button>

                        {currentQ === (questions?.length || 0) - 1 ? (
                          <button
                            type="submit"
                            disabled={!currentAnswer || mutation.isPending}
                            className="px-2 sm:px-4 py-2 sm:py-3 bg-green-600 text-white w-full flex items-center justify-center gap-2"
                          >
                            Submit
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={!currentAnswer}
                            className="px-2 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white w-full flex items-center justify-center gap-2"
                            onClick={() => setCurrentQ((prev) => prev + 1)}
                          >
                            <span className="font-mono">Next</span>
                            <ChevronRight size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}

            {/*results */}
            {mutation.isPending ? (
              <ExamTestSkeleton />
            ) : (
              step === "result" && (
                <div className="animate-in fade-in duration-1000">
                  <ResultScreen mutation={mutation} />
                  {/*submit */}
                  <div className="flex gap-3 sm:gap-5 items-center w-full max-w-full min-w-0 px-3 sm:px-5 ">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("exam");
                        mutation.reset();
                        form.reset();
                        setCurrentQ(0);
                        start();
                      }}
                      className="px-3 sm:px-4 py-3 bg-gray-200 text-gray-700 w-full flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={18} />
                      Restart
                    </button>
                    <Link
                      href="/"
                      className="px-4 py-3  flex  items-center justify-center gap-3  font-medium  w-full text-white bg-blue-600   font-mono text-sm "
                    >
                      <FolderSearch size={18} />
                      Explore
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
