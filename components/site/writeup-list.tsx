"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import type { WriteupMeta } from "@/lib/writeups"

import { Reveal } from "./reveal"
import { WriteupCard } from "./writeup-card"

export function WriteupList({ writeups }: { writeups: WriteupMeta[] }) {
  const [active, setActive] = useState<string | null>(null)

  // Seules les catégories réellement utilisées apparaissent dans le filtre
  const categories = [...new Set(writeups.map((w) => w.category))]
  const shown = active ? writeups.filter((w) => w.category === active) : writeups

  const chip = (selected: boolean) =>
    cn(
      "rounded-full px-4 py-1.5 text-sm transition",
      selected ? "bg-white text-black" : "border border-white/10 text-white/60 hover:border-white/30 hover:text-white",
    )

  if (writeups.length === 0) {
    return <p className="text-center text-white/50">Premiers write-ups bientôt.</p>
  }

  return (
    <>
      <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
        <button type="button" aria-pressed={active === null} onClick={() => setActive(null)} className={chip(active === null)}>
          Tous <span className="opacity-50">{writeups.length}</span>
        </button>
        {categories.map((c) => (
          <button key={c} type="button" aria-pressed={active === c} onClick={() => setActive(c)} className={chip(active === c)}>
            {c} <span className="opacity-50">{writeups.filter((w) => w.category === c).length}</span>
          </button>
        ))}
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {shown.map((w, i) => (
          <Reveal key={w.slug} delay={(i % 2) * 100}>
            <WriteupCard writeup={w} />
          </Reveal>
        ))}
      </div>
    </>
  )
}
