import Aurora from "@/components/ui/aurora"

/** Fond animé fixe, derrière le contenu de toutes les pages publiques. */
export function SiteBackground() {
  return <Aurora aria-hidden className="pointer-events-none fixed inset-0 -z-20 bg-background" />
}
