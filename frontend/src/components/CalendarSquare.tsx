import React from "react";

interface CalendarSquareProps {
  dateRange: { startDate: Date; endDate: Date };
  children?: React.ReactNode;
  className?: string;
}

const CalendarSquare: React.FC<CalendarSquareProps> = ({
  children,
  className = "",
  dateRange,
}) => {
  function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      timeZone: "UTC",
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  }

  const tooltipText = `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`;

  return (
    <div
      className={`bg-base-200 border-base-300 tooltip flex min-w-0 flex-1 items-center justify-center border ${className}`}
      data-tip={tooltipText}
    >
      {children}
    </div>
  );
};

export default CalendarSquare;
