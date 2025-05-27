import { Response } from "express";

export function successResponse<T>(
  res: Response,
  data: T,
  responseCode = "00",
  responseDescription = "Successful"
): Response {
  return res.status(200).json({
    responseCode,
    responseDescription,
    data,
  });
}
