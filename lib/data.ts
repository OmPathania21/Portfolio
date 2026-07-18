export const profile = {
  name: "Om Pathania",
  role: "Computer Science Undergraduate",
  tagline:
    "I turn hard problems into software you can see move — one week it's a steel-bridge CAD engine, the next it's watching an algorithm think its way across a maze.",
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
      "Writing code that helps engineers design real steel plate-girder bridges — inside OsdagBridge, an open-source plugin for the Osdag project.",
      "Building the Python engine that turns bridge parameters into accurate 3D CAD models you can inspect from every angle.",
      "Living the open-source workflow: shipping features, hunting bugs, and keeping the codebase clean through Git and honest code review.",
    ],
  },
  {
    org: "IEEE SSIT",
    role: "Events Advisor",
    period: "Sep 2025 — Present",
    points: [
      "Helped run Hackcelerate end to end — keeping a room full of hackers, mentors, and deadlines moving in sync.",
      "Shaped the problem statements and judging criteria so teams solved challenges that actually matter in the real world.",
    ],
  },
  {
    org: "Qwiklabs Developer Club",
    role: "Technical Member",
    period: "Sep 2025 — Present",
    points: [
      "Getting hands dirty in cloud labs and workshops — learning infrastructure by breaking and rebuilding it.",
      "Trading ideas in project-based sessions where the fastest way to learn is to build alongside other people.",
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
      "What if a quantum computer didn't need to be frozen near absolute zero? I'm simulating photonic circuits that compute with light at room temperature — modelling how photon qubits interfere, how faithfully gates behave, and how much noise a scalable design can survive.",
    stack: ["Python", "Quantum Optics", "Simulation"],
  },
  {
    index: "02",
    title: "Prognosis Care",
    kind: "AI Healthcare Platform",
    period: "Mar 2026 — Apr 2026",
    blurb:
      "A calm front door to a stressful moment. This React app walks a patient from 'something feels wrong' to an AI triage answer, a booked lab test, a paid bill, and a report waiting at the hospital — the whole journey simulated end to end, live on one dashboard.",
    stack: ["React", "AI", "Responsive UI"],
  },
  {
    index: "03",
    title: "Ai-Patha-Finder — PathMind",
    kind: "Algorithm Visualizer",
    period: "Apr 2026 — May 2026",
    blurb:
      "Pathfinding algorithms are usually invisible math. PathMind puts them on stage — you watch A*, Dijkstra and friends race across a grid in real time and finally see the trade-off they're all quietly making between speed, memory, and the perfect route.",
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
