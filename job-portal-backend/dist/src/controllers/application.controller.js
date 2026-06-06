"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllApplications = exports.deleteApplication = exports.getMyApplications = exports.applyJob = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const applyJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const application = await prisma_1.default.application.create({
            data: {
                userId: req.userId,
                jobId,
            },
        });
        res.status(201).json({
            success: true,
            application,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.applyJob = applyJob;
const getMyApplications = async (req, res) => {
    try {
        const applications = await prisma_1.default.application.findMany({
            where: {
                userId: req.userId,
            },
            include: {
                job: true,
            },
        });
        res.status(200).json(applications);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getMyApplications = getMyApplications;
const deleteApplication = async (req, res) => {
    try {
        await prisma_1.default.application.delete({
            where: {
                id: String(req.params.id),
            },
        });
        res.status(200).json({
            message: "Application deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.deleteApplication = deleteApplication;
const getAllApplications = async (req, res) => {
    try {
        const applications = await prisma_1.default.application.findMany({
            include: {
                user: true,
                job: true,
            },
        });
        res.status(200).json(applications);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getAllApplications = getAllApplications;
