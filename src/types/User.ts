export type Permission = "create_request" | "view_requests";

export interface User {
  id: string;
  username: string;
  password: string;
  permissions: Permission[];
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}
