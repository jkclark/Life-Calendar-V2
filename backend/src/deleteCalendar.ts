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

    // Check if calendar exists before deleting
    const existingCalendar = await store.readCalendar(calendarId);

    if (!existingCalendar) {
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

    // Delete the calendar
    await store.deleteCalendar(calendarId);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Calendar deleted successfully!",
        requestId: context.awsRequestId,
        deletedCalendarId: calendarId,
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
        message: "An error occurred while deleting the calendar",
      }),
    };
  }
};
