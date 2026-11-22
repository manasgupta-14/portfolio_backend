// Your existing portfolio content. Run `npm run seed` once to load it into MongoDB.
// After that, manage everything from the /admin panel.

export const profile = {
  name: "Manas Gupta",
  roles: ["BCA Graduate", "Web Developer", "Programmer"],
  tagline:
    "Passionate about creating innovative web solutions with a strong foundation in programming and development.",
  aboutParagraphs: [
    "My name is Manas Gupta, and I am a dedicated and enthusiastic Web Developer as well as a BCA graduate with hands-on experience in HTML5, CSS3, JavaScript, Bootstrap, jQuery, PHP, React JS, MySQL, and SQL. I have a solid understanding of front-end development using JavaScript and React JS, and I am experienced in building dynamic, database-driven websites using PHP and MySQL. I enjoy working on real-world projects that help me improve my logic, coding skills, and problem-solving abilities.",
    "Currently, I am pursuing MERN Stack + AI Training from CETPA Infotech Pvt. Ltd., where I am enhancing my skills in modern web development technologies, full-stack application development, and AI-based solutions.",
    "I am a quick learner, passionate about technology, and always eager to enhance my skills by learning new tools and frameworks. I am actively looking for job or internship opportunities where I can apply my knowledge, gain industry experience, and grow as a professional web developer.",
  ],
  email: "manasmggupta@gmail.com",
  phone: "+91 9555998119",
  whatsapp: "919555998119",
  location: "New Ashok Nagar, Delhi",
  resumeUrl: "/Manas_Gupta_Resume.pdf",
  github: "https://github.com/manasgupta-14",
  linkedin: "https://www.linkedin.com/in/manas-gupta-97a4a4256/",
  youtube: "https://www.youtube.com/@codingclutch_14",
  instagram: "https://www.instagram.com/manas.__.nigam/",
  facebook: "https://www.facebook.com/Manas1408",
};

export const experience = [
  { title: "Full Stack Developer", company: "Personal & Academic Projects", period: "Sept 2024 - Dec 2025" },
  { title: "Web Development Intern", company: "Internshala Trainings (Virtual)", period: "Jan 2025 - Mar 2025 · 8 Weeks" },
  { title: "MERN + AI Training", company: "CETPA Infotech Pvt Ltd", period: "Jan 2026 - Present" },
  { title: "Self Employed", company: "Code & build projects on a daily basis", period: "Jan 2022 - Present" },
];

export const education = [
  { course: "Bachelor of Computer Application (BCA)", college: "JS University", address: "Shikhobad, Uttar Pradesh", year: "2022 - 2025", status: "Complete", percent: "76%" },
  { course: "Intermediate", college: "B I C BHELUR CHANGERI MAU", address: "Mau, Uttar Pradesh", year: "2021", status: "Complete", percent: "73%" },
  { course: "High School", college: "Y S Y S I C SAMAYATHAN BHITI", address: "Gorakhpur, Uttar Pradesh", year: "2019", status: "Complete", percent: "77%" },
];

export const skills = [
  { name: "HTML", icon: "html", level: 90 },
  { name: "CSS", icon: "css", level: 88 },
  { name: "JavaScript", icon: "js", level: 85 },
  { name: "Bootstrap", icon: "bootstrap", level: 85 },
  { name: "jQuery", icon: "jquery", level: 75 },
  { name: "PHP", icon: "php", level: 75 },
  { name: "MySQL", icon: "mysql", level: 78 },
  { name: "React JS", icon: "react", level: 82 },
  { name: "Tailwind", icon: "tailwind", level: 80 },
  { name: "Git", icon: "git", level: 78 },
  { name: "GitHub", icon: "github", level: 80 },
];

export const projects = [
  {
    title: "Tourism Website",
    description: "A comprehensive tourism website featuring online repairing, attendance management system, and various web development projects.",
    url: "https://manasgupta-14.github.io/Mera-Safar---Safar-Aapka-Zimmedari-Hamari-/",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Restaurant Management System",
    description: "A modern restaurant website with menu, contact and responsive design.",
    url: "https://manasgupta-14.github.io/Restaurant-/",
    technologies: ["HTML", "CSS"],
  },
  {
    title: "School Website",
    description: "School management website with attendance system and student records.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
  {
    title: "Appliance & Home Repair Services",
    description: "One-stop platform for AC, fan, mobile, and appliance repairing services.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP"],
  },
];

export const certifications = [
  {
    title: "MERN + AI Training",
    platform: "CETPA Infotech Pvt Ltd",
    description: "I am pursuing MERN Stack and AI training from CETPA, where I am gaining practical knowledge of HTML, CSS, JavaScript, React, Node.js, MongoDB, and Artificial Intelligence for building modern web applications.",
  },
  {
    title: "Web Development Training",
    platform: "Internshala",
    description: "Comprehensive online training covering modern web development technologies and best practices.",
    verifyUrl: "https://trainings.internshala.com/verify-certificate/?certificate_number=aeb1tsunvga1",
    certificateNumber: "aeb1sunvqa1",
  },
  {
    title: "Internship & Job Preparation",
    platform: "Internshala",
    description: "Professional training focused on internship readiness, job preparation, and career development skills.",
    verifyUrl: "https://trainings.internshala.com/verify-certificate/?certificate_number=jbg97c5c09zlob",
    certificateNumber: "jbq97c5c09z",
  },
];
