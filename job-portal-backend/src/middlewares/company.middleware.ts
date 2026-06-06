import { Response, NextFunction } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "./auth.middleware";

export const companyOnly = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user =
    await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });

  if (
    !user ||
    user.role !== "company"
  ) {
    return res.status(403).json({
      message:
        "Company Access Only",
    });
  }

  next();
};