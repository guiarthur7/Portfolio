import Link from "next/link"

import { cn } from "@/lib/utils"

/** Monogramme AG, dans la police d'affichage du site. */
export const Logo = ({ className }: { className?: string }) => (
  <Link
    href="/"
    aria-label="Accueil — Arthur Guillaume"
    className={cn("font-display text-2xl leading-none text-white transition-opacity hover:opacity-80", className)}
  >
    AG
  </Link>
)
