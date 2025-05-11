import { Request, Response, NextFunction } from "express";
import Logger from "@logger";
import { UserManager } from "../controllers/UserManager";
import { AuthenticatedRequest } from "../types/User";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
    const user = await userManager.getUserByCredentials(username, password);

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
