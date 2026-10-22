import Navbar from "@/components/ui/navbar-02"
import type { NavbarLink } from "@/components/ui/navbar-02-utils/navigation-sheet"
import { site } from "@/content/site"

const defaultLinks: NavbarLink[] = [
  { href: "#projets", label: "Projets" },
  { href: "#a-propos", label: "À propos" },
  { href: "#contact", label: "Contact" },
]

// Navigation principale (accueil, write-ups) : liens absolus /#… valables depuis toutes les pages
export const mainLinks: NavbarLink[] = [
  { href: "/writeups", label: "Write-ups" },
  { href: "/#labs", label: "Labs" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/#contact", label: "Contact" },
]

const githubHref = site.links.find((l) => l.label === "GitHub")?.href

export function Nav({ links = defaultLinks }: { links?: NavbarLink[] }) {
  return <Navbar links={links} githubHref={githubHref} />
}
