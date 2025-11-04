import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

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

    // Get calendar ID from path parameters
    const calendarId = event.pathParameters?.id;

    if (!calendarId) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Calendar ID is required",
          message: "Please provide a calendar ID in the URL path",
        }),
      };
    }

    // Retrieve the calendar
    const calendar = await store.readCalendar(calendarId);

    if (!calendar) {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Calendar not found",
          message: `Calendar with ID ${calendarId} does not exist`,
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Calendar retrieved successfully!",
        requestId: context.awsRequestId,
        calendar: calendar,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Internal Server Error",
        message: "An error occurred while retrieving the calendar",
      }),
    };
  }
};
