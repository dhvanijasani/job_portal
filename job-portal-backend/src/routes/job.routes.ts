import express from "express";

import {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
} from "../controllers/job.controller";

import {
    protect,
} from "../middlewares/auth.middleware";

const router =
    express.Router();

router.get(
    "/",
    getJobs
);

router.get(
    "/:id",
    getJobById
);

router.post(
    "/",
    protect,
    createJob
);

router.put(
    "/:id",
    protect,
    updateJob
);

router.delete(
    "/:id",
    protect,
    deleteJob
);

export default router;