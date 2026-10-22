import Link from "next/link"

import { site } from "@/content/site"

type NavLink = { href: string; label: string }

const defaultLinks: NavLink[] = [
  { href: "#projets", label: "Projets" },
  { href: "#a-propos", label: "À propos" },
  { href: "#contact", label: "Contact" },
]

export function Nav({ links = defaultLinks }: { links?: NavLink[] }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="shrink-0 font-display text-base text-white">
          {site.name}
        </Link>
        <ul className="flex items-center gap-4 overflow-x-auto text-xs text-white/70 [scrollbar-width:none] sm:gap-8">
          {links.map((l) => (
            <li key={l.href} className="shrink-0">
              <Link href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
