import type { Calendar } from "@life-calendar/common";

const apiBaseURL = import.meta.env.VITE_CALENDAR_API_BASE_URL;

export const createCalendar = async (
  calendarData: Calendar,
): Promise<Calendar> => {
  const response = await fetch(`${apiBaseURL}/calendar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(calendarData),
  });
  return response.json();
};

export const getCalendar = async (id: string): Promise<Calendar> => {
  const response = await fetch(`${apiBaseURL}/calendar/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
