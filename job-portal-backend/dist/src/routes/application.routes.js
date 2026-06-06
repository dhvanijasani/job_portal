"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const application_controller_1 = require("../controllers/application.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, application_controller_1.applyJob);
router.get("/my", auth_middleware_1.protect, application_controller_1.getMyApplications);
router.get("/", auth_middleware_1.protect, application_controller_1.getAllApplications);
router.delete("/:id", auth_middleware_1.protect, application_controller_1.deleteApplication);
exports.default = router;
