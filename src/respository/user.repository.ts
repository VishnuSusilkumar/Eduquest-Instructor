import { IUserRepository } from "../interfaces/IUserRepository";
import UserModel from "../model/schemas/user.schema";

export class UserRepository implements IUserRepository {
  async changeRole(userId: string) {
    console.log("Entered into role change");
    console.log(userId);
    
    const user = await UserModel.findByIdAndUpdate(userId, {
      role: "instructor",
    }).select("-password");
    if (!user) {
      console.log("User not found for ID:", userId);
    }
    
    return user;
  }
}
