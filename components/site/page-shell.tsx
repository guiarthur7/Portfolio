import { SiteBackground } from "@/components/site/site-background"
import { site } from "@/content/site"

import { Nav } from "./nav"

const subpageLinks = [
  { href: "/", label: "Accueil" },
  { href: "/writeups", label: "Write-ups" },
  { href: "/#contact", label: "Contact" },
]

/** Fond animé, barre de navigation et pied de page des pages secondaires. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteBackground />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black/55" />

      <Nav links={subpageLinks} />

      <main className="min-h-dvh text-white">{children}</main>

      <footer className="border-t border-white/10 bg-black/60">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Techniques pratiquées uniquement en environnements autorisés (CTF, labs personnels).</span>
        </div>
      </footer>
    </>
  )
}
