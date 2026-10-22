"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { Logo } from "./logo"

export type NavbarLink = { href: string; label: string }

/** Menu mobile : panneau latéral qui se ferme dès qu'un lien est choisi. */
export const NavigationSheet = ({ links }: { links: NavbarLink[] }) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Ouvrir le menu" className="text-white hover:bg-white/10">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-white/10 bg-black/90 px-6 pt-8 backdrop-blur-xl">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Navigation du site</SheetDescription>
        <Logo />
        <nav className="mt-10 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-lg text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
