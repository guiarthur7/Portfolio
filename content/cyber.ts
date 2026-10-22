// Contenu de la page d'accueil (version cybersécurité).
// ⚠️ Textes, chiffres et certifications ci-dessous = EXEMPLES : remplace-les par les tiens avant de publier.
// Le nom affiché vient de content/site.ts.

export const cyber = {
  role: "Étudiant en cybersécurité · Ynov",
  // Phrase affichée sous le nom, en bas de l'écran d'accueil
  heroTagline: "Expert en cybersécurité",
  // Paragraphe de présentation sous le nom, sur l'écran d'accueil
  heroIntro:
    "Étudiant en cybersécurité à Ynov, je me forme au pentest web, à la sécurité réseau et à la détection d'incidents. Entre CTF, write-ups et homelab, je cherche les failles avant les autres — et j'explique comment les corriger. Je suis à la recherche d'un stage ou d'une alternance.",
  tagline: "Je cherche les failles avant les autres — et j'explique comment les corriger.",
  email: "contact@exemple.fr",
  // Empreinte de ta clé PGP publique (laisse vide pour masquer la ligne)
  pgpFingerprint: "",
  pgpKeyHref: "#",
  links: [
    { label: "GitHub", href: "https://github.com/guiarthur7" },
    { label: "LinkedIn", href: "#" },
    { label: "Root-Me", href: "#" },
    { label: "Hack The Box", href: "#" },
    { label: "TryHackMe", href: "#" },
  ],
}

// Domaines : ce sur quoi tu veux être recruté
export const domains = [
  {
    title: "Pentest web",
    text: "Audit d'applications web : OWASP Top 10, contrôle d'accès, logique métier, avec un rapport clair et des correctifs priorisés.",
  },
  {
    title: "Sécurité réseau",
    text: "Cartographie, analyse de trafic et durcissement des services exposés sur des réseaux de lab.",
  },
  {
    title: "Blue team & SOC",
    text: "Collecte et analyse de logs, règles de détection, tri d'alertes et premiers réflexes de réponse à incident.",
  },
  {
    title: "Forensic",
    text: "Reconstitution d'incidents à partir d'images disque, de captures réseau et d'artefacts Windows et Linux.",
  },
]

// Les write-ups sont des fichiers Markdown dans content/writeups/ (voir _modele.md)

// Homelab & projets techniques
export const labs = [
  {
    title: "Lab Active Directory",
    text: "Un petit domaine Windows virtualisé pour comprendre les mauvaises configurations courantes et comment les détecter.",
    stack: ["Windows Server", "Proxmox", "BloodHound"],
    href: "#",
  },
  {
    title: "SOC maison",
    text: "Centralisation des logs de mes machines de lab, tableaux de bord et premières règles de détection.",
    stack: ["Wazuh", "Sysmon", "Sigma"],
    href: "#",
  },
  {
    title: "Ce portfolio",
    text: "Next.js, en-têtes de sécurité, admin protégé par mot de passe haché et session signée — le code est sur GitHub.",
    stack: ["Next.js", "TypeScript", "WebGL"],
    href: "https://github.com/guiarthur7/Portfolio",
  },
]

// Chiffres mis en avant (classements, CTF…) — exemples à remplacer
export const stats = [
  { value: "1 200", label: "points Root-Me" },
  { value: "15", label: "machines HTB" },
  { value: "6", label: "CTF disputés" },
  { value: "Top 10 %", label: "TryHackMe" },
]

export const certifications = [
  { name: "SecNumacadémie", issuer: "ANSSI", status: "En cours" },
  { name: "eJPT", issuer: "INE", status: "En préparation" },
  { name: "CompTIA Security+", issuer: "CompTIA", status: "Objectif 2027" },
]

export const cyberSkills = [
  { group: "Offensif", items: ["Pentest web", "Reconnaissance", "Élévation de privilèges", "Active Directory"] },
  { group: "Défensif", items: ["Analyse de logs", "SIEM", "Durcissement", "Réponse à incident"] },
  { group: "Outils", items: ["Burp Suite", "Nmap", "Wireshark", "Ghidra"] },
  { group: "Langages & systèmes", items: ["Python", "Bash", "C / C++", "Linux & Windows"] },
]

export const timeline = [
  { when: "Aujourd'hui", what: "Bachelor informatique, spécialité cybersécurité — Ynov Campus" },
  { when: "2025", what: "Premiers CTF en équipe et montage d'un homelab" },
  { when: "2024", what: "Entrée à Ynov : algorithmique, réseaux, développement web et système" },
]
