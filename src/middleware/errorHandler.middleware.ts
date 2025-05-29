import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import AppError from "../utils/AppError.util";
import { ZodError } from "zod";
import { DupErrorType } from "../interfaces/general.util";

const errorHandler = (
  err: Error | DupErrorType,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  // Check if the error is a ZodError
  if (err instanceof ZodError) {
    statusCode = 400;
    const formattedErrors = err.errors.map((e) => ({
      path: e.path[1],
      message: e.message,
    }));
    return res.status(statusCode).json({
      status: "failed: Validation Error",
      errors: formattedErrors,
    });
  }

  // Handle Mongoose duplicate key error
  if (
    typeof (err as DupErrorType).code === "number" &&
    (err as any).code === 11000
  ) {
    const field = Object.keys((err as any).keyValue)[0];
    return res.status(409).json({
      status: "error",
      message: `${field} already exists.`,
    });
  }

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    status: "error";
    message = err.message;
  }

  res.status(statusCode).json({
    error: err,
    status: "error",
    message,
  });
};

export default errorHandler;
