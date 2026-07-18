export const profile = {
  name: "Om Pathania",
  role: "Computer Science Undergraduate",
  tagline:
    "Building Python, open-source, and AI-driven software — from steel-bridge CAD engines to pathfinding visualizers.",
  location: "Nagrota Surian, Himachal Pradesh, India",
  email: "oompathania@gmail.com",
  phone: "+91 9351161254",
  links: {
    github: "https://github.com/", // TODO: replace with your GitHub URL
    linkedin: "https://www.linkedin.com/", // TODO: replace with your LinkedIn URL
  },
  summary:
    "Computer Science undergraduate with hands-on experience in Python development and open-source software engineering. Passionate about building engineering applications and AI-driven technologies while continuously learning and contributing to impactful projects.",
};

export type Experience = {
  org: string;
  role: string;
  period: string;
  place?: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    org: "FOSSEE",
    role: "Software Engineering Intern",
    period: "May 2026 — Present",
    place: "IIT Bombay",
    points: [
      "Contributing to OsdagBridge, an open-source plugin for Osdag used to design and analyse steel plate girder bridges.",
      "Developed and enhanced Python-based 3D CAD generation modules for accurate modeling and visualization of bridge components.",
      "Collaborated with the team to ship new features, resolve bugs, and maintain code quality using Git and open-source practices.",
    ],
  },
  {
    org: "IEEE SSIT",
    role: "Events Advisor",
    period: "Sep 2025 — Present",
    points: [
      "Advised and coordinated the planning and execution of Hackcelerate, ensuring smooth operations.",
      "Structured problem statements and evaluation processes aligned with real-world innovation challenges.",
    ],
  },
  {
    org: "Qwiklabs Developer Club",
    role: "Technical Member",
    period: "Sep 2025 — Present",
    points: [
      "Participated in hands-on cloud labs and technical workshops.",
      "Collaborated on project-based learning sessions to sharpen development skills.",
    ],
  },
];

export type Project = {
  index: string;
  title: string;
  kind: string;
  period: string;
  blurb: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Photonic Quantum Computer",
    kind: "Industrial Research",
    period: "Mar 2026 — Present",
    blurb:
      "Designing and simulating photonic quantum circuits for room-temperature computation using linear optical components. Implementing and evaluating quantum gate operations on photon-based qubits — focused on interference, fidelity, and noise analysis for scalable systems.",
    stack: ["Python", "Quantum Optics", "Simulation"],
  },
  {
    index: "02",
    title: "Prognosis Care",
    kind: "AI Healthcare Platform",
    period: "Mar 2026 — Apr 2026",
    blurb:
      "A responsive React frontend for an AI-powered healthcare triage and medical assistant system — integrated lab-test booking, billing, payment simulation, booking confirmation, live dashboard updates, and hospital-side report delivery.",
    stack: ["React", "AI", "Responsive UI"],
  },
  {
    index: "03",
    title: "Ai-Patha-Finder — PathMind",
    kind: "Algorithm Visualizer",
    period: "Apr 2026 — May 2026",
    blurb:
      "An interactive laboratory for exploring how AI 'thinks' about space and navigation. Transforms abstract pathfinding algorithms into high-speed visual animations — making visible the trade-offs between speed, memory, and accuracy.",
    stack: ["Algorithms", "Visualization", "JavaScript"],
  },
];

export type GlobeSkill = { name: string; category: string; note: string };

export const globeSkills: GlobeSkill[] = [
  { name: "Python", category: "Language", note: "Primary language — CAD, data, AI" },
  { name: "Java", category: "Language", note: "OOP & DSA foundations" },
  { name: "C++", category: "Language", note: "Systems & algorithms" },
  { name: "JavaScript", category: "Language", note: "Interactive frontends" },
  { name: "SQL", category: "Language", note: "Relational querying" },
  { name: "React", category: "Framework", note: "Component-driven UIs" },
  { name: "Next.js", category: "Framework", note: "This very site" },
  { name: "PySide6", category: "Framework", note: "Desktop CAD tooling" },
  { name: "NumPy", category: "Library", note: "Numerical computing" },
  { name: "Pandas", category: "Library", note: "Data wrangling" },
  { name: "Matplotlib", category: "Library", note: "Scientific plotting" },
  { name: "HTML", category: "Web", note: "Semantic structure" },
  { name: "CSS", category: "Web", note: "Responsive styling" },
  { name: "Tailwind", category: "Web", note: "Utility-first design" },
  { name: "GSAP", category: "Web", note: "Motion & animation" },
  { name: "MySQL", category: "Database", note: "Relational storage" },
  { name: "MongoDB", category: "Database", note: "Document storage" },
  { name: "Git", category: "Tooling", note: "Version control & OSS" },
  { name: "Open Source", category: "Tooling", note: "FOSSEE @ IIT Bombay" },
  { name: "Linux", category: "Tooling", note: "Everyday environment" },
  { name: "DSA", category: "Concept", note: "Data structures & algorithms" },
  { name: "OOP", category: "Concept", note: "Object-oriented design" },
  { name: "DBMS", category: "Concept", note: "Database systems" },
  { name: "Machine Learning", category: "Concept", note: "Models & inference" },
  { name: "Quantum Optics", category: "Concept", note: "Photonic computing research" },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Java", "C++", "SQL", "JavaScript"] },
  {
    group: "Libraries & Frameworks",
    items: ["NumPy", "Pandas", "Matplotlib", "PySide6", "React"],
  },
  {
    group: "Web",
    items: ["HTML", "CSS", "Responsive Design", "Frontend Development"],
  },
  { group: "Databases", items: ["MySQL", "MongoDB"] },
  {
    group: "Practice",
    items: ["Git & Open Source", "Data Structures", "OOP", "DBMS", "Machine Learning"],
  },
];

export const education = [
  {
    school: "SRM Institute of Science and Technology (SRMIST)",
    detail: "B.Tech in Computer Science",
    period: "Expected 2028",
    place: "Chennai, India",
    note: "Coursework: DSA, OOP, DBMS, Operating Systems, Machine Learning, Engineering Physics.",
  },
  {
    school: "Himalayan Public School",
    detail: "Higher Secondary",
    period: "2024",
    place: "Nagrota Bagwan",
    note: "",
  },
];

export const certifications = [
  "NPTEL — Data Structures & Algorithms using Java",
  "NPTEL — Programming in Java",
  "NPTEL — Introduction to Operating Systems",
];
