import { NextFunction, Request, Response } from "express";

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export const errorLoggerMiddleware = (
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log("Error name", err.name);
  console.error(err);
  next(err);
};

export const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  switch (err.name) {
    case "NotFoundError":
      res.status(404).json({ error: "Not Found" });
      break;
    case "Decoding error":
      res.status(400).json({ error: "Bad Request" });
    default:
      res.status(500).json({ error: "Internal Server Error" });
  }
};
