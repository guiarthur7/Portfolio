"use client"

import { Trash2 } from "lucide-react"

import { remove } from "@/app/admin/actions"

export function DeleteButton({ slug, title }: { slug: string; title: string }) {
  return (
    <form
      action={remove}
      onSubmit={(e) => {
        if (!confirm(`Supprimer définitivement « ${title} » ?`)) e.preventDefault()
      }}
    >
      <input type="hidden" name="slug" value={slug} />
      <button
        type="submit"
        aria-label={`Supprimer ${title}`}
        className="grid size-9 place-items-center rounded-full text-white/50 transition hover:bg-red-500/15 hover:text-red-300"
      >
        <Trash2 className="size-4" />
      </button>
    </form>
  )
}
