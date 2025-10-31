import React from "react";
import CalendarSquare from "./CalendarSquare";

interface CalendarProps {
  rows: number;
  cols: number;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({ rows, cols, className = "" }) => {
  return (
    <div
      className={`grid h-full w-full ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => (
          <CalendarSquare
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex + 1}
            col={colIndex + 1}
          />
        )),
      )}
    </div>
  );
};

export default Calendar;
