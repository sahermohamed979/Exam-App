import React from 'react';

interface FormattedDateProps {
  date: string | Date;
  className?: string;
}

export function FormattedDate({ date, className }: FormattedDateProps) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return <span className={className}>Invalid Date</span>;
  }

  const timeString = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateString = dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={`flex flex-col font-mono text-[12px] ${className}`}>
      <span className="text-gray-800 font-bold">{timeString}</span>
      <span className="text-gray-400">{dateString}</span>
    </div>
  );
}
