import { Request, Response, NextFunction } from "express";
import Logger from "@logger";
import RateLimiter from "../controllers/RateLimiter";

export const rateLimit = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const key = req.ip || "unknown";
    const limiter = RateLimiter.getInstance();
    const { allowed, remaining } = limiter.check(key);

    res.setHeader("X-RateLimit-Limit", limiter["maxRequests"]);
    res.setHeader("X-RateLimit-Remaining", remaining);

    if (!allowed) {
      res.setHeader("X-RateLimit-Reset", limiter["store"][key].resetTime);
      res.status(429).json({
        error: "Too many requests",
        message: "Please try again later",
      });
      return;
    }

    next();
  } catch (error) {
    Logger.getInstance().error("Rate limit error:", error);
    next();
  }
};
