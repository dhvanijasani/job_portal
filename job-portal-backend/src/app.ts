import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import jobRoutes from "./routes/job.routes";
import applicationRoutes from "./routes/application.routes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://YOUR-VERCEL-URL.vercel.app",
    ],
    credentials: true,
  })
);

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