export type ContactLinkId = "email" | "phone" | "linkedin" | "github";

export type ContactLink = {
  id: ContactLinkId;
  label: string;
  value: string;
  href: string;
};

export type ProfileContent = {
  name: string;
  shortName: string;
  title: string;
  summary: string;
  shortSummary: string;
  focusStack: string[];
};

export type ProfileImageVariant = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

export type ProfileImageContent = {
  dialog: ProfileImageVariant;
  node: ProfileImageVariant;
};

export type ProjectContent = {
  id: string;
  title: string;
  company: string;
  outcome: string;
  description: string;
  problem: string;
  solution: string;
  whatIBuilt: string;
  tech: string[];
  roles: string[];
  metrics: Array<{ label: string; value: string }>;
  highlights: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  tech: string[];
};

export type SkillCategory = {
  category: string;
  skills: string[];
};

export type EducationContent = {
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  cgpa: string;
  highSchool?: {
    graduationYear: string;
    institution: string;
    location: string;
  };
};

export type ImpactMetric = {
  id: string;
  value: string;
  label: string;
  description: string;
  context: string;
};

export const PROFILE_CONTENT: ProfileContent = {
  name: "Mutahhar Bin Muzaffar",
  shortName: "Mutahhar BM",
  title: "Full Stack Engineer (Frontend-Leaning)",
  summary:
    "Accomplished full-stack, frontend-leaning engineer with 4+ years of experience, specializing in JavaScript, React, and Next.js, building scalable, high performance, SEO friendly web apps. Alongside strong frontend ownership, I also build backend services and delivery workflows using Node.js, Express.js, Nest.js, Clerk, Auth.js, AWS EC2, GitHub Actions, and CI/CD practices.",
  shortSummary:
    "Building scalable web apps with strong frontend ownership and practical backend delivery across APIs, auth, and deployment workflows.",
  focusStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
};

export const PROFILE_IMAGE: ProfileImageContent = {
  node: {
    alt: "Portrait of Mutahhar Bin Muzaffar",
    width: 160,
    height: 160,
    src: "https://res.cloudinary.com/ds7dclc6i/image/upload/c_fill,g_face,h_250,w_250,f_auto,q_auto/20260111_215133_zydt7g",
  },
  dialog: {
    alt: "Portrait of Mutahhar Bin Muzaffar",
    width: 450,
    height: 400,
    src: "https://res.cloudinary.com/ds7dclc6i/image/upload/c_limit,h_450,w_500,f_auto,q_auto/20260111_215133_zydt7g",
  },
};

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: "email",
    label: "Email",
    value: "mutahharbinmuzaffar@gmail.com",
    href: "mailto:mutahharbinmuzaffar@gmail.com",
  },
  {
    id: "phone",
    label: "Phone",
    value: "+92 301 2498730",
    href: "tel:+923012498730",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/mutahhar-bin-muzaffar",
    href: "https://www.linkedin.com/in/mutahhar-bin-muzaffar",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/bmutahhar",
    href: "https://github.com/bmutahhar",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["JavaScript", "TypeScript", "HTML", "CSS/SCSS"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "ShadCN", "Radix UI", "Redux", "Zustand", "React Flow", "React Query", "React Hook Form", "Material UI"],
  },
  {
    category: "Backend/Infra",
    skills: [
      "Node.js",
      "Express.js",
      "Nest.js",
      "Strapi CMS",
      "Firebase",
      "Socket.io",
      "Clerk",
      "Auth.js",
      "AWS EC2",
      "Docker",
      "Kubernetes",
      "CI/CD",
    ],
  },
  {
    category: "Testing/Tools",
    skills: ["Jest", "Git", "GitHub Actions", "REST APIs"],
  },
];

export const FLAT_TECH_STACK = SKILL_CATEGORIES.flatMap((category) => category.skills);

export const SKILL_HIGHLIGHTS = [
  "Bar Riser Award at Vyro (2025)",
  "4+ years building scalable, high-performance, SEO-friendly web apps",
  "Frontend-first product ownership with backend delivery across APIs, auth, and deployment workflows",
];

