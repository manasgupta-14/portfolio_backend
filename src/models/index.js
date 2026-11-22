import mongoose from "mongoose";

const { Schema, model } = mongoose;
const opts = { timestamps: true };

const profileSchema = new Schema(
  {
    key: { type: String, default: "main", unique: true },
    name: { type: String, default: "" },
    roles: { type: [String], default: [] },
    tagline: { type: String, default: "" },
    aboutParagraphs: { type: [String], default: [] },
    photo: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    youtube: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
  },
  opts
);

const experienceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    period: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  opts
);

const educationSchema = new Schema(
  {
    course: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    address: { type: String, default: "" },
    year: { type: String, default: "" },
    status: { type: String, default: "Complete" },
    percent: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  opts
);

const skillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: "code" },
    level: { type: Number, min: 0, max: 100, default: 80 },
    order: { type: Number, default: 0 },
  },
  opts
);

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    technologies: { type: [String], default: [] },
    url: { type: String, default: "", trim: true },
    githubUrl: { type: String, default: "", trim: true },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  opts
);

const certificationSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    platform: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
    certificateNumber: { type: String, default: "" },
    verifyUrl: { type: String, default: "", trim: true },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  opts
);

const messageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    emailSent: { type: Boolean, default: false },
    whatsappSent: { type: Boolean, default: false },
    read: { type: Boolean, default: false },
  },
  opts
);

const fileSchema = new Schema(
  {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    filename: { type: String, default: "" },
    size: { type: Number, default: 0 },
  },
  opts
);

export const Profile = model("Profile", profileSchema);
export const Experience = model("Experience", experienceSchema);
export const Education = model("Education", educationSchema);
export const Skill = model("Skill", skillSchema);
export const Project = model("Project", projectSchema);
export const Certification = model("Certification", certificationSchema);
export const Message = model("Message", messageSchema);
export const File = model("File", fileSchema);
