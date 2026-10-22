import { createHmac, scrypt, timingSafeEqual, type BinaryLike, type ScryptOptions } from "node:crypto"

// Utilisable depuis proxy.ts comme depuis les pages et actions serveur (pas d'import client).

export const SESSION_COOKIE = "admin_session"
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 h

function secret() {
  const value = process.env.SESSION_SECRET
  if (!value || value.length < 32) {
    throw new Error("SESSION_SECRET manquant ou trop court (32 caractères minimum)")
  }
  return value
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url")
}

export function createSessionToken() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE * 1000 })).toString("base64url")
  return `${payload}.${sign(payload)}`
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false
  const [payload, signature] = token.split(".")
  if (!payload || !signature) return false

  let expected: Buffer
  try {
    expected = Buffer.from(sign(payload))
  } catch {
    return false // SESSION_SECRET absent : aucune session n'est valide
  }
  const given = Buffer.from(signature)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false

  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString())
    return typeof exp === "number" && exp > Date.now()
  } catch {
    return false
  }
}

// --- Mot de passe : hash scrypt au format scrypt:N:r:p:sel:hash (voir scripts/hash-password.mjs)

function scryptAsync(password: BinaryLike, salt: BinaryLike, keylen: number, options: ScryptOptions) {
  return new Promise<Buffer>((resolve, reject) =>
    scrypt(password, salt, keylen, options, (err, key) => (err ? reject(err) : resolve(key))),
  )
}

export async function verifyPassword(password: string): Promise<boolean> {
  const stored = process.env.ADMIN_PASSWORD_HASH
  if (!stored) throw new Error("ADMIN_PASSWORD_HASH manquant")

  const [scheme, n, r, p, saltB64, hashB64] = stored.split(":")
  if (scheme !== "scrypt" || !hashB64) throw new Error("ADMIN_PASSWORD_HASH mal formé")

  const expected = Buffer.from(hashB64, "base64")
  const N = Number(n)
  const actual = await scryptAsync(password, Buffer.from(saltB64, "base64"), expected.length, {
    N,
    r: Number(r),
    p: Number(p),
    maxmem: 256 * N * Number(r),
  })
  return timingSafeEqual(actual, expected)
}

// --- Limitation des tentatives de connexion (mémoire du serveur : par instance)

const attempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

export function isRateLimited(key: string) {
  const entry = attempts.get(key)
  return !!entry && entry.resetAt > Date.now() && entry.count >= MAX_ATTEMPTS
}

export function recordFailedAttempt(key: string) {
  const now = Date.now()
  const entry = attempts.get(key)
  if (!entry || entry.resetAt <= now) attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
  else entry.count++
}

export function clearAttempts(key: string) {
  attempts.delete(key)
}
