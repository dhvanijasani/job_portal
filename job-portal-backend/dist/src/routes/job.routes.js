"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_controller_1 = require("../controllers/job.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/", job_controller_1.getJobs);
router.get("/:id", job_controller_1.getJobById);
router.post("/", auth_middleware_1.protect, job_controller_1.createJob);
router.put("/:id", auth_middleware_1.protect, job_controller_1.updateJob);
router.delete("/:id", auth_middleware_1.protect, job_controller_1.deleteJob);
exports.default = router;
