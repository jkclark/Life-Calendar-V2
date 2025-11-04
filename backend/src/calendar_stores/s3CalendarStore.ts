import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { Calendar } from "@life-calendar/common";
import { CalendarStore } from "./calendarStore";

/**
 * AWS S3 implementation of CalendarStore
 */
export class S3CalendarStore extends CalendarStore {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(bucketName: string, region: string = "us-east-1") {
    super();
    this.s3Client = new S3Client({ region });
    this.bucketName = bucketName;
  }

  async readCalendar(id: string): Promise<Calendar | null> {
    try {
      const key = `${id}.json`;
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const response = await this.s3Client.send(command);

      if (!response.Body) {
        return null;
      }

      const data = await response.Body.transformToString();
      const calendar: Calendar = JSON.parse(data);

      // Convert string date back to Date object
      calendar.startDate = new Date(calendar.startDate);

      return calendar;
    } catch (error: any) {
      if (error.name === "NoSuchKey") {
        return null; // Object not found
      }
      throw error;
    }
  }

  async writeCalendar(calendar: Calendar): Promise<Calendar> {
    this.validateCalendar(calendar);

    const key = `${calendar.id}.json`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: JSON.stringify(calendar, null, 2),
      ContentType: "application/json",
    });

    await this.s3Client.send(command);
    return calendar;
  }

  async deleteCalendar(id: string): Promise<boolean> {
    try {
      const key = `${id}.json`;
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      return true;
    } catch (error: any) {
      if (error.name === "NoSuchKey") {
        return false; // Object not found
      }
      throw error;
    }
  }
}
