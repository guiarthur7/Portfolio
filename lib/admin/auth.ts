import "server-only"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { SESSION_COOKIE, isValidSessionToken } from "./session"

export async function isAdmin() {
  return isValidSessionToken((await cookies()).get(SESSION_COOKIE)?.value)
}

/** À appeler en tête de chaque page et action admin : le proxy seul ne suffit pas. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login")
}
