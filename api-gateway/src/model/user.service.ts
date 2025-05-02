import prisma from "./database";
import User from "../types/User";

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    return prisma.users.findMany();
  }
}