export const WORK_PROJECTS: ProjectContent[] = [
  {
    id: "workflows-canvas",
    title: "Workflows Canvas",
    company: "ImagineArt - Vyro.ai",
    outcome: "Unified React Flow canvas for text, image, and video generation",
    description:
      "Led Workflows, a unified React Flow canvas for text, image, and video generation.",
    problem:
      "The product needed one workflow surface for text, image, and video generation instead of separate experiences.",
    solution:
      "Built a single React Flow-based experience that unified architecture, state, node interactions, and real-time execution.",
    whatIBuilt:
      "Designed the architecture, state, and interactions for complex nodes and real-time execution across the workflow canvas.",
    tech: ["React", "React Flow", "Zustand"],
    roles: ["Architecture", "State Management", "Feature Delivery"],
    metrics: [
      { label: "Platform scope", value: "Text + Image + Video" },
      { label: "Execution model", value: "Real-time" },
      { label: "Feature status", value: "High Impact" },
    ],
    highlights: [
      "Led the Workflows feature as a unified React Flow canvas",
      "Designed architecture for complex nodes and interactions",
      "Delivered real-time execution for the workflow experience",
    ],
  },
  {
    id: "ideate-infinite-canvas",
    title: "Ideate",
    company: "ImagineArt - Vyro.ai",
    outcome:
      "Shipped an infinite canvas experience with integrated AI image generation and seamless UI-canvas orchestration.",
    description:
      "Developed Ideate, an infinite canvas product experience with integrated AI image generation.",
    problem:
      "The product needed a scalable architecture that could connect advanced canvas interactions with a polished user interface and reliable global state.",
    solution:
      "Architected the Next.js codebase, built the full UI layer, implemented global state management, and acted as the bridge between Fabric.js canvas behavior and application UI flows.",
    whatIBuilt:
      "Owned architecture, end-to-end UI development, and state/store logic, while integrating canvas actions from the Fabric.js layer into user-facing controls and workflows.",
    tech: ["Next.js", "Tailwind CSS", "ShadCN", "Fabric.js", "AI Image Generation"],
    roles: ["Architecture", "UI Development", "State Management", "Canvas-UI Integration"],
    metrics: [
      { label: "Canvas type", value: "Infinite Canvas" },
      { label: "AI capability", value: "Integrated Image Generation" },
      { label: "Frontend ownership", value: "Architecture + UI + Global Store" },
    ],
    highlights: [
      "Architected the Ideate codebase for long-term feature scalability",
      "Developed the complete UI and global store/state management",
      "Bridged Fabric.js canvas interactions with UI elements and workflows",
      "Delivered the feature stack using Next.js, Tailwind CSS, and ShadCN",
    ],
  },
  {
    id: "subscription-feature-gating",
    title: "Subscription-Based Feature Gating",
    company: "ImagineArt - Vyro.ai",
    outcome: "60% rollout efficiency gain and 35% lower access-update overhead",
    description:
      "Built subscription based feature gating with Firebase Remote Config for real time rollouts.",
    problem:
      "Feature access updates were slower and required more overhead than needed for subscription-based releases.",
    solution:
      "Implemented Firebase Remote Config based gating so rollouts could happen in real time without manual access updates.",
    whatIBuilt:
      "Delivered subscription-based gating logic for real-time rollouts and supported more efficient access updates across releases.",
    tech: ["Firebase", "Firebase Remote Config"],
    roles: ["Rollouts", "Access Control", "Release Delivery"],
    metrics: [
      { label: "Rollout efficiency improvement", value: "60%" },
      { label: "Lower access-update overhead", value: "35%" },
      { label: "Subscription growth contribution", value: "20%" },
    ],
    highlights: [
      "Enabled real-time feature rollouts with Firebase Remote Config",
      "Reduced access update overhead by 35%",
      "Contributed to 20% subscription growth",
    ],
  },
  {
    id: "dashboard-seo",
    title: "Dashboard Modularization + Blog Section",
    company: "ImagineArt - Vyro.ai",
    outcome: "40% load time reduction and launch of the company’s first blog section",
    description:
      "Modularized dashboards across product lines with reusable components and built the company’s first blog section using Strapi CMS with Next.js SSR.",
    problem:
      "Dashboards needed reusable building blocks across product lines, and the product needed a scalable content engine for a production blog section.",
    solution:
      "Introduced reusable dashboard components and delivered a Strapi CMS-backed blog experience rendered with Next.js SSR.",
    whatIBuilt:
      "Helped modularize dashboard experiences across product lines and built the end-to-end blog section with Strapi content modeling and SSR rendering.",
    tech: ["Next.js", "Strapi CMS", "Reusable Components"],
    roles: ["Modularization", "CMS Integration", "SSR Delivery"],
    metrics: [
      { label: "Load time reduction", value: "40%" },
      { label: "Blog platform", value: "Strapi CMS + Next.js SSR" },
      { label: "Component model", value: "Reusable" },
    ],
    highlights: [
      "Modularized dashboards across product lines",
      "Built the company’s first blog section with Strapi CMS and Next.js SSR",
      "Cut load time by 40% with reusable dashboard architecture",
    ],
  },
  {
    id: "ecommerce-ops-platforms",
    title: "eCommerce + Ops Platforms",
    company: "Engiselle",
    outcome: "20% higher transaction volume and 35% higher user engagement",
    description:
      "Delivered eCommerce products, including an online pharmacy and home-repair platform, and shipped operations workflows across the platform.",
    problem:
      "The business needed production-ready eCommerce and support workflows that could increase transactions and improve user engagement.",
    solution:
      "Delivered eCommerce features, added real-time event notifications, and introduced image annotation and ANPR webhook workflows.",
    whatIBuilt:
      "Built product features for online pharmacy and home-repair experiences, plus operational workflows that improved support-case handling.",
    tech: ["Node.js", "Socket.io", "REST APIs"],
    roles: ["Product Delivery", "Real-time Features", "Workflow Integration"],
    metrics: [
      { label: "Transaction volume increase", value: "20%" },
      { label: "User engagement increase", value: "35%" },
      { label: "Support workflow impact", value: "Faster Resolution" },
    ],
    highlights: [
      "Delivered eCommerce products across multiple verticals",
      "Implemented real-time event notifications with Socket.io",
      "Added image annotation and ANPR webhook workflows",
    ],
  },
  {
    id: "healthcare-marketplace",
    title: "Healthcare Provider Dashboard + Marketplace Stabilization",
    company: "DevsInc",
    outcome: "40% faster load time, 20% faster releases, and 30% fewer support tickets",
    description:
      "Built a healthcare provider dashboard with React, Material UI, calendar workflows, and Twilio video, then improved dashboard UX and marketplace reliability.",
    problem:
      "The team needed a provider dashboard while also improving dashboard performance and reducing issues affecting marketplace UX.",
    solution:
      "Delivered the healthcare dashboard, improved query performance, and resolved production issues that were slowing delivery and increasing support load.",
    whatIBuilt:
      "Built the dashboard interface, supported calendar workflows and Twilio video, and resolved 50+ production issues while improving marketplace UX with React and TypeScript.",
    tech: ["React", "Material UI", "Twilio", "TypeScript"],
    roles: ["Dashboard Delivery", "Performance", "Stabilization"],
    metrics: [
      { label: "Load time reduction", value: "40%" },
      { label: "Faster feature releases", value: "20%" },
      { label: "Support ticket reduction", value: "30%" },
    ],
    highlights: [
      "Built a healthcare provider dashboard with calendar workflows and Twilio video",
      "Improved dashboard UX and query performance",
      "Resolved 50+ production issues and improved marketplace UX",
    ],
  },
  {
    id: "geospatial-kubernetes",
    title: "Geospatial Interfaces + Kubernetes Deployments",
    company: "Pakistan Air Force",
    outcome: "10+ feasibility studies, 50% faster deployments, and 99.9% uptime",
    description:
      "Conducted feasibility studies, built interactive geospatial interfaces with Mapbox, and deployed Docker images on local Kubernetes.",
    problem:
      "The R&D team needed faster feasibility validation, interactive geospatial tooling, and more reliable local deployment workflows.",
    solution:
      "Supported research decisions with feasibility studies, shipped Mapbox-based interfaces, and deployed Docker workloads on local Kubernetes.",
    whatIBuilt:
      "Contributed 10+ feasibility studies, developed interactive geospatial interfaces, and deployed 20+ Docker images on local Kubernetes.",
    tech: ["Mapbox", "Docker", "Kubernetes"],
    roles: ["R&D", "Geospatial UI", "Deployments"],
    metrics: [
      { label: "Feasibility studies completed", value: "10+" },
      { label: "Deployment time reduction", value: "50%" },
      { label: "Uptime", value: "99.9%" },
    ],
    highlights: [
      "Conducted 10+ feasibility studies in an R&D team",
      "Built interactive geospatial interfaces with Mapbox",
      "Deployed 20+ Docker images on local Kubernetes",
    ],
  },
];

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    company: "ImagineArt - Vyro.ai",
    role: "Frontend Engineer",
    period: "Jul 2023 - Present",
    location: "Islamabad, Pakistan",
    achievements: [
      "Led Workflows, a unified React Flow canvas for text, image, and video generation. Designed architecture, state, and interactions for complex nodes and real time execution, delivering a scalable, high impact platform feature.",
      "Developed Ideate, an infinite canvas experience with integrated AI image generation. Architected the codebase, built the full UI, and owned global state management, while bridging Fabric.js canvas functionality with user-facing UI elements.",
      "Built subscription based feature gating with Firebase Remote Config for real time rollouts, improving rollout efficiency by 60% and reducing access update overhead by 35%, contributing to 20% subscription growth.",
      "Modularized dashboards across product lines with reusable components, enabling faster dashboard creation and reducing implementation effort from around 3 days to just a few hours.",
      "Built the company's first blog section using Strapi CMS and Next.js SSR.",
    ],
    tech: ["React", "React Flow", "Next.js", "Tailwind CSS", "ShadCN", "Firebase", "Zustand", "TypeScript"],
  },
  {
    company: "Engiselle",
    role: "Full Stack Developer",
    period: "Mar 2022 - Mar 2025",
    location: "Singapore",
    achievements: [
      "Delivered eCommerce products, including an online pharmacy and home-repair platform, increasing transaction volume by 20%.",
      "Implemented real-time event notifications with Socket.io, increasing user engagement by 35%.",
      "Implemented an image annotation mechanism that allowed users to upload images and draw annotations, helping teams pinpoint defects more accurately.",
      "Implemented Hikvision number plate recognition integration and developed a webhook flow to emit ANPR events and listen to them within the application.",
    ],
    tech: ["React", "Next.js","Node.js", "Socket.io", "REST APIs", "TypeScript"],
  },
  {
    company: "DevsInc",
    role: "Software Engineer",
    period: "Jun 2022 - Jun 2023",
    location: "Islamabad, Pakistan",
    achievements: [
      "Built a healthcare provider dashboard with React, Material UI, calendar workflows, and Twilio video call integration.",
      "Improved dashboard UX and query performance, reducing load time by 40% and accelerating feature releases by 20%.",
      "Resolved 50+ production issues and improved marketplace UX with React and TypeScript, reducing support tickets by 30%.",
    ],
    tech: ["React", "Material UI", "Twilio", "TypeScript"],
  },
  {
    company: "Pakistan Air Force",
    role: "Software Engineer",
    period: "Oct 2021 - Jun 2022",
    location: "Islamabad, Pakistan",
    achievements: [
      "Conducted 10+ feasibility studies in an R&D team, improving decision-making speed by 30%.",
      "Developed interactive geospatial interfaces with Mapbox and deployed 20+ Docker images on local Kubernetes, reducing deployment time by 50% with 99.9% uptime.",
    ],
    tech: ["Mapbox", "Docker", "Kubernetes"],
  },
];

