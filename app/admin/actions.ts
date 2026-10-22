"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin/auth";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  clearAttempts,
  createSessionToken,
  isRateLimited,
  recordFailedAttempt,
  verifyPassword,
} from "@/lib/admin/session";
import { deleteWriteup, getStoredWriteup, saveWriteup } from "@/lib/admin/store";
import { SLUG_PATTERN, categories, difficulties, type Writeup } from "@/lib/writeup-schema";

export type FormState = { error?: string } | undefined;

// --- Connexion

async function clientKey() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "local";
}

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const key = await clientKey();
  if (isRateLimited(key)) return { error: "Trop de tentatives. Réessaie dans 15 minutes." };

  const password = formData.get("password");
  let ok = false;
  try {
    ok = typeof password === "string" && password.length <= 256 && (await verifyPassword(password));
  } catch (e) {
    console.error("[admin] configuration :", (e as Error).message);
    return { error: "Admin non configuré : voir ADMIN.md." };
  }

  if (!ok) {
    recordFailedAttempt(key);
    console.warn(`[admin] échec de connexion depuis ${key}`);
    return { error: "Mot de passe incorrect." };
  }

  clearAttempts(key);
  (await cookies()).set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/admin" });
  redirect("/admin/login");
}

// --- Write-ups

function field(formData: FormData, name: string, max: number, required = true) {
  const value = String(formData.get(name) ?? "").trim();
  if (required && !value) throw new Error(`Champ « ${name} » requis.`);
  if (value.length > max) throw new Error(`Champ « ${name} » trop long (${max} caractères max).`);
  return value;
}

function readWriteup(formData: FormData): Writeup {
  const slug = field(formData, "slug", 80);
  if (!SLUG_PATTERN.test(slug)) throw new Error("Adresse invalide : lettres minuscules, chiffres et tirets uniquement.");

  const date = field(formData, "date", 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) throw new Error("Date invalide.");

  const category = field(formData, "category", 20) as Writeup["category"];
  if (!categories.includes(category)) throw new Error("Catégorie inconnue.");
  const difficulty = field(formData, "difficulty", 20) as Writeup["difficulty"];
  if (!difficulties.includes(difficulty)) throw new Error("Difficulté inconnue.");

  const tags = field(formData, "tags", 400, false)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  if (tags.length > 10 || tags.some((t) => t.length > 30)) throw new Error("10 tags max, 30 caractères chacun.");

  return {
    slug,
    title: field(formData, "title", 150),
    date,
    platform: field(formData, "platform", 60),
    category,
    difficulty,
    summary: field(formData, "summary", 300),
    tags,
    content: field(formData, "content", 100_000),
  };
}

export async function save(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const create = formData.get("mode") === "create";
  let writeup: Writeup;
  try {
    writeup = readWriteup(formData);
    if (create && (await getStoredWriteup(writeup.slug))) {
      return { error: `Un write-up existe déjà à l'adresse « ${writeup.slug} ».` };
    }
    const sha = String(formData.get("sha") ?? "") || undefined;
    await saveWriteup(writeup, { create, sha });
  } catch (e) {
    return { error: (e as Error).message };
  }

  revalidatePath("/writeups", "layout");
  revalidatePath("/");
  redirect(`/admin?saved=${writeup.slug}`);
}

export async function remove(formData: FormData) {
  await requireAdmin();

  const slug = String(formData.get("slug") ?? "");
  if (!SLUG_PATTERN.test(slug)) throw new Error("Adresse invalide.");
  await deleteWriteup(slug);

  revalidatePath("/writeups", "layout");
  revalidatePath("/");
  redirect(`/admin?deleted=${slug}`);
}
