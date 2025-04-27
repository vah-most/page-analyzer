import { User } from "../types/User";

class UserManager {
  private static instance: UserManager;
  private users: User[];

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getUserById(id: User["id"]): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public getUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  public getUserByCredentials(
    username: string,
    password: string
  ): User | undefined {
    return this.users.find(
      (user) => user.username === username && user.password === password
    );
  }
}

export default UserManager;
