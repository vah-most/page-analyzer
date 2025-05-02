import { users } from "../generated/prisma";
import { Request } from "express";

type User = users;

export type CreateUserInput = Omit<User, "id" | "created_at">;
export type UpdateUserInput = Partial<CreateUserInput>;

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export default User;
