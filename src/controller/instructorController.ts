import { IInstructorService } from "../interfaces/iInstructorInterfaces";

export class InstructorController {
  constructor(private service: IInstructorService) {}

  registerInstructor = async (data: any) => {
    try {
      console.log("Entered into service");
      
      const response = await this.service.userRegister(data);
      console.log("Response Returned");
      
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };
}


