"use client"

import { useActionState } from "react"
import { LockKeyhole } from "lucide-react"

import { login } from "@/app/admin/actions"
import { glass } from "@/components/site/section-heading"

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <form action={action} className={`${glass} w-full max-w-sm p-8`}>
      <div className="mx-auto grid size-12 place-items-center rounded-full bg-white/10">
        <LockKeyhole className="size-5" />
      </div>
      <h1 className="mt-5 text-center text-2xl font-semibold tracking-tight">Administration</h1>
      <p className="mt-1 text-center text-sm text-white/50">Accès réservé.</p>

      <label className="mt-8 block">
        <span className="text-xs text-white/60">Mot de passe</span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          maxLength={256}
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition focus:border-white/40"
        />
      </label>

      {state?.error && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-full bg-white py-3 text-sm font-medium text-black transition hover:bg-white/85 disabled:opacity-50"
      >
        {pending ? "Vérification…" : "Se connecter"}
      </button>
    </form>
  )
}
