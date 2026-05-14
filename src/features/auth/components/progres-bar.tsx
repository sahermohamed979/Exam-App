type Props = {
  step: number;
  totalSteps: number;
  className?: string;
};

export default function ProgressBar({ step, totalSteps, className }: Props) {
  const solidWidth =
    step === 1
      ? "0%"
      : `calc(${((step - 1) / (totalSteps - 1)) * 100}% - 20px)`;

  // Dashed line start position
  const dashedLeft = `calc(${((step - 1) / (totalSteps - 1)) * 100}% + 20px)`;

  return (
    <div className={`relative flex items-center w-full  h-5   ${className}`}>
      {/* Solid line: start → current step */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-blue-600 transition-all duration-500 ease-in-out"
        style={{
          left: "16px",
          width: solidWidth,
          opacity: step > 1 ? 1 : 0,
        }}
      />

      {/* Dashed line: current step → end */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-0 border-t-2 border-dashed border-blue-500 transition-all duration-500 ease-in-out"
        style={{
          left: dashedLeft,
          right: "16px",
          opacity: step < totalSteps ? 1 : 0,
        }}
      />

      {/* Steps */}
      <div className="absolute inset-0 flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => {
          const isCompleted = s < step;
          const isActive = s === step;

          return (
            <div
              key={s}
              className="relative flex items-center justify-center shrink-0 w-5 h-5 z-10 cursor-pointer"
            >
              {/* Glow ring — active only */}
              <div
                className={`absolute inset-0 rotate-45 bg-blue-100 transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Diamond */}
              <div
                className={`
                  relative rotate-45 shrink-0 transition-all duration-500
                  ${isActive ? "w-2.5 h-2.5" : "w-3 h-3"}
                  ${isCompleted || isActive ? "bg-blue-600" : "bg-blue-50 border border-blue-500"}
                `}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
