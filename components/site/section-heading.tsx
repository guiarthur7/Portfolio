import { Reveal } from "./reveal"

export const glass =
  "rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl backdrop-saturate-150"

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-12 text-center sm:mb-16">
      <p className="text-sm font-medium text-white/50">{eyebrow}</p>
      <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
        {title}
      </h2>
    </Reveal>
  )
}
