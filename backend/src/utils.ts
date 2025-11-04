import { CalendarStore, S3CalendarStore } from "./calendar_stores";

export function getCalendarStore(): CalendarStore {
  // For now, always use S3CalendarStore
  const bucketName = process.env.S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("S3_BUCKET_NAME environment variable is not set");
  }

  return new S3CalendarStore(bucketName);
}
