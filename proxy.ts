import { NextResponse, type NextRequest } from "next/server"

import { SESSION_COOKIE, isValidSessionToken } from "@/lib/admin/session"

// Premier filtre : redirige vers la connexion sans session valide.
// Chaque page et action admin revérifie la session (requireAdmin).
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next()

  if (!isValidSessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}
