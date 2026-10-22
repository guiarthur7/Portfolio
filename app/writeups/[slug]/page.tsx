import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/site/markdown";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { glass } from "@/components/site/section-heading";
import { pill } from "@/components/site/writeup-card";
import { site } from "@/content/site";
import { formatDate, getAllWriteups, getWriteup } from "@/lib/writeups";

// Pré-générés au build ; un write-up ajouté ensuite (admin en local) est rendu à la demande,
// et toute adresse sans fichier correspondant renvoie une 404 (getWriteup → notFound).
export function generateStaticParams() {
  return getAllWriteups().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/writeups/[slug]">): Promise<Metadata> {
  const writeup = getWriteup((await params).slug);
  if (!writeup) return {};
  return {
    title: `${writeup.title} — ${site.name}`,
    description: writeup.summary,
  };
}

export default async function WriteupPage({ params }: PageProps<"/writeups/[slug]">) {
  const writeup = getWriteup((await params).slug);
  if (!writeup) notFound();

  const all = getAllWriteups();
  const index = all.findIndex((w) => w.slug === writeup.slug);
  const newer = all[index - 1];
  const older = all[index + 1];

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 pt-28 pb-24 sm:px-6 sm:pt-36">
        <Reveal>
          <Link
            href="/writeups"
            className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Tous les write-ups
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/50">
            <span className={pill}>{writeup.category}</span>
            <span>{writeup.platform}</span>
            <span aria-hidden>·</span>
            <span>{writeup.difficulty}</span>
            <span aria-hidden>·</span>
            <time dateTime={writeup.date}>{formatDate(writeup.date)}</time>
          </div>

          <h1 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
            {writeup.title}
          </h1>
          <p className="mt-5 text-lg text-pretty text-white/70 sm:text-xl">{writeup.summary}</p>

          {writeup.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {writeup.tags.map((t) => (
                <li key={t} className={pill}>
                  {t}
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal delay={100}>
          <MarkdownContent content={writeup.content} className={`${glass} mt-12 bg-black/60 p-6 sm:p-12`} />
        </Reveal>

        {(newer || older) && (
          <nav aria-label="Autres write-ups" className="mt-10 grid gap-4 sm:grid-cols-2">
            {older ? (
              <Link href={`/writeups/${older.slug}`} className={`${glass} p-6 transition hover:border-white/20 hover:bg-white/[0.07]`}>
                <span className="text-xs text-white/50">← Précédent</span>
                <span className="mt-1 block font-medium text-balance">{older.title}</span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {newer && (
              <Link
                href={`/writeups/${newer.slug}`}
                className={`${glass} p-6 text-right transition hover:border-white/20 hover:bg-white/[0.07]`}
              >
                <span className="text-xs text-white/50">Suivant →</span>
                <span className="mt-1 block font-medium text-balance">{newer.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </PageShell>
  );
}
