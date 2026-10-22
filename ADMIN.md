# Admin des write-ups

Interface : `/admin`. Elle crée, modifie et supprime les write-ups (`content/writeups/*.md`).

- **En ligne** : chaque enregistrement est un commit sur GitHub → l'hébergeur (Vercel…) redéploie le site (≈ 1 min).
- **En local** (`npm run dev` sans `GITHUB_TOKEN`) : les fichiers sont écrits directement dans `content/writeups/`.

## Mise en place

1. Générer le mot de passe et le secret de session (le mot de passe n'est jamais stocké en clair) :

   ```bash
   node scripts/hash-password.mjs
   ```

2. Copier `.env.example` en `.env.local` et coller les deux lignes obtenues.

3. Pour l'admin en ligne, créer un token GitHub **fine-grained** :
   GitHub → Settings → Developer settings → Fine-grained tokens →
   *Only select repositories* : ce dépôt uniquement → *Repository permissions* : **Contents : Read and write**, rien d'autre.
   Renseigner `GITHUB_TOKEN`, `GITHUB_REPO` (`proprietaire/depot`) et `GITHUB_BRANCH`.

4. Sur l'hébergeur, ajouter les mêmes variables d'environnement (`ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, `GITHUB_*`).

## Sécurité

- Mot de passe : hash **scrypt** (N = 2¹⁵) comparé en temps constant. 5 essais ratés → blocage 15 min (par instance serveur).
- Session : cookie `httpOnly`, `SameSite=Strict`, `Secure` en production, limité à `/admin`, signé HMAC-SHA256, expire après 8 h.
- `proxy.ts` redirige vers la connexion, et **chaque page et action admin revérifie la session** (une action serveur peut être appelée sans passer par l'interface).
- Actions serveur protégées contre le CSRF par Next.js (vérification `Origin` / `Host`).
- Toutes les entrées sont revalidées côté serveur (longueurs, adresse, catégories, date).
- Le Markdown n'interprète pas le HTML brut → pas de XSS via un write-up.
- Token GitHub uniquement côté serveur, limité à un dépôt et à la permission Contents.
- `/admin` : `noindex`, `Cache-Control: no-store` ; tout le site : `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`.

Changer de mot de passe : relancer le script, remplacer `ADMIN_PASSWORD_HASH`. Changer `SESSION_SECRET` déconnecte toutes les sessions.
