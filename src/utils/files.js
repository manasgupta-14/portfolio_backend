import mongoose from "mongoose";
import { File } from "../models/index.js";

const PREFIX = "/api/files/";

// delete an uploaded image when it is replaced / its owner is removed
export async function removeFileByUrl(url) {
  if (!url || typeof url !== "string" || !url.startsWith(PREFIX)) return;
  const id = url.slice(PREFIX.length);
  if (!mongoose.isValidObjectId(id)) return;
  await File.findByIdAndDelete(id).catch(() => {});
}
