import { cn } from "@/src/shared/components/lib/utils";
import useSubmitExam from "../hooks/submissions-hook";
import { IAnalytics, ISubmitExam } from "../types/submit";
import CircularProgress from "./circular-progress";

export default function ResultScreen({
  mutation,
}: {
  mutation: ReturnType<typeof useSubmitExam>;
}) {
  const { data: response } = mutation;
  const { submission, analytics } = response as ISubmitExam<IAnalytics>;

  const percentage = Math.round(
    (submission.correctAnswers / submission.totalQuestions) * 100,
  );

  return (
    <div className="flex flex-col gap-1 px-2 sm:px-4 w-full max-w-full min-w-0">
      <h2 className="font-mono text-xl sm:text-2xl text-semibold text-blue-600 break-words">
        Results:
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-8 gap-3 my-5 w-full max-w-full min-w-0">
        {/* {submission side} */}
        <div className="col-span-1 sm:col-span-2 bg-blue-50 border border-blue-200 min-w-0">
          <div className="flex items-center justify-center w-full h-full flex-col gap-2 py-4 sm:py-0">
            <div className="scale-[0.85] sm:scale-100 origin-center">
              <CircularProgress
                value={percentage}
                takneColor="#00bc7d"
                trackColor="#ef4444"
                className="rotate-1 scale-y-[-1] "
                size={209}
                strokeWidth={40}
              />
            </div>
            {/*  results */}

            <div className="flex-col flex mt-2 sm:mt-4">
              <div className="font-mono text-semibold flex items-center gap-2">
                <div className="w-4 h-4 shrink-0 bg-emerald-500" />
                Correct: {submission?.correctAnswers}
              </div>
              <div className="font-mono text-semibold flex items-center gap-2">
                <div className="w-4 h-4 shrink-0 bg-red-500" />
                Incorrect: {submission.wrongAnswers}
              </div>
            </div>
          </div>
        </div>

        {/* {question result} */}
        <div className="col-span-1 sm:col-span-6 border-blue-200 border-dashed border p-2 h-[480px] exam-scroll overflow-y-auto overflow-x-hidden min-w-0">
          {analytics?.map((question, i: number) => (
            <ul key={i} className="my-2.5 px-1 sm:px-2">
              <h3 className="font-mono text-base sm:text-xl font-semibold text-blue-600 break-words">
                {question.questionText}
              </h3>

              {!question.isCorrect && (
                <li className="bg-red-50 p-3 sm:p-4 my-2 flex items-center gap-2 min-w-0">
                  <div className="w-4 h-4 shrink-0 rounded-full border border-red-500 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  </div>
                  <span className="text-gray-800 font-mono text-sm font-normal break-words min-w-0">
                    {question.selectedAnswer.text}
                  </span>
                </li>
              )}

              <li className="bg-green-50 p-3 sm:p-4 my-2 flex items-center gap-2 min-w-0">
                <div className="w-4 h-4 shrink-0 rounded-full border border-green-500 flex items-center justify-center">
                  <div
                    className={cn(
                      `w-2.5 h-2.5 rounded-full bg-green-500`,
                      question.selectedAnswer.id === question.correctAnswer.id
                        ? "bg-green-500"
                        : "bg-transparent",
                    )}
                  />
                </div>
                <span className="text-gray-800 font-mono text-sm font-normal break-words min-w-0">
                  {question.correctAnswer.text}
                </span>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
