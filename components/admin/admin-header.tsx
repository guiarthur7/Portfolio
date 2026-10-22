import Link from "next/link"
import { LogOut } from "lucide-react"

import { logout } from "@/app/admin/actions"
import { storageLabel } from "@/lib/admin/store"

export function AdminHeader() {
  const storage = storageLabel()

  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/admin" className="font-display text-base">
            Admin
          </Link>
          {storage && (
            <span className="truncate rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/50">
              {storage}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-4 text-sm">
          <Link href="/" className="text-white/60 transition hover:text-white">
            Voir le site
          </Link>
          <form action={logout}>
            <button type="submit" className="inline-flex items-center gap-1.5 text-white/60 transition hover:text-white">
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
