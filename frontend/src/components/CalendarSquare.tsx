import React from "react";

interface CalendarSquareProps {
  children?: React.ReactNode;
  className?: string;
  row?: number;
  col?: number;
}

const CalendarSquare: React.FC<CalendarSquareProps> = ({
  children,
  className = "",
  row,
  col,
}) => {
  const tooltipText = row && col ? `(${col}, ${row})` : "";

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
