---
# Modèle de write-up : copie ce fichier, renomme-le (ex. root-me-sql-injection.md, sans _ devant).
# Le nom du fichier devient l'adresse : /writeups/root-me-sql-injection
# Les fichiers qui commencent par _ ne sont pas publiés.
title: Nom du challenge ou de la box
date: 2026-01-15
platform: Root-Me
# Web, Pwn, Crypto, Forensic, Reverse, Réseau, OSINT ou Misc
category: Web
# Facile, Moyen, Difficile ou Insane
difficulty: Moyen
summary: Une phrase — la faille, comment elle a été exploitée, et le correctif.
tags: [SQLi, Burp Suite]
---

## Résumé

Ce que fait la cible, la faille trouvée, et l'impact en deux ou trois phrases.

## Reconnaissance

Ce que tu as observé, les outils utilisés et pourquoi.

```bash
nmap -sC -sV -p- 10.10.10.10
```

## Exploitation

Les étapes, dans l'ordre, avec les commandes ou requêtes clés.

```http
POST /login HTTP/1.1
Host: cible.local

username=admin'--&password=x
```

## Élévation de privilèges

Si applicable : de l'accès initial jusqu'au flag root / admin.

## Remédiation

Comment corriger la faille côté défense.

## Ce que j'en retiens

Une ou deux leçons, outils ou réflexes appris.

> Réalisé sur une plateforme d'entraînement autorisée. Flag volontairement non publié.
