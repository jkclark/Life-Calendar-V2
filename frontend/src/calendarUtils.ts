/**
 * Get the start and end dates for a given (row, col) in the calendar grid.
 *
 * There are 365 days in a year, so each year (leap years excluded) will have one week in the calendar grid
 * that spans 8 days instead of 7 (52 weeks of 7 days + 1 day). We'll do this in the last week of each year.
 * Leap years will have one "week" that spans 9 days.
 *
 * (row, col)
 * (0, 0)  -- starts from the start date of the calendar
 * (1, 0)  -- starts one year after the start date
 * (0, 51) -- ends one day before one year after the start date
 *
 * @param row
 * @param col
 * @param calendarStartDate
 */
export function getDateRangeForRowCol(
  row: number,
  col: number,
  calendarStartDate: Date,
): { startDate: Date; endDate: Date } {
  // First, calculate the year based on the row
  const yearOffset = row;
  const start = new Date(calendarStartDate);
  start.setFullYear(start.getFullYear() + yearOffset);

  // Next, calculate the start date for the given column
  start.setDate(start.getDate() + col * 7);

  // If we're NOT calculating the last column, the end date is simply 6 days later
  // (7 days total, so 6 days between the start and end dates)
  if (col < 51) {
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return { startDate: start, endDate: end };
  }

  // If we are calculating the last column, we simply go to the start of the next year and subtract one day
  // Year of (calendarStartDate year + yearOffset + 1)
  // Month of calendarStartDate
  // Day of month of calendarStartDate
  const end = new Date(
    calendarStartDate.getFullYear() + yearOffset + 1,
    calendarStartDate.getMonth(),
    calendarStartDate.getDate(),
  );
  end.setDate(end.getDate() - 1);
  return {
    startDate: start,
    endDate: end,
  };
}
