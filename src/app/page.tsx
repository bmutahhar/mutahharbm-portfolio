import { CanvasClient } from "../components/canvas/canvas-client";
import {
  CONTACT_LINKS,
  EDUCATION_CONTENT,
  EXPERIENCE_ENTRIES,
  IMPACT_METRICS,
  PROFILE_CONTENT,
  SKILL_CATEGORIES,
  WORK_PROJECTS,
} from "../data/portfolio-content";
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

/**
 * Linear text rendering of everything the canvas shows. Visually hidden, but
 * fully available to crawlers and as a readable alternative for screen readers.
 */
const TextFallback = () => (
  <article aria-label="Portfolio text version" className="sr-only">
    <section>
      <h2>{PROFILE_CONTENT.title}</h2>
      <p>{PROFILE_CONTENT.summary}</p>
    </section>
    <section>
      <h2>Experience</h2>
      {EXPERIENCE_ENTRIES.map((entry) => (
        <section key={`${entry.company}-${entry.period}`}>
          <h3>
            {entry.role} at {entry.company} ({entry.period}, {entry.location})
          </h3>
          <ul>
            {entry.achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </section>
      ))}
    </section>
    <section>
      <h2>Selected Work</h2>
      {WORK_PROJECTS.map((project) => (
        <section key={project.id}>
          <h3>
            {project.title} — {project.company}
          </h3>
          <p>{project.outcome}</p>
          <p>{project.description}</p>
        </section>
      ))}
    </section>
    <section>
      <h2>Impact</h2>
      <ul>
        {IMPACT_METRICS.map((metric) => (
          <li key={metric.id}>
            {metric.label}: {metric.value}. {metric.description}
          </li>
        ))}
      </ul>
    </section>
    <section>
      <h2>Skills</h2>
      <ul>
        {SKILL_CATEGORIES.map((category) => (
          <li key={category.category}>
            {category.category}: {category.skills.join(", ")}
          </li>
        ))}
      </ul>
    </section>
    <section>
      <h2>Education</h2>
      <p>
        {EDUCATION_CONTENT.degree}, {EDUCATION_CONTENT.institution} (
        {EDUCATION_CONTENT.graduationYear}), CGPA {EDUCATION_CONTENT.cgpa}
      </p>
    </section>
    <section>
      <h2>Contact</h2>
      <ul>
        {CONTACT_LINKS.map((link) => (
          <li key={link.id}>
            {link.label}: <a href={link.href}>{link.value}</a>
          </li>
        ))}
      </ul>
    </section>
  </article>
);

const Page = () => (
  <>
    <main>
      <h1 className="sr-only">
        {PROFILE_CONTENT.name} - Frontend Engineer, Frontend Developer, React Flow Expert
      </h1>
      <CanvasClient />
      <TextFallback />
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
