import prisma from "../model/database";
import Logger from "@logger";
import { hashPassword } from "../utils/auth";

export class AdminSetup {
  private static readonly ADMIN_USERNAME = "admin";
  private static readonly ADMIN_PASSWORD =
    process.env.ADMIN_PASSWORD || "admin123"; // In production, this should be set via env

  public static async initializeAdmin(): Promise<void> {
    try {
      const existingAdmin = await prisma.users.findFirst({
        where: { username: this.ADMIN_USERNAME },
      });

      if (existingAdmin) {
        Logger.getInstance().log("Admin user already exists");
        return;
      }

      const hashedPassword = await hashPassword(this.ADMIN_PASSWORD);

      await prisma.users.create({
        data: {
          username: this.ADMIN_USERNAME,
          password: hashedPassword,
          first_name: "Admin",
          last_name: "User",
          // Add any other required fields from your schema
        },
      });

      Logger.getInstance().log("Admin user created successfully");
    } catch (error) {
      Logger.getInstance().error("Failed to initialize admin user:", error);
      throw error;
    }
  }
}
