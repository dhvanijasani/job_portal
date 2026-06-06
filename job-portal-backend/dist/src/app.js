"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const job_routes_1 = __importDefault(require("./routes/job.routes"));
const application_routes_1 = __importDefault(require("./routes/application.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://YOUR-VERCEL-URL.vercel.app",
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/jobs", job_routes_1.default);
app.use("/api/applications", application_routes_1.default);
exports.default = app;
