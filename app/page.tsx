import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, KeyRound } from "lucide-react";

import { Nav } from "@/components/site/nav";
import { Reveal } from "@/components/site/reveal";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading, glass } from "@/components/site/section-heading";
import { WriteupCard, pill } from "@/components/site/writeup-card";
import { SiteBackground } from "@/components/site/site-background";
import {
  certifications,
  cyber,
  cyberSkills,
  domains,
  labs,
  stats,
  timeline,
} from "@/content/cyber";
import { site } from "@/content/site";
import { getAllWriteups } from "@/lib/writeups";

export const metadata: Metadata = {
  title: `${site.name} — Cybersécurité`,
  description: `Portfolio cybersécurité de ${site.name} : write-ups, labs et certifications.`,
};

const links = [
  { href: "/writeups", label: "Write-ups" },
  { href: "#labs", label: "Labs" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  const latestWriteups = getAllWriteups().slice(0, 4);

  return (
    <>
      <SiteBackground />
      {/* voile qui s'assombrit vers le bas pour garder le texte lisible */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_75%)]" />

      <Nav links={links} />

      <main className="text-white">
        {/* Hero */}
        <section className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-white/60">{cyber.role}</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 font-display text-[clamp(3rem,11vw,8rem)] leading-[0.95] font-normal">
              {site.name}.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-white/70 sm:text-xl">
              {cyber.tagline}
            </p>
          </Reveal>
          <Reveal delay={300} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a
              href="#write-ups"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/85"
            >
              Lire les write-ups
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
          {/* Domaines */}
          <section className="mx-auto max-w-5xl px-4 py-28 sm:px-6 sm:py-40">
            <SectionHeading eyebrow="Domaines" title="Attaquer pour mieux défendre." />
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {domains.map((d, i) => (
                <Reveal key={i} delay={(i % 2) * 100}>
                  <div className={`${glass} h-full p-8 sm:p-10`}>
                    <h3 className="text-2xl font-semibold tracking-tight">{d.title}</h3>
                    <p className="mt-3 text-pretty text-white/60">{d.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Write-ups */}
          <section id="write-ups" className="mx-auto max-w-5xl scroll-mt-16 px-4 py-28 sm:px-6 sm:py-40">
            <SectionHeading eyebrow="Write-ups" title="CTF & challenges, expliqués." />
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {latestWriteups.map((w, i) => (
                <Reveal key={w.slug} delay={(i % 2) * 100} className="h-full">
                  <WriteupCard writeup={w} />
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10 text-center">
              <Link
                href="/writeups"
                className="group inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Tous les write-ups
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </section>

          {/* Labs */}
          <section id="labs" className="mx-auto max-w-5xl scroll-mt-16 px-4 py-28 sm:px-6 sm:py-40">
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

          {/* Certifications & classements */}
          <section id="certifications" className="mx-auto max-w-5xl scroll-mt-16 px-4 py-28 sm:px-6 sm:py-40">
            <SectionHeading eyebrow="Certifications & classements" title="Les preuves." />
            <Reveal>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
                {stats.map((s, i) => (
                  <div key={i} className="flex flex-col-reverse bg-black/50 p-6 backdrop-blur-2xl sm:p-8">
                    <dt className="mt-1 text-xs text-white/50">{s.label}</dt>
                    <dd className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={100}>
              <ul className={`${glass} mt-5 divide-y divide-white/10 px-8`}>
                {certifications.map((c, i) => (
                  <li key={i} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                    <span className="font-medium">
                      {c.name} <span className="text-white/50">· {c.issuer}</span>
                    </span>
                    <span className="text-sm text-white/60">{c.status}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* Compétences */}
          <section className="mx-auto max-w-5xl px-4 py-28 sm:px-6 sm:py-40">
            <SectionHeading eyebrow="Compétences" title="Rouge, bleu, et les outils entre les deux." />
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {cyberSkills.map((s, i) => (
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

          {/* Parcours */}
          <section className="mx-auto max-w-4xl px-6 py-28 sm:py-40">
            <Reveal>
              <p className="text-sm font-medium text-white/50">Parcours</p>
            </Reveal>
            <ol className="mt-6">
              {timeline.map((t, i) => (
                <Reveal key={i} delay={i * 100}>
                  <li className="grid gap-1 border-b border-white/10 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
                    <span className="text-sm text-white/50">{t.when}</span>
                    <span className="text-xl font-medium tracking-tight text-pretty">{t.what}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-16 px-6 py-32 text-center sm:py-48">
            <Reveal>
              <h2 className="text-5xl font-semibold tracking-[-0.03em] sm:text-7xl">Parlons-en.</h2>
              <p className="mx-auto mt-5 max-w-md text-lg text-white/60">
                Stage, alternance, audit ou simple question&nbsp;? Écrivez-moi.
              </p>
            </Reveal>
            <Reveal delay={100} className="mt-10 flex flex-col items-center gap-6">
              <a
                href={`mailto:${cyber.email}`}
                className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-white/85"
              >
                {cyber.email}
              </a>
              {cyber.pgpFingerprint && (
                <a
                  href={cyber.pgpKeyHref}
                  className="inline-flex max-w-full items-center gap-2 font-mono text-xs break-all text-white/50 transition hover:text-white"
                >
                  <KeyRound className="size-3.5 shrink-0" />
                  PGP {cyber.pgpFingerprint}
                </a>
              )}
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/60">
                {cyber.links.map((l) => (
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
              <span>Techniques pratiquées uniquement en environnements autorisés (CTF, labs personnels).</span>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
