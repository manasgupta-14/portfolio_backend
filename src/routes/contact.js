import { Router } from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import { Message } from "../models/index.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many messages, please try again in a few minutes" },
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public: keeps a copy of every enquiry in the database (the message itself goes via WhatsApp click-to-chat)
router.post("/contact", limiter, async (req, res) => {
  const { name, email, message, website } = req.body || {};
  if (website) return res.json({ ok: true }); // honeypot - bots fill this
  if (!name?.trim() || !EMAIL_RE.test(email || "") || !message?.trim()) {
    return res.status(400).json({ message: "Please fill name, a valid email and message" });
  }
  await Message.create({
    name: name.trim().slice(0, 120),
    email: email.trim().slice(0, 200),
    message: message.trim().slice(0, 4000),
  });
  res.status(201).json({ ok: true });
});

// Admin: inbox
router.get("/messages", requireAuth, async (_req, res) => {
  res.json(await Message.find().sort({ createdAt: -1 }).lean());
});

router.patch("/messages/:id/read", requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid id" });
  const doc = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(doc);
});

router.delete("/messages/:id", requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid id" });
  await Message.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
