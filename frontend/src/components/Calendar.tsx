import React from "react";
import CalendarSquare from "./CalendarSquare";

interface CalendarProps {
  rows: number;
  cols: number;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({ rows, cols, className = "" }) => {
  const totalSquares = rows * cols;

  return (
    <div
      className={`grid h-full w-full gap-1 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: totalSquares }, (_, index) => (
        <CalendarSquare key={index}></CalendarSquare>
      ))}
    </div>
  );
};

export default Calendar;
