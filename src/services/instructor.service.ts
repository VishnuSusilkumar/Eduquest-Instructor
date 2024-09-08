import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { s3 } from "../config/s3.config";
import { IInstructorService } from "../interfaces/iInstructorInterfaces";
import { IInstructorRepository } from "../interfaces/iInstructorRepository";
import { Instructor } from "../model/instructor.entities";
import crypto from "crypto";
import { S3Params } from "../interfaces/iServiceInterfaces";
import "dotenv/config";

export class InstructorService implements IInstructorService {
  constructor(private instructorRepository: IInstructorRepository) {}

  async userRegister(data: Instructor) {
    const {
      buffer,
      userId,
      degree,
      yearOfCompletion,
      institution,
      subject,
      certificateDate,
      certificateName,
      fieldName,
      mimeType,
    } = data;

    const randomName = (bytes = 32) =>
      crypto.randomBytes(bytes).toString("hex");
    const bucketName = process.env.S3_BUCKET_NAME || "";
    const imageName = `eduquest-certificates/${randomName()}`;

    console.log("Bucket Name:", bucketName);

    const params: S3Params = {
      Bucket: bucketName,
      Key: imageName,
      Body: Buffer.from(buffer?.data || ""),
      ContentType: mimeType,
    };
    console.log(params);

    try {
      const command = new PutObjectCommand(params);
      await s3.send(command);
      console.log("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("S3 upload failed");
    }

    const url = `https://eduquest-elearning.s3.ap-south-1.amazonaws.com/${imageName}`;
    const userData = {
      userId,
      degree,
      yearOfCompletion,
      institution,
      subject,
      certificateDate,
      certificateName,
      mimeType,
      fieldName,
      certificate: url,
    };
    console.log(userData);

    const instructor = await this.instructorRepository.register(userData);
    if (instructor) {
      return instructor;
    } else {
      return "error adding instructor";
    }
  }

  async getInstructor(userId: string) {
    try {
      console.log("user Service:", userId);
      
      const instructor = await this.instructorRepository.findByUserId(userId);
      if (instructor) {
        return instructor;
      } else {
        return "Instructor not found";
      }
    } catch (error) {
      console.error("Error fetching instructor:", error);
      throw new Error("Error fetching instructor");
    }
  }
}
