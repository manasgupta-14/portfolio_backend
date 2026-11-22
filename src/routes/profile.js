import { Router } from "express";
import { Profile } from "../models/index.js";
import { requireAuth } from "../middleware/auth.js";
import { removeFileByUrl } from "../utils/files.js";

const router = Router();

const FIELDS = [
  "name", "roles", "tagline", "aboutParagraphs", "photo", "email", "phone",
  "location", "resumeUrl", "github", "linkedin", "youtube", "instagram", "facebook",
];

router.get("/", async (_req, res) => {
  const profile = await Profile.findOne({ key: "main" }).lean();
  res.json(profile || {});
});

router.put("/", requireAuth, async (req, res) => {
  const data = {};
  for (const f of FIELDS) if (req.body[f] !== undefined) data[f] = req.body[f];
  const existing = await Profile.findOne({ key: "main" });
  if (existing && data.photo !== undefined && data.photo !== existing.photo) {
    await removeFileByUrl(existing.photo);
  }
  const profile = await Profile.findOneAndUpdate(
    { key: "main" },
    { $set: data, $setOnInsert: { key: "main" } },
    { new: true, upsert: true, runValidators: true }
  );
  res.json(profile);
});

export default router;
