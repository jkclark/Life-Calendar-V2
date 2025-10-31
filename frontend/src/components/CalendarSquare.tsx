import React from "react";

interface CalendarSquareProps {
  children?: React.ReactNode;
  className?: string;
}

const CalendarSquare: React.FC<CalendarSquareProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-base-200 border-base-300 flex aspect-square min-w-0 flex-1 items-center justify-center border ${className} `}
    >
      {children}
    </div>
  );
};

export default CalendarSquare;
