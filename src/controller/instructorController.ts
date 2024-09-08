import { IInstructorService } from "../interfaces/iInstructorInterfaces";

export class InstructorController {
  constructor(private service: IInstructorService) {}

  registerInstructor = async (data: any) => {
    try {
      const response = await this.service.userRegister(data);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  getInstructor = async (id: string) => {
    try {
      const instructor = await this.service.getInstructor(id);
      return instructor;
    } catch (e: any) {
      console.log(e);
    }
  };
}
