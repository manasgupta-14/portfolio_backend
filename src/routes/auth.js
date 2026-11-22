import { Router } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts, try again later" },
});

const safeEqual = (a = "", b = "") => {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
};

router.post("/login", limiter, (req, res) => {
  const { email, password } = req.body || {};
  const { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
    return res.status(500).json({ message: "Admin login is not configured in backend .env" });
  }
  const okEmail = safeEqual(String(email || "").toLowerCase(), ADMIN_EMAIL.toLowerCase());
  const okPass = safeEqual(password, ADMIN_PASSWORD);
  if (!okEmail || !okPass) return res.status(401).json({ message: "Invalid email or password" });
  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "12h" });
  res.json({ token });
});

router.get("/me", requireAuth, (_req, res) => res.json({ ok: true }));

export default router;
