import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

import type { Calendar } from "@life-calendar/common";
import { CalendarStore } from "./calendar_stores";
import { getCalendarStore } from "./utils";

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("Event:", JSON.stringify(event, null, 2));
  console.log("Context:", JSON.stringify(context, null, 2));

  try {
    const store: CalendarStore = getCalendarStore();

    // Parse request body if present
    const requestBody = event.body ? JSON.parse(event.body) : {};

    // Create new calendar
    const newCalendar: Calendar = {
      id: crypto.randomUUID(),
      name: requestBody.name || "My Life Calendar",
      startDate: new Date(requestBody.startDate || Date.now()),
    };

    // Store the calendar
    const savedCalendar = await store.writeCalendar(newCalendar);

    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Calendar created successfully!",
        requestId: context.awsRequestId,
        calendar: savedCalendar,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
      }),
    };
  }
};
