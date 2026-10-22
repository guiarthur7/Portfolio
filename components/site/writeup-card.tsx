import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import type { WriteupMeta } from "@/lib/writeups"

import { glass } from "./section-heading"

export const pill = "rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"

export function WriteupCard({ writeup: w }: { writeup: WriteupMeta }) {
  return (
    <Link
      href={`/writeups/${w.slug}`}
      className={`${glass} group flex h-full min-h-72 flex-col justify-between p-8 transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] sm:p-10`}
    >
      <div>
        <div className="flex items-center justify-between gap-4 text-xs text-white/50">
          <span>{w.platform}</span>
          <span>{w.difficulty}</span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{w.title}</h3>
        <p className="mt-3 text-pretty text-white/60">{w.summary}</p>
      </div>
      <div className="mt-8 flex items-end justify-between gap-4">
        <span className={pill}>{w.category}</span>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 transition group-hover:bg-white group-hover:text-black">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  )
}
