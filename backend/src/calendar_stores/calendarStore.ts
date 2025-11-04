import type { Calendar } from "@life-calendar/common";

/**
 * Abstract base class for calendar storage implementations.
 * Defines the contract that all calendar stores must implement.
 */
export abstract class CalendarStore {
  /**
   * Read a calendar by its ID
   * @param id - The unique identifier of the calendar
   * @returns Promise resolving to the calendar or null if not found
   */
  abstract readCalendar(id: string): Promise<Calendar | null>;

  /**
   * Write a calendar to storage
   * @param calendar - The calendar data to store
   * @returns Promise resolving to the stored calendar
   */
  abstract writeCalendar(calendar: Calendar): Promise<Calendar>;

  /**
   * Delete a calendar by ID
   * @param id - The unique identifier of the calendar to delete
   * @returns Promise resolving to true if deleted, false if not found
   */
  abstract deleteCalendar(id: string): Promise<boolean>;

  protected validateCalendar(calendar: Calendar): void {
    if (!calendar.id) {
      throw new Error("Calendar must have an ID");
    }
    if (!calendar.name) {
      throw new Error("Calendar must have a name");
    }
    if (!calendar.startDate) {
      throw new Error("Calendar must have a start date");
    }
  }
}
