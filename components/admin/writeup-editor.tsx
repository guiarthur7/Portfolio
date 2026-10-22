"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { save } from "@/app/admin/actions"
import { MarkdownContent } from "@/components/site/markdown"
import { glass } from "@/components/site/section-heading"
import { cn } from "@/lib/utils"
import { categories, difficulties, slugify, type Writeup } from "@/lib/writeup-schema"

const input =
  "mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 outline-none transition focus:border-white/40"
const labelText = "text-xs text-white/60"

export function WriteupEditor({
  mode,
  initial,
  sha,
}: {
  mode: "create" | "edit"
  initial: Writeup
  sha?: string
}) {
  const [state, action, pending] = useActionState(save, undefined)
  const [title, setTitle] = useState(initial.title)
  const [slug, setSlug] = useState(initial.slug)
  const [slugTouched, setSlugTouched] = useState(mode === "edit")
  const [content, setContent] = useState(initial.content)
  const [tab, setTab] = useState<"write" | "preview">("write")

  return (
    <form action={action} className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <input type="hidden" name="mode" value={mode} />
      {sha && <input type="hidden" name="sha" value={sha} />}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-white">
          <ArrowLeft className="size-4" />
          Retour
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-white/85 disabled:opacity-50"
        >
          {pending ? "Enregistrement…" : mode === "create" ? "Publier" : "Enregistrer"}
        </button>
      </div>

      {state?.error && (
        <p role="alert" className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {state.error}
        </p>
      )}

      <div className={`${glass} mt-6 grid gap-5 p-6 sm:grid-cols-2 sm:p-8`}>
        <label className="sm:col-span-2">
          <span className={labelText}>Titre</span>
          <input
            name="title"
            required
            maxLength={150}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (!slugTouched) setSlug(slugify(e.target.value))
            }}
            className={cn(input, "text-lg")}
          />
        </label>

        <label>
          <span className={labelText}>Adresse — /writeups/…</span>
          <input
            name="slug"
            required
            maxLength={80}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            title="Lettres minuscules, chiffres et tirets"
            value={slug}
            readOnly={mode === "edit"}
            onChange={(e) => {
              setSlugTouched(true)
              setSlug(e.target.value)
            }}
            className={cn(input, "font-mono text-sm", mode === "edit" && "text-white/50")}
          />
        </label>

        <label>
          <span className={labelText}>Date</span>
          <input type="date" name="date" required defaultValue={initial.date} className={cn(input, "[color-scheme:dark]")} />
        </label>

        <label>
          <span className={labelText}>Plateforme</span>
          <input
            name="platform"
            required
            maxLength={60}
            defaultValue={initial.platform}
            placeholder="Root-Me, Hack The Box…"
            list="platforms"
            className={input}
          />
          <datalist id="platforms">
            {["Root-Me", "Hack The Box", "TryHackMe", "PicoCTF", "CTF"].map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </label>

        <div className="grid grid-cols-2 gap-5">
          <label>
            <span className={labelText}>Catégorie</span>
            <select name="category" defaultValue={initial.category} className={cn(input, "[color-scheme:dark]")}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            <span className={labelText}>Difficulté</span>
            <select name="difficulty" defaultValue={initial.difficulty} className={cn(input, "[color-scheme:dark]")}>
              {difficulties.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="sm:col-span-2">
          <span className={labelText}>Résumé (affiché sur les cartes)</span>
          <input name="summary" required maxLength={300} defaultValue={initial.summary} className={input} />
        </label>

        <label className="sm:col-span-2">
          <span className={labelText}>Tags, séparés par des virgules</span>
          <input name="tags" maxLength={400} defaultValue={initial.tags.join(", ")} placeholder="SQLi, Burp Suite" className={input} />
        </label>
      </div>

      <div className={`${glass} mt-6 overflow-hidden`}>
        <div role="tablist" className="flex gap-1 border-b border-white/10 p-2">
          {(["write", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm transition",
                tab === t ? "bg-white text-black" : "text-white/60 hover:text-white",
              )}
            >
              {t === "write" ? "Écrire" : "Aperçu"}
            </button>
          ))}
          <span className="ml-auto self-center pr-2 text-xs text-white/40">Markdown · blocs ```bash pour le code</span>
        </div>

        <textarea
          name="content"
          required
          maxLength={100_000}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck={false}
          className={cn(
            "block min-h-[60vh] w-full resize-y bg-transparent p-6 font-mono text-sm leading-relaxed outline-none",
            tab !== "write" && "hidden",
          )}
        />
        {tab === "preview" && <MarkdownContent content={content} className="min-h-[60vh] p-6 sm:p-10" />}
      </div>
    </form>
  )
}
