import type { Metadata } from "next";

import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { WriteupList } from "@/components/site/writeup-list";
import { site } from "@/content/site";
import { getAllWriteups } from "@/lib/writeups";

export const metadata: Metadata = {
  title: `Write-ups — ${site.name}`,
  description: `Write-ups de CTF et de challenges de cybersécurité par ${site.name}.`,
};

export default function WriteupsPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 pt-36 pb-28 sm:px-6 sm:pt-44 sm:pb-40">
        <SectionHeading eyebrow="Write-ups" title="CTF & challenges, expliqués." />
        <WriteupList writeups={getAllWriteups()} />
      </section>
    </PageShell>
  );
}
