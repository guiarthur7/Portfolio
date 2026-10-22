import "server-only"

import fs from "node:fs/promises"
import path from "node:path"

import { parseWriteup, serializeWriteup, type Writeup, type WriteupMeta } from "@/lib/writeup-schema"
import { writeupsDir } from "@/lib/writeups"

// Les write-ups restent des fichiers .md dans content/writeups :
// - en ligne : lus et commités via l'API GitHub (le commit déclenche le redéploiement) ;
// - en local sans token GitHub : lus et écrits directement sur le disque.

export type StoredWriteup = Writeup & { sha?: string }

const REPO_DIR = "content/writeups"

function github() {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO
  if (!token || !repo) return null
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) throw new Error("GITHUB_REPO doit être au format proprietaire/depot")
  return { token, repo, branch: process.env.GITHUB_BRANCH || "main" }
}

export function storageLabel() {
  const gh = github()
  if (gh) return `GitHub · ${gh.repo}@${gh.branch}`
  if (process.env.NODE_ENV === "development") return "Local · content/writeups"
  return null
}

function requireLocal() {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Stockage non configuré : renseigne GITHUB_TOKEN et GITHUB_REPO")
  }
}

async function gh<T>(pathname: string, init?: RequestInit): Promise<T> {
  const cfg = github()!
  const res = await fetch(`https://api.github.com/repos/${cfg.repo}/${pathname}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${cfg.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...init?.headers,
    },
  })
  if (!res.ok) {
    throw new Error(`GitHub ${res.status} sur ${pathname.split("?")[0]} : ${(await res.text()).slice(0, 200)}`)
  }
  return res.json() as Promise<T>
}

type GhFile = { name: string; sha: string; content?: string; type: string }

export async function listWriteups(): Promise<(WriteupMeta & { sha?: string })[]> {
  const cfg = github()
  let items: StoredWriteup[]

  if (cfg) {
    let files: GhFile[]
    try {
      files = await gh<GhFile[]>(`contents/${REPO_DIR}?ref=${encodeURIComponent(cfg.branch)}`)
    } catch (e) {
      if (String(e).includes("GitHub 404")) return []
      throw e
    }
    const slugs = files
      .filter((f) => f.type === "file" && f.name.endsWith(".md") && !f.name.startsWith("_"))
      .map((f) => f.name.replace(/\.md$/, ""))
    items = (await Promise.all(slugs.map(getStoredWriteup))).filter((w): w is StoredWriteup => w !== null)
  } else {
    requireLocal()
    const files = await fs.readdir(writeupsDir).catch(() => [] as string[])
    items = await Promise.all(
      files
        .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
        .map(async (f) => parseWriteup(f.replace(/\.md$/, ""), await fs.readFile(path.join(writeupsDir, f), "utf8"))),
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return items.map(({ content, ...meta }) => meta).sort((a, b) => b.date.localeCompare(a.date))
}

export async function getStoredWriteup(slug: string): Promise<StoredWriteup | null> {
  const cfg = github()
  if (cfg) {
    try {
      const file = await gh<GhFile>(`contents/${REPO_DIR}/${slug}.md?ref=${encodeURIComponent(cfg.branch)}`)
      const raw = Buffer.from(file.content ?? "", "base64").toString("utf8")
      return { ...parseWriteup(slug, raw), sha: file.sha }
    } catch (e) {
      if (String(e).includes("GitHub 404")) return null
      throw e
    }
  }

  requireLocal()
  try {
    return parseWriteup(slug, await fs.readFile(path.join(writeupsDir, `${slug}.md`), "utf8"))
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null
    throw e
  }
}

/**
 * Crée ou met à jour un write-up. Une création échoue si le fichier existe déjà ;
 * une mise à jour sur GitHub exige le sha lu avant édition (refus si modifié entre-temps).
 */
export async function saveWriteup(writeup: Writeup, { create, sha }: { create: boolean; sha?: string }) {
  const cfg = github()
  const raw = serializeWriteup(writeup)

  if (cfg) {
    if (!create && !sha) throw new Error("Version du fichier inconnue : recharge la page avant d'enregistrer")
    await gh(`contents/${REPO_DIR}/${writeup.slug}.md`, {
      method: "PUT",
      body: JSON.stringify({
        message: `${create ? "Add" : "Update"} write-up: ${writeup.title}`,
        content: Buffer.from(raw, "utf8").toString("base64"),
        branch: cfg.branch,
        ...(!create && { sha }),
      }),
    })
    return
  }

  requireLocal()
  await fs.mkdir(writeupsDir, { recursive: true })
  await fs.writeFile(path.join(writeupsDir, `${writeup.slug}.md`), raw, { encoding: "utf8", flag: create ? "wx" : "w" })
}

export async function deleteWriteup(slug: string) {
  const cfg = github()
  if (cfg) {
    const current = await getStoredWriteup(slug)
    if (!current?.sha) return
    await gh(`contents/${REPO_DIR}/${slug}.md`, {
      method: "DELETE",
      body: JSON.stringify({ message: `Delete write-up: ${current.title}`, sha: current.sha, branch: cfg.branch }),
    })
    return
  }

  requireLocal()
  await fs.rm(path.join(writeupsDir, `${slug}.md`), { force: true })
}
