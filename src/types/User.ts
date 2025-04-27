export type Permission = "create_auction" | "view_auction" | "bid";

export interface User {
  id: string;
  username: string;
  password: string;
  permissions: Permission[];
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}
