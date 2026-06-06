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

import {
    companyOnly
} from "../middlewares/company.middleware";

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
  companyOnly,
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