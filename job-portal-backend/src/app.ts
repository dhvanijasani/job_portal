import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import jobRoutes from "./routes/job.routes";
import applicationRoutes from "./routes/application.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/jobs",
    jobRoutes
);

app.use(
  "/api/applications",
  applicationRoutes
);
export default app;