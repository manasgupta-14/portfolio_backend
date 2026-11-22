import { Router } from "express";
import multer from "multer";
import mongoose from "mongoose";
import { File } from "../models/index.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) =>
    ALLOWED.includes(file.mimetype) ? cb(null, true) : cb(new Error("Only JPG, PNG, WEBP or GIF images are allowed")),
});

// Admin: upload image -> stored in MongoDB, returns a url like /api/files/<id>
router.post("/upload", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file received" });
  const doc = await File.create({
    data: req.file.buffer,
    contentType: req.file.mimetype,
    filename: req.file.originalname,
    size: req.file.size,
  });
  res.status(201).json({ url: `/api/files/${doc._id}` });
});

// Public: serve image
router.get("/files/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).end();
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).end();
  res.set({
    "Content-Type": file.contentType,
    "Cache-Control": "public, max-age=31536000, immutable",
    "Cross-Origin-Resource-Policy": "cross-origin",
    "X-Content-Type-Options": "nosniff",
  });
  res.send(file.data);
});

export default router;
