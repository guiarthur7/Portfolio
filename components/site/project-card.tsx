import { GlowCard } from "@/components/ui/spotlight-card"
import { cn } from "@/lib/utils"

/** Cadre lumineux vert qui suit le pointeur, autour des cartes de projets et de write-ups. */
export function ProjectCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <GlowCard customSize glowColor="green" radius={24} className={cn("block h-full rounded-3xl p-0", className)}>
      {children}
    </GlowCard>
  )
}
