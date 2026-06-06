import express from "express";

import {
  applyJob,
  getMyApplications,
  deleteApplication,
  getAllApplications,
} from "../controllers/application.controller";

import {
  protect,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
  "/",
  protect,
  applyJob
);

router.get(
  "/my",
  protect,
  getMyApplications
);

router.get(
  "/",
  protect,
  getAllApplications
);

router.delete(
  "/:id",
  protect,
  deleteApplication
);

export default router;