import type { Calendar } from "@life-calendar/common";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { CalendarStore, S3CalendarStore } from "./calendar_stores";

// Factory function to create the appropriate store based on environment
function createCalendarStore(): CalendarStore {
  const bucketName = process.env.S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("S3_BUCKET_NAME environment variable is not set");
  }

  return new S3CalendarStore(bucketName);
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("Event:", JSON.stringify(event, null, 2));
  console.log("Context:", JSON.stringify(context, null, 2));

  try {
    const store = createCalendarStore();

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
