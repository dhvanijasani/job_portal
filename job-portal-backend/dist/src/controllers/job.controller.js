"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.getJobById = exports.getJobs = exports.createJob = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createJob = async (req, res) => {
    try {
        const { title, company, location, salary, description, } = req.body;
        const job = await prisma_1.default.job.create({
            data: {
                title,
                company,
                location,
                salary,
                description,
            },
        });
        res.status(201).json(job);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.createJob = createJob;
const getJobs = async (req, res) => {
    try {
        const jobs = await prisma_1.default.job.findMany();
        res.status(200).json(jobs);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getJobs = getJobs;
const getJobById = async (req, res) => {
    try {
        const id = req.params.id;
        const job = await prisma_1.default.job.findUnique({
            where: {
                id,
            },
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }
        res.status(200).json(job);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getJobById = getJobById;
const updateJob = async (req, res) => {
    try {
        const id = req.params.id;
        const job = await prisma_1.default.job.update({
            where: {
                id,
            },
            data: req.body,
        });
        res.status(200).json(job);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    try {
        const id = req.params.id;
        await prisma_1.default.job.delete({
            where: {
                id,
            },
        });
        res.status(200).json({
            message: "Job deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.deleteJob = deleteJob;
