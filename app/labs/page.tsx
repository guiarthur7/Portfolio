import type { Metadata } from "next";

import { PageShell } from "@/components/site/page-shell";
import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { pill } from "@/components/site/writeup-card";
import { labs } from "@/content/cyber";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Labs — ${site.name}`,
  description: `Homelab et projets techniques de ${site.name} : serveurs, réseaux et sécurité.`,
};

export default function LabsPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 pt-36 pb-28 sm:px-6 sm:pt-44 sm:pb-40">
        <SectionHeading eyebrow="Homelab & projets" title="Construit, cassé, durci." />
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {labs.map((l, i) => (
            <Reveal key={i} delay={i * 100} className="h-full">
              <ProjectCard>
                <a href={l.href} className="relative flex h-full flex-col justify-between rounded-3xl p-8">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{l.title}</h3>
                    <p className="mt-3 text-pretty text-white/60">{l.text}</p>
                  </div>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {l.stack.map((s, j) => (
                      <li key={j} className={pill}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </a>
              </ProjectCard>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
