import { IInstructorRepository } from "../interfaces/iInstructorRepository";
import { Instructor } from "../model/instructor.entities";
import InstructorModel from "../model/schemas/instructor.schema";

export class InstructorRepository implements IInstructorRepository {
  async register(data: Instructor) {
    return await InstructorModel.create(data);
  }

  async findByUserId(userId: string) {
    return await InstructorModel.findOne({ userId });
  }
}
