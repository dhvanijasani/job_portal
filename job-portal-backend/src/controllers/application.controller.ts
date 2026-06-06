import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const applyJob = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { jobId } = req.body;

    const application =
      await prisma.application.create({
        data: {
          userId: req.userId!,
          jobId,
        },
      });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMyApplications = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    
    const applications =
      await prisma.application.findMany({
        where: {
          userId: req.userId,
        },
        include: {
          job: true,
        },
      });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteApplication = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    await prisma.application.delete({
      where: {
        id: String(req.params.id),
      },
    });

    res.status(200).json({
      message: "Application deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getAllApplications = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const applications =
      await prisma.application.findMany({
        include: {
          user: true,
          job: true,
        },
      });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};