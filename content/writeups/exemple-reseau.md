---
title: "Exemple — Box Linux, de la reconnaissance au root"
date: 2026-01-20
platform: Hack The Box
category: Réseau
difficulty: Facile
summary: "Un service mal configuré, une élévation de privilèges classique, et les réglages qui l'auraient empêchée."
tags: [Nmap, Linux, PrivEsc]
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
