// Contenu de la version cybersécurité (/cyber) : remplace les textes entre crochets.
// Le nom affiché vient de content/site.ts.

export const cyber = {
  role: "Étudiant en cybersécurité",
  tagline: "[Une phrase : ce que tu sécurises, attaques ou analyses — ex. « Pentest web & réseau, côté offensif comme défensif. »]",
  email: "[ton@email.com]",
  // Empreinte de ta clé PGP publique (laisse vide pour masquer la ligne)
  pgpFingerprint: "[XXXX XXXX XXXX XXXX XXXX  XXXX XXXX XXXX XXXX XXXX]",
  pgpKeyHref: "#",
  links: [
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Root-Me", href: "#" },
    { label: "Hack The Box", href: "#" },
    { label: "TryHackMe", href: "#" },
  ],
}

// Domaines : ce sur quoi tu veux être recruté
export const domains = [
  { title: "Pentest web", text: "[Audit d'applications : OWASP Top 10, injections, contrôle d'accès, logique métier.]" },
  { title: "Sécurité réseau", text: "[Reconnaissance, segmentation, pivoting, durcissement des services exposés.]" },
  { title: "Blue team & SOC", text: "[Détection, analyse de logs, règles SIEM, réponse à incident.]" },
  { title: "Forensic", text: "[Analyse mémoire et disque, timeline, artefacts Windows et Linux.]" },
]

// Les write-ups sont des fichiers Markdown dans content/writeups/ (voir _modele.md)

// Homelab & projets techniques
export const labs = [
  {
    title: "[Lab Active Directory]",
    text: "[Domaine Windows vulnérable monté pour s'entraîner : Kerberoasting, délégations, ACL.]",
    stack: ["[Windows Server]", "[Proxmox]", "[BloodHound]"],
    href: "#",
  },
  {
    title: "[SOC maison]",
    text: "[Collecte de logs et détection : règles, tableaux de bord, alertes.]",
    stack: ["[Wazuh / ELK]", "[Sysmon]", "[Sigma]"],
    href: "#",
  },
  {
    title: "[Outil / script]",
    text: "[Un outil que tu as écrit : scanner, parseur de logs, automatisation de recon…]",
    stack: ["[Python]", "[Bash]"],
    href: "#",
  },
]

// Chiffres mis en avant (classements, CTF…)
export const stats = [
  { value: "[0]", label: "[points Root-Me]" },
  { value: "[0]", label: "[machines HTB rootées]" },
  { value: "[0]", label: "[CTF disputés]" },
  { value: "[Top 0 %]", label: "[classement TryHackMe]" },
]

export const certifications = [
  { name: "[eJPT]", issuer: "[INE]", status: "[Obtenue — 2026]" },
  { name: "[CompTIA Security+]", issuer: "[CompTIA]", status: "[En préparation]" },
  { name: "[SecNumacadémie]", issuer: "[ANSSI]", status: "[Obtenue]" },
]

export const cyberSkills = [
  { group: "Offensif", items: ["[Pentest web]", "[Exploitation réseau]", "[Privilege escalation]", "[Active Directory]"] },
  { group: "Défensif", items: ["[Analyse de logs]", "[SIEM]", "[Durcissement]", "[Réponse à incident]"] },
  { group: "Outils", items: ["[Burp Suite]", "[Nmap]", "[Wireshark]", "[Metasploit]"] },
  { group: "Langages & systèmes", items: ["[Python]", "[Bash]", "[Linux]", "[Windows Server]"] },
]

export const timeline = [
  { when: "[2026 — …]", what: "[Bachelor / Mastère cybersécurité — école]" },
  { when: "[2025]", what: "[Stage / alternance — entreprise, missions]" },
  { when: "[2024]", what: "[Événement marquant : CTF, certification, projet]" },
]
