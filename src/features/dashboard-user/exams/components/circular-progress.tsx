"use client";


interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  takneColor?: string;
  trackColor?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function CircularProgress({
  value,
  size ,
  strokeWidth ,
  children,
  takneColor,
  trackColor,
  className
}: CircularProgressProps) {
  const radius = (size! - strokeWidth!) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div
      className="relative inline-flex items-center justify-center animate-in fade-in duration-1000"
      style={{ width: size, height: size }}
    >
      <svg className={className} width={size} height={size}>
        <circle
          cx={size! / 2}
          cy={size! / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          
        />
        <circle
          cx={size! / 2}
          cy={size! / 2}
          r={radius}
          fill="none"
          stroke={takneColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
