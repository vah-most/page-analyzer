import prisma from "./database";
import User, { CreateUserInput } from "../types/User";
import { hashPassword } from "../utils/auth";

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    return prisma.users.findMany();
  }

  static async createUser(userData: CreateUserInput): Promise<User> {
    const hashedPassword = await hashPassword(userData.password);
    return prisma.users.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
  }

  static async deleteUser(id: number): Promise<void> {
    await prisma.users.delete({
      where: { id },
    });
  }
}
