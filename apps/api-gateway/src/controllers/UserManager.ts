import { UserService } from "../model/user.service";
import User from "../types/User";
import Logger from "@logger";
import { comparePasswords } from "../utils/auth";
import { CreateUserInput } from "../types/User";

export class UserManager {
  private static instance: UserManager;
  private users: User[] = [];
  private initialized = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      Logger.getInstance().log("Initializing UserManager...");
      this.users = await UserService.getAllUsers();
      this.initialized = true;
      Logger.getInstance().log(
        `Successfully loaded ${this.users.length} users`
      );
    } catch (error) {
      Logger.getInstance().error("Failed to initialize UserManager:", error);
      throw error;
    }
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public async getUsers(): Promise<User[]> {
    if (!this.initialized) {
      await this.initialize();
    }
    return this.users.map((user) => ({
      ...user,
      password: "",
    }));
  }

  public async getUserByCredentials(
    username: string,
    password: string
  ): Promise<User | null> {
    if (!this.initialized) {
      await this.initialize();
    }

    const user = this.users.find((u) => u.username === username);
    if (!user) {
      return null;
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    return isPasswordValid ? user : null;
  }

  public async createUser(userData: CreateUserInput): Promise<User> {
    try {
      const newUser = await UserService.createUser(userData);
      this.users.push(newUser);
      return {
        ...newUser,
        password: "",
      };
    } catch (error) {
      Logger.getInstance().error("Failed to create user:", error);
      throw error;
    }
  }
}
