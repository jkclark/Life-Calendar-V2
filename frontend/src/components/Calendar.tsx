import React, { useMemo } from "react";
import { getDateRangeForRowCol } from "../calendarUtils";
import CalendarSquare from "./CalendarSquare";

interface CalendarProps {
  rows: number;
  cols: number;
  startDate: Date;
  className?: string;
  style?: React.CSSProperties;
}

const Calendar: React.FC<CalendarProps> = ({
  rows,
  cols,
  startDate,
  className = "",
  style,
}) => {
  // Memoize date ranges to avoid recalculating on every render
  const dateRanges = useMemo(() => {
    const ranges: { [key: string]: { startDate: Date; endDate: Date } } = {};
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let colIndex = 0; colIndex < cols; colIndex++) {
        const key = `${rowIndex}-${colIndex}`;
        ranges[key] = getDateRangeForRowCol(rowIndex, colIndex, startDate);
      }
    }
    return ranges;
  }, [rows, cols, startDate]);

  // Helper function to determine if a number should be shown on axis
  const shouldShowNumber = (num: number) =>
    num + 1 === 1 || (num + 1) % 10 === 0;

  return (
    <div className={`w-full ${className}`} style={style}>
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
          const colNumber = colIndex;
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
          return [
            // Left axis (row number)
            <div
              key={`row-${rowIndex}`}
              className="flex items-center justify-center text-xs text-gray-600"
            >
              {shouldShowNumber(rowIndex) ? rowIndex : ""}
            </div>,
            // Calendar squares for this row
            ...Array.from({ length: cols }, (_, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              const dateRange = dateRanges[key];
              return <CalendarSquare key={key} dateRange={dateRange} />;
            }),
          ];
        }).flat()}
      </div>
    </div>
  );
};

export default Calendar;
