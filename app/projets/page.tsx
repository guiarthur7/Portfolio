import type { Metadata } from "next";
import { ArrowUpRight, Globe } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { pill } from "@/components/site/writeup-card";
import { githubProjects, site } from "@/content/site";

export const metadata: Metadata = {
  title: `Projets — ${site.name}`,
  description: `Projets de développement de ${site.name} : applications web, jeux et outils, code sur GitHub.`,
};

export default function ProjetsPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 pt-36 pb-28 sm:px-6 sm:pt-44 sm:pb-40">
        <SectionHeading eyebrow="Projets" title="Du terminal au navigateur." />
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {githubProjects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 100} className="h-full">
              <ProjectCard>
                <div className="group relative flex h-full min-h-72 flex-col justify-between rounded-3xl p-8 sm:p-10">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      {/* Lien étiré : toute la carte ouvre le repo */}
                      <a href={p.href} target="_blank" rel="noreferrer" className="after:absolute after:inset-0">
                        {p.title}
                      </a>
                    </h3>
                    <p className="mt-3 text-pretty text-white/60">{p.description}</p>
                  </div>
                  <div className="mt-8 flex items-end justify-between gap-4">
                    <ul className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <li key={t} className={pill}>
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="flex shrink-0 items-center gap-2">
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Voir ${p.title} en ligne`}
                          title="Voir en ligne"
                          className="relative z-10 grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white hover:text-black"
                        >
                          <Globe className="size-4" />
                        </a>
                      )}
                      <span className="grid size-9 place-items-center rounded-full bg-white/10 transition group-hover:bg-white group-hover:text-black">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </ProjectCard>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
