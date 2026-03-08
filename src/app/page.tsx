import PortfolioFlowClient from "../components/portfolio-flow-client";
import { CONTACT_LINKS, PROFILE_CONTENT, WORK_PROJECTS } from "../data/portfolio-content";
import { siteUrl } from "./site-config";

const externalProfiles = CONTACT_LINKS.filter(
  (contact) => contact.id === "linkedin" || contact.id === "github",
).map((contact) => contact.href);

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE_CONTENT.name,
  jobTitle: "Frontend Engineer",
  description:
    "Frontend Engineer, Frontend Developer, and React Flow expert focused on React, Next.js, and TypeScript.",
  url: siteUrl,
  sameAs: externalProfiles,
  knowsAbout: [
    "Frontend Engineering",
    "Frontend Development",
    "React",
    "Next.js",
    "TypeScript",
    "React Flow",
  ],
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${PROFILE_CONTENT.name} Portfolio`,
  url: siteUrl,
  description:
    "Portfolio website of Mutahhar Bin Muzaffar, Frontend Engineer and React Flow expert.",
};

const seoHighlights = [
  "Frontend Engineer with frontend-first product ownership.",
  "Frontend Developer focused on React, Next.js, and TypeScript.",
  "React Flow expert building node-based workflow products.",
  ...WORK_PROJECTS.slice(0, 3).map((project) => `${project.title}: ${project.outcome}.`),
];

const Page = () => (
  <>
    <main>
      <h1 className="sr-only">
        {PROFILE_CONTENT.name} - Frontend Engineer, Frontend Developer, React Flow Expert
      </h1>
      <PortfolioFlowClient />
      <section aria-label="Portfolio search summary" className="sr-only">
        <p>
          {PROFILE_CONTENT.name} is a Frontend Engineer and Frontend Developer with deep experience
          in React Flow.
        </p>
        <ul>
          {seoHighlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>
    </main>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
    />
  </>
);

export default Page;
