import { InstructorController } from "../controller/instructorController";
import { InstructorRepository } from "../respository/instructor.repository";
import { InstructorService } from "../services/instructor.service";
import rabbitClient from "./client";

const instructorRepository = new InstructorRepository();
const service = new InstructorService(instructorRepository);
const controller = new InstructorController(service);

export default class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string
  ) {
    let response = data;

    console.log("The operation is", operation, data);

    switch (operation) {
      case "register-instructor":
        response = await controller.registerInstructor.bind(controller)(data);
        break;

      case "get-instructor":
        response = await controller.getInstructor.bind(controller)(data.id);
        break;

      default:
        response = "Request-key notfound";
        break;
    }

    await rabbitClient.produce(response, correlationId, replyTo);
  }
}
