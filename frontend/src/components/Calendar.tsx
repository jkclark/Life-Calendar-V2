import React from "react";
import CalendarSquare from "./CalendarSquare";

interface CalendarProps {
  rows: number;
  cols: number;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({ rows, cols, className = "" }) => {
  // Helper function to determine if a number should be shown on axis
  const shouldShowNumber = (num: number) => num === 1 || num % 10 === 0;

  return (
    <div className={`h-full w-full ${className}`}>
      {/* Overall grid: top-left empty, top axis, left axis, main calendar */}
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `1rem repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `1.5rem repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {/* Empty top-left corner */}
        <div></div>

        {/* Top axis (column numbers) */}
        {Array.from({ length: cols }, (_, colIndex) => {
          const colNumber = colIndex + 1;
          return (
            <div
              key={`col-${colIndex}`}
              className="flex items-center justify-center text-xs text-gray-600"
            >
              {shouldShowNumber(colNumber) ? colNumber : ""}
            </div>
          );
        })}

        {/* Left axis and calendar rows */}
        {Array.from({ length: rows }, (_, rowIndex) => {
          const rowNumber = rowIndex + 1;
          return [
            // Left axis (row number)
            <div
              key={`row-${rowIndex}`}
              className="flex items-center justify-center text-xs text-gray-600"
            >
              {shouldShowNumber(rowNumber) ? rowNumber : ""}
            </div>,
            // Calendar squares for this row
            ...Array.from({ length: cols }, (_, colIndex) => (
              <CalendarSquare
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex + 1}
                col={colIndex + 1}
              />
            )),
          ];
        }).flat()}
      </div>
    </div>
  );
};

export default Calendar;
