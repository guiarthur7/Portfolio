import type { ComponentProps } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Logo } from "@/components/ui/navbar-02-utils/logo"
import { NavigationSheet, type NavbarLink } from "@/components/ui/navbar-02-utils/navigation-sheet"
import { cn } from "@/lib/utils"

export const NavMenu = ({ links, ...props }: ComponentProps<typeof NavigationMenu> & { links: NavbarLink[] }) => (
  <NavigationMenu viewport={false} {...props}>
    <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
      {links.map((l) => (
        <NavigationMenuItem key={l.href}>
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              "bg-transparent text-white/70 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
            )}
          >
            <Link href={l.href}>{l.label}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
)

const Navbar = ({ links, githubHref }: { links: NavbarLink[]; githubHref?: string }) => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-16 border-b border-white/10 bg-black/40 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-12">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu links={links} className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          {githubHref && (
            <Button
              asChild
              variant="outline"
              className="hidden border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white sm:inline-flex"
            >
              <a href={githubHref} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Button>
          )}
          <Button asChild className="rounded-full bg-white text-black hover:bg-white/85">
            <Link href="/#contact">Me contacter</Link>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet links={links} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
