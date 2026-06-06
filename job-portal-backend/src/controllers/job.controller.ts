import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createJob = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            title,
            company,
            location,
            salary,
            description,
        } = req.body;

        const job =
            await prisma.job.create({
                data: {
                    title,
                    company,
                    location,
                    salary,
                    description,
                },
            });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getJobs = async (
    req: Request,
    res: Response
) => {
    try {
        const jobs =
            await prisma.job.findMany();

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getJobById = async (
    req: Request,
    res: Response
) => {
    try {
         const id = req.params.id as string;
        const job =
            await prisma.job.findUnique({
                where: {
                    id,
                },
            });

        if (!job) {
            return res.status(404).json({
                message:
                    "Job not found",
            });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};


export const updateJob = async (
    req: Request,
    res: Response
) => {
    try {
         const id = req.params.id as string;
        const job =
            await prisma.job.update({
                where: {
                    id,
                },
                data: req.body,
            });

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};


export const deleteJob = async (
    req: Request,
    res: Response
) => {
    try {
         const id = req.params.id as string;
        await prisma.job.delete({
            where: {
                id,
            },
        });

        res.status(200).json({
            message:
                "Job deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};