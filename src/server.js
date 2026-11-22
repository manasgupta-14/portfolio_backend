import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import fileRoutes from "./routes/files.js";
import contactRoutes from "./routes/contact.js";
import { crudRouter } from "./routes/crud.js";
import {
  Profile, Experience, Education, Skill, Project, Certification,
} from "./models/index.js";

const app = express();

app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

const origins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",").map((s) => s.trim()).filter(Boolean);
app.use(cors({ origin: origins }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", fileRoutes);
app.use("/api", contactRoutes);

app.use("/api/experience", crudRouter(Experience, { fields: ["title", "company", "period", "description", "order"] }));
app.use("/api/education", crudRouter(Education, { fields: ["course", "college", "address", "year", "status", "percent", "order"] }));
app.use("/api/skills", crudRouter(Skill, { fields: ["name", "icon", "level", "order"] }));
app.use("/api/projects", crudRouter(Project, {
  fields: ["title", "description", "technologies", "url", "githubUrl", "image", "order"],
  imageFields: ["image"],
}));
app.use("/api/certifications", crudRouter(Certification, {
  fields: ["title", "platform", "description", "certificateNumber", "verifyUrl", "image", "order"],
  imageFields: ["image"],
}));

// One call for the whole public site
app.get("/api/portfolio", async (_req, res) => {
  const sort = { order: 1, createdAt: 1 };
  const [profile, experience, education, skills, projects, certifications] = await Promise.all([
    Profile.findOne({ key: "main" }).lean(),
    Experience.find().sort(sort).lean(),
    Education.find().sort(sort).lean(),
    Skill.find().sort(sort).lean(),
    Project.find().sort(sort).lean(),
    Certification.find().sort(sort).lean(),
  ]);
  res.json({ profile: profile || {}, experience, education, skills, projects, certifications });
});

app.use("/api", (_req, res) => res.status(404).json({ message: "Not found" }));

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: Object.values(err.errors).map((e) => e.message).join(", ") });
  }
  if (err.name === "MulterError" || err.message?.startsWith("Only JPG")) {
    return res.status(400).json({ message: err.code === "LIMIT_FILE_SIZE" ? "Image must be under 5 MB" : err.message });
  }
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;

async function start() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is missing. Copy .env.example to .env and add your Atlas connection string.");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}

start().catch((e) => {
  console.error("Failed to start:", e.message);
  process.exit(1);
});
