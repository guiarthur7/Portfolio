import fs from "node:fs"
import path from "node:path"

import { SLUG_PATTERN, parseWriteup, type Writeup, type WriteupMeta } from "./writeup-schema"

export { categories, difficulties, type Writeup, type WriteupMeta } from "./writeup-schema"

export const writeupsDir = path.join(process.cwd(), "content", "writeups")

function read(file: string): Writeup {
  return parseWriteup(file.replace(/\.md$/, ""), fs.readFileSync(path.join(writeupsDir, file), "utf8"))
}

/** Tous les write-ups, du plus récent au plus ancien. Les fichiers commençant par _ sont ignorés. */
export function getAllWriteups(): WriteupMeta[] {
  if (!fs.existsSync(writeupsDir)) return []
  return fs
    .readdirSync(writeupsDir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...meta } = read(f)
      return meta
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getWriteup(slug: string): Writeup | null {
  if (!SLUG_PATTERN.test(slug)) return null
  const file = `${slug}.md`
  if (!fs.existsSync(path.join(writeupsDir, file))) return null
  return read(file)
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
