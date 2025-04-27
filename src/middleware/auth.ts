import { Request, Response, NextFunction } from "express";
import { Permission, AuthenticatedRequest } from "../types/User";
import UserManager from "../controllers/UserManager";
import Logger from "../logger/Logger";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const [type, credentials] = authHeader.split(" ");

    if (type !== "Basic") {
      res.status(401).json({ error: "Invalid authentication type" });
      return;
    }

    const [username, password] = Buffer.from(credentials, "base64")
      .toString()
      .split(":");

    const userManager = UserManager.getInstance();
    const user = userManager.getUserByCredentials(username, password);

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    (req as unknown as AuthenticatedRequest).user = user;
    next();
  } catch (error) {
    Logger.getInstance().error("Error authenticating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const requirePermission = (permission: Permission) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const user = (req as unknown as AuthenticatedRequest).user;

      if (!user || !user.permissions.includes(permission)) {
        res.status(403).json({ error: "Insufficient permissions" });
        return;
      }

      next();
    } catch (error) {
      Logger.getInstance().error("Error requiring permission:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};
