import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import Logger from "@logger";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string
  ) {
    super(message);
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
    return;
  }

  // Log unexpected errors
  Logger.getInstance().error(err);

  res.status(500).json({
    error: "Internal server error",
    code: "INTERNAL_SERVER_ERROR",
  });
};
