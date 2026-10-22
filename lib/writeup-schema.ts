import { parse, stringify } from "yaml"

// Format d'un write-up (en-tête YAML + Markdown). Sans accès disque : utilisable côté client.

export const categories = ["Web", "Pwn", "Crypto", "Forensic", "Reverse", "Réseau", "OSINT", "Misc"] as const
export const difficulties = ["Facile", "Moyen", "Difficile", "Insane"] as const

export type WriteupMeta = {
  slug: string
  title: string
  date: string
  platform: string
  category: (typeof categories)[number]
  difficulty: (typeof difficulties)[number]
  summary: string
  tags: string[]
}

export type Writeup = WriteupMeta & { content: string }

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

export function parseWriteup(slug: string, raw: string): Writeup {
  const match = raw.match(frontmatter)
  if (!match) throw new Error(`Write-up "${slug}" : en-tête --- manquant`)

  const data = parse(match[1]) ?? {}
  for (const key of ["title", "date", "platform", "category", "difficulty", "summary"]) {
    if (!data[key]) throw new Error(`Write-up "${slug}" : champ "${key}" manquant`)
  }
  if (!categories.includes(data.category)) {
    throw new Error(`Write-up "${slug}" : catégorie "${data.category}" inconnue (${categories.join(", ")})`)
  }
  if (!difficulties.includes(data.difficulty)) {
    throw new Error(`Write-up "${slug}" : difficulté "${data.difficulty}" inconnue (${difficulties.join(", ")})`)
  }

  return {
    slug,
    title: String(data.title),
    // Une date YAML non quotée peut être lue comme Date : on la ramène au format AAAA-MM-JJ
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    platform: String(data.platform),
    category: data.category,
    difficulty: data.difficulty,
    summary: String(data.summary),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content: raw.slice(match[0].length).replace(/^\r?\n/, ""),
  }
}

export function serializeWriteup({ slug: _slug, content, ...meta }: Writeup) {
  void _slug // le slug est le nom du fichier, pas un champ de l'en-tête
  return `---\n${stringify(meta)}---\n\n${content.trim()}\n`
}

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "")
}
