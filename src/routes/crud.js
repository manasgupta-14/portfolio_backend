import { Router } from "express";
import mongoose from "mongoose";
import { requireAuth } from "../middleware/auth.js";
import { removeFileByUrl } from "../utils/files.js";

// Builds GET (public) + POST/PUT/DELETE (admin) for a model.
// `fields` = whitelist of editable fields, `imageFields` = fields holding uploaded image urls.
export function crudRouter(Model, { fields, imageFields = [], sort = { order: 1, createdAt: 1 } }) {
  const router = Router();

  const pick = (body) => {
    const out = {};
    for (const f of fields) if (body[f] !== undefined) out[f] = body[f];
    return out;
  };

  router.get("/", async (_req, res) => {
    res.json(await Model.find().sort(sort).lean());
  });

  router.post("/", requireAuth, async (req, res) => {
    const doc = await Model.create(pick(req.body));
    res.status(201).json(doc);
  });

  router.put("/:id", requireAuth, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid id" });
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    const data = pick(req.body);
    for (const f of imageFields) {
      if (data[f] !== undefined && data[f] !== doc[f]) await removeFileByUrl(doc[f]);
    }
    doc.set(data);
    await doc.save();
    res.json(doc);
  });

  router.delete("/:id", requireAuth, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid id" });
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    for (const f of imageFields) await removeFileByUrl(doc[f]);
    res.json({ ok: true });
  });

  return router;
}
