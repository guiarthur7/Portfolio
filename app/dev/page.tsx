import type { Metadata } from "next";
import { ArrowUpRight, ChevronRight } from "lucide-react";

import { Nav } from "@/components/site/nav";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading, glass } from "@/components/site/section-heading";
import { SiteBackground } from "@/components/site/site-background";
import { about, projects, site, skills } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — Développeur`,
};

export default function Dev() {
  return (
    <>
      <SiteBackground />
      {/* voile qui s'assombrit vers le bas pour garder le texte lisible */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_75%)]" />

      <Nav />

      <main className="text-white">
        {/* Hero */}
        <section className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-white/60">{site.role}</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 font-display text-[clamp(3rem,11vw,8rem)] leading-[0.95] font-normal">
              {site.name}.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-white/70 sm:text-xl">
              {site.tagline}
            </p>
          </Reveal>
          <Reveal delay={300} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a
              href="#projets"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/85"
            >
              Voir les projets
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center text-sm font-medium text-white/80 transition hover:text-white"
            >
              Me contacter
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </section>

        <div className="bg-gradient-to-b from-transparent via-black/60 to-black/80">
          {/* Projets */}
          <section id="projets" className="mx-auto max-w-5xl scroll-mt-12 px-4 py-28 sm:px-6 sm:py-40">
            <SectionHeading eyebrow="Projets" title="Sélection de travaux." />
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {projects.map((p, i) => (
                <Reveal key={i} delay={(i % 2) * 100}>
                  <a
                    href={p.href}
                    className={`${glass} group flex h-full min-h-72 flex-col justify-between p-8 transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] sm:p-10`}
                  >
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{p.title}</h3>
                      <p className="mt-3 text-pretty text-white/60">{p.description}</p>
                    </div>
                    <div className="mt-8 flex items-end justify-between gap-4">
                      <ul className="flex flex-wrap gap-2">
                        {p.tags.map((t, j) => (
                          <li key={j} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                            {t}
                          </li>
                        ))}
                      </ul>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 transition group-hover:bg-white group-hover:text-black">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>

          {/* À propos */}
          <section id="a-propos" className="mx-auto max-w-4xl scroll-mt-12 px-6 py-28 sm:py-40">
            <Reveal>
              <p className="text-sm font-medium text-white/50">À propos</p>
              <p className="mt-6 text-3xl leading-tight font-semibold tracking-tight text-pretty text-white/40 sm:text-5xl">
                {about.statement.map((part, i) => (
                  <span key={i} className={part.strong ? "text-white" : undefined}>
                    {part.text}
                  </span>
                ))}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <dl className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
                {about.details.map((d) => (
                  <div key={d.label} className="bg-black/50 p-6 backdrop-blur-2xl">
                    <dt className="text-xs text-white/50">{d.label}</dt>
                    <dd className="mt-1 font-medium">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </section>

          {/* Compétences */}
          <section className="mx-auto max-w-5xl px-4 py-28 sm:px-6 sm:py-40">
            <SectionHeading eyebrow="Compétences" title="Les outils du métier." />
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
              {skills.map((s, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className={`${glass} h-full p-8`}>
                    <h3 className="text-lg font-semibold">{s.group}</h3>
                    <ul className="mt-4 space-y-2 text-white/60">
                      {s.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-12 px-6 py-32 text-center sm:py-48">
            <Reveal>
              <h2 className="text-5xl font-semibold tracking-[-0.03em] sm:text-7xl">Parlons-en.</h2>
              <p className="mx-auto mt-5 max-w-md text-lg text-white/60">
                Un projet, un stage ou simplement une question&nbsp;? Écrivez-moi.
              </p>
            </Reveal>
            <Reveal delay={100} className="mt-10 flex flex-col items-center gap-6">
              <a
                href={`mailto:${site.email}`}
                className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-white/85"
              >
                {site.email}
              </a>
              <ul className="flex gap-6 text-sm text-white/60">
                {site.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="inline-flex items-center gap-1 transition hover:text-white">
                      {l.label}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          <footer className="border-t border-white/10">
            <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-6 text-xs text-white/40 sm:flex-row sm:justify-between">
              <span>© {new Date().getFullYear()} {site.name}</span>
              <span>Conçu et développé par {site.name}</span>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
