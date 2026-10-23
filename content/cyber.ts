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
  email: "guillaume.arthur.pro@gmail.com",
  // Empreinte de ta clé PGP publique (laisse vide pour masquer la ligne)
  pgpFingerprint: "",
  pgpKeyHref: "#",
  links: [
    { label: "GitHub", href: "https://github.com/guiarthur7" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/guiarthur7/" },
    { label: "Hack The Box", href: "https://profile.hackthebox.com/profile/01a08161-9191-721a-b420-97c2b62548f2" },
    { label: "TryHackMe", href: "https://tryhackme.com/p/zmalsa" },
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
    title: "Serveur web sécurisé",
    text: "Mise en place et durcissement d'un serveur web Apache : configuration sécurisée, HTTPS et sauvegardes régulières pour pouvoir restaurer en cas d'incident.",
    stack: ["Apache", "Linux", "Sauvegardes"],
    href: "#",
  },
  {
    title: "Réseau virtualisé OPNsense",
    text: "Un routeur OPNsense devant plusieurs VM : segmentation et isolation des réseaux, règles de pare-feu au plus juste et accès distant par VPN.",
    stack: ["OPNsense", "VPN", "Pare-feu"],
    href: "#",
  },
  {
    title: "Ce portfolio",
    text: "Next.js, en-têtes de sécurité, admin protégé par mot de passe haché et session signée — le code est sur GitHub.",
    stack: ["Next.js", "TypeScript", "WebGL"],
    href: "https://github.com/guiarthur7/Portfolio",
  },
]

// Chiffres mis en avant (classements, plateformes…)
export const stats = [
  { value: "Top 5 %", label: "TryHackMe" },
  { value: "10 000", label: "points TryHackMe" },
  { value: "10", label: "machines Hack The Box" },
]

export const certifications = [
  { name: "SEC0", issuer: "TryHackMe", status: "Obtenue" },
  { name: "SEC1", issuer: "TryHackMe", status: "Obtenue" },
  { name: "CJCA", issuer: "Hack The Box", status: "En préparation" },
  { name: "CCNA", issuer: "Cisco", status: "En préparation" },
]

export const cyberSkills = [
  { group: "Cybersécurité", items: ["Nmap", "Gobuster", "Hydra", "Burp Suite", "Metasploit", "Fail2Ban"] },
  { group: "Systèmes & réseaux", items: ["Linux", "Windows Server", "Cisco", "OPNsense", "VLAN", "Apache", "Nginx"] },
  { group: "Langages", items: ["Python", "Golang", "SQL", "HTML / CSS", "JavaScript / TypeScript", "React", "Bash"] },
  { group: "Soft skills", items: ["Rigoureux", "Autonome", "Curieux", "Motivé", "Investi", "Sérieux"] },
]

export const timeline = [
  { when: "2026 – 2027", what: "Spécialisation cybersécurité — Bachelor informatique, Ynov Campus" },
  { when: "2025 – 2026", what: "Entrée à Ynov Campus en Bachelor informatique" },
  { when: "2024 – 2025", what: "Baccalauréat mention Très bien — spécialités Mathématiques et NSI" },
]
