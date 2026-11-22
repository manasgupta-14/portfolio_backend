import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import {
  Profile, Experience, Education, Skill, Project, Certification, File,
} from "../src/models/index.js";
import * as data from "./data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const force = process.argv.includes("--force");

async function fill(Model, rows, label) {
  const count = await Model.countDocuments();
  if (count && !force) return console.log(`- ${label}: already has data, skipped`);
  if (force) await Model.deleteMany({});
  await Model.insertMany(rows.map((r, i) => ({ ...r, order: i })));
  console.log(`- ${label}: ${rows.length} added`);
}

async function run() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI missing in .env");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected. Seeding...");

  const existing = await Profile.findOne({ key: "main" });
  if (!existing || force) {
    if (force) await File.deleteMany({});
    const photoPath = path.join(__dirname, "profile.jpg");
    let photo = "";
    if (fs.existsSync(photoPath)) {
      const buf = fs.readFileSync(photoPath);
      const f = await File.create({ data: buf, contentType: "image/jpeg", filename: "profile.jpg", size: buf.length });
      photo = `/api/files/${f._id}`;
    }
    await Profile.findOneAndUpdate({ key: "main" }, { ...data.profile, photo, key: "main" }, { upsert: true });
    console.log("- profile: saved (with photo)");
  } else console.log("- profile: already exists, skipped");

  await fill(Experience, data.experience, "experience");
  await fill(Education, data.education, "education");
  await fill(Skill, data.skills, "skills");
  await fill(Project, data.projects, "projects");
  await fill(Certification, data.certifications, "certifications");

  await mongoose.disconnect();
  console.log("Done.");
}

run().catch((e) => { console.error(e.message); process.exit(1); });
