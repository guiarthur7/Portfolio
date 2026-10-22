import Velaris from "@/components/ui/velaris"

/** Fond animé fixe, derrière le contenu de toutes les pages publiques. */
export function SiteBackground() {
  return <Velaris height="100dvh" className="pointer-events-none fixed inset-0 -z-20" />
}
