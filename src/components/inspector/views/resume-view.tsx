"use client";

import { ArrowUpRight, Download, FileText } from "lucide-react";
import { RESUME_PDF } from "../../../data/portfolio-content";
import { Button } from "../../ui/button";
import { Section } from "../inspector-primitives";

export const ResumeView = () => (
  <div className="flex flex-col gap-6">
    <Section label="artifact">
      <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-md border bg-background/60 text-[color:var(--node-accent)]">
          <FileText aria-hidden className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="break-all text-[13px] font-semibold">{RESUME_PDF.fileName}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            pdf · single page
          </p>
        </div>
      </div>
    </Section>

    <Section label="actions">
      <div className="flex gap-2">
        <Button asChild className="flex-1">
          <a href={RESUME_PDF.href} target="_blank" rel="noreferrer">
            Open
            <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <a href={RESUME_PDF.href} download={RESUME_PDF.fileName}>
            Download
            <Download aria-hidden className="size-3.5" />
          </a>
        </Button>
      </div>
    </Section>

    <p className="text-[12px] leading-relaxed text-muted-foreground">
      Prefer the interactive version? You are already looking at it.
    </p>
  </div>
);
