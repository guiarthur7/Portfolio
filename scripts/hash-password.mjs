// Génère ADMIN_PASSWORD_HASH et SESSION_SECRET pour l'admin.
// Usage : node scripts/hash-password.mjs   (le mot de passe est demandé sans être affiché)

import { randomBytes, scryptSync } from "node:crypto"
import { createInterface } from "node:readline"

function ask(question) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    rl._writeToOutput = (s) => {
      if (s.startsWith(question)) rl.output.write(s)
    }
    rl.question(question, (answer) => {
      rl.close()
      process.stdout.write("\n")
      resolve(answer)
    })
  })
}

const password = await ask("Mot de passe admin : ")
if (password.length < 12) {
  console.error("12 caractères minimum.")
  process.exit(1)
}
if ((await ask("Confirmer : ")) !== password) {
  console.error("Les deux saisies diffèrent.")
  process.exit(1)
}

const N = 2 ** 15
const r = 8
const p = 1
const salt = randomBytes(16)
const hash = scryptSync(password, salt, 64, { N, r, p, maxmem: 256 * N * r })

console.log("\nÀ copier dans .env.local (en local) et dans les variables d'environnement de l'hébergeur :\n")
console.log(`ADMIN_PASSWORD_HASH=scrypt:${N}:${r}:${p}:${salt.toString("base64")}:${hash.toString("base64")}`)
console.log(`SESSION_SECRET=${randomBytes(32).toString("base64url")}`)
