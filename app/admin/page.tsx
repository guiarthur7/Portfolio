import Link from "next/link";
import { ExternalLink, Pencil, Plus } from "lucide-react";

import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { glass } from "@/components/site/section-heading";
import { requireAdmin } from "@/lib/admin/auth";
import { listWriteups, storageLabel } from "@/lib/admin/store";
import { formatDate } from "@/lib/writeups";

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  await requireAdmin();
  const { saved, deleted } = await searchParams;

  let writeups: Awaited<ReturnType<typeof listWriteups>> = [];
  let error: string | null = null;
  if (!storageLabel()) {
    error = "Stockage non configuré : renseigne GITHUB_TOKEN et GITHUB_REPO (voir ADMIN.md).";
  } else {
    try {
      writeups = await listWriteups();
    } catch (e) {
      error = (e as Error).message;
    }
  }
  const online = storageLabel()?.startsWith("GitHub");

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Write-ups</h1>
            <p className="mt-1 text-white/50">{writeups.length} publié{writeups.length > 1 ? "s" : ""}</p>
          </div>
          <Link
            href="/admin/new"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/85"
          >
            <Plus className="size-4" />
            Nouveau write-up
          </Link>
        </div>

        {(saved || deleted) && (
          <p role="status" className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            {saved ? `« ${saved} » enregistré.` : `« ${deleted} » supprimé.`}{" "}
            {online && "Le site se met à jour au prochain déploiement (≈ 1 min)."}
          </p>
        )}
        {error && (
          <p role="alert" className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <ul className={`${glass} mt-8 divide-y divide-white/10`}>
          {writeups.length === 0 && !error && (
            <li className="px-6 py-10 text-center text-white/50">Aucun write-up pour l&apos;instant.</li>
          )}
          {writeups.map((w) => (
            <li key={w.slug} className="flex items-center gap-4 px-4 py-4 sm:px-6">
              <div className="min-w-0 flex-1">
                <Link href={`/admin/edit/${w.slug}`} className="block truncate font-medium hover:underline">
                  {w.title}
                </Link>
                <p className="mt-0.5 truncate text-sm text-white/50">
                  {w.category} · {w.platform} · {w.difficulty} · {formatDate(w.date)}
                </p>
              </div>
              <div className="flex shrink-0 items-center">
                <Link
                  href={`/writeups/${w.slug}`}
                  target="_blank"
                  aria-label={`Voir ${w.title}`}
                  className="grid size-9 place-items-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
                >
                  <ExternalLink className="size-4" />
                </Link>
                <Link
                  href={`/admin/edit/${w.slug}`}
                  aria-label={`Modifier ${w.title}`}
                  className="grid size-9 place-items-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
                >
                  <Pencil className="size-4" />
                </Link>
                <DeleteButton slug={w.slug} title={w.title} />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
