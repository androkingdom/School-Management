import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { SendError } from "@/utils/SendError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // Zod Validation Error
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation Failed",
      issues: err.issues[0],
      code: "VALIDATION_ERROR",
      status: 400,
      success: false,
    });
  }

  // Custom SendError
  if (err instanceof SendError) {
    return res.status(err.status).json({
      message: err.message,
      code: err.code,
      status: err.status,
      success: err.success,
    });
  }

  // Unknown error — fallback
  console.error("Unhandled Error:", err);

  return res.status(500).json({
    message: "Internal Server Error",
    code: "INTERNAL_ERROR",
    status: 500,
    success: false,
  });
}