export const EDUCATION_CONTENT: EducationContent = {
  degree: "Bachelor of Computer Science",
  institution: "COMSATS University, Islamabad",
  location: "Islamabad, Pakistan",
  graduationYear: "2021",
  cgpa: "3.73 / 4.00",
  highSchool: {
    institution: "Bahria College, NORE 1",
    graduationYear: "2017",
    location: "Karachi, Pakistan",
  },
};

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    id: "rollout-efficiency",
    value: "60%",
    label: "Feature Rollout Efficiency",
    description: "Improved rollout efficiency with Firebase Remote Config based feature gating.",
    context:
      "Reduced access-update overhead by 35% while supporting real-time rollouts and contributing to 20% subscription growth.",
  },
  {
    id: "development-cost",
    value: "3d -> 1h",
    label: "Dashboard Dev Effort",
    description:
      "Reduced new dashboard development effort through modular architecture and reusable components.",
    context:
      "The modular mechanism reduced new dashboard implementation from around 3 days to nearly 1 hour.",
  },
  {
    id: "engagement",
    value: "35%",
    label: "User Engagement Increase",
    description:
      "Increased user engagement with real-time event notifications built using Socket.io.",
    context:
      "Delivered real-time notifications at Engiselle while also improving support-case accuracy and resolution speed.",
  },
  {
    id: "workflow-retention",
    value: "#1",
    label: "Workflow User Retention",
    description: "Workflows became the highest user-retention feature in the ImagineArt product.",
    context:
      "The unified workflow experience drove stronger repeat usage and long-term user stickiness.",
  },
];

export const IMPACT_ACHIEVEMENTS = [
  "Built Workflows into the highest user-retention feature in the ImagineArt product.",
  "Reduced access update overhead by 35% with Firebase Remote Config based gating.",
  "Contributed to 20% subscription growth through controlled feature rollouts.",
  "Reduced dashboard implementation effort from around 3 days to nearly 1 hour through modular architecture.",
  "Accelerated feature releases by 20% and reduced support tickets by 30% at DevsInc.",
];
