"use client";

import { EDUCATION_CONTENT } from "../../../data/portfolio-content";
import { Fact, Section } from "../inspector-primitives";

export const EducationView = () => (
  <div className="flex flex-col gap-6">
    <Section label="degree">
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-[15px] font-bold tracking-tight">{EDUCATION_CONTENT.degree}</h3>
        <div className="mt-2 flex flex-col gap-1.5">
          <Fact label="where">
            {EDUCATION_CONTENT.institution} · {EDUCATION_CONTENT.location}
          </Fact>
          <Fact label="class of">{EDUCATION_CONTENT.graduationYear}</Fact>
          <Fact label="cgpa">{EDUCATION_CONTENT.cgpa}</Fact>
        </div>
      </div>
    </Section>

    {EDUCATION_CONTENT.highSchool && (
      <Section label="before that">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-[15px] font-bold tracking-tight">
            {EDUCATION_CONTENT.highSchool.institution}
          </h3>
          <div className="mt-2 flex flex-col gap-1.5">
            <Fact label="where">{EDUCATION_CONTENT.highSchool.location}</Fact>
            <Fact label="class of">{EDUCATION_CONTENT.highSchool.graduationYear}</Fact>
          </div>
        </div>
      </Section>
    )}
  </div>
);
