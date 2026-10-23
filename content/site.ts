// Contenu de la version développeur (/dev) et nom affiché partout.
// Projets repris de tes dossiers Ynov ; le reste = exemples à ajuster.

export const site = {
  name: "Arthur Guillaume",
  role: "Développeur en formation · Ynov",
  tagline: "Des cartes interactives aux API sécurisées, je construis des applications web solides de bout en bout.",
  email: "guillaume.arthur.pro@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/guiarthur7" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/guiarthur7/" },
  ],
}

export const projects = [
  {
    title: "AirViz",
    description:
      "Carte interactive de la qualité de l'air en France, réalisée en 48 h en équipe : clusters dynamiques, filtres par région, date et polluant.",
    tags: ["React", "Leaflet", "Express", "SQLite"],
    href: "#",
  },
  {
    title: "Numéone",
    description: "Landing page marketing avec inscription et connexion, branchée sur sa propre API documentée avec Swagger.",
    tags: ["Nuxt 3", "Tailwind", "Express", "MySQL"],
    href: "#",
  },
  {
    title: "Site Restaurant",
    description: "API REST structurée en MVC : comptes utilisateurs, mots de passe hachés avec bcrypt et sessions par JWT.",
    tags: ["Node.js", "Express", "Sequelize", "JWT"],
    href: "#",
  },
  {
    title: "Librairie C++",
    description: "Gestion d'une librairie en programmation orientée objet : livres, clients, ventes et magasin.",
    tags: ["C++", "POO", "Makefile"],
    href: "#",
  },
]

// Projets affichés sur la page /projets (repos GitHub), du plus récent au plus ancien
export const githubProjects = [
  {
    title: "Prism",
    description:
      "Forum communautaire dédié à l'astronomie et à l'exploration spatiale : comptes, sessions sécurisées et réinitialisation de mot de passe par e-mail, posts avec images et vidéos, likes, commentaires et recherche. Projet en équipe, en ligne.",
    tags: ["Go", "API REST", "SQLite", "JavaScript"],
    href: "https://github.com/guiarthur7/Prism",
    live: "https://prism.dyskolos.fr",
  },
  {
    title: "ArmoniK",
    description:
      "Plateforme de jeux musicaux multijoueurs en temps réel — Blind Test et Petit Bac musical — avec salles privées, comptes utilisateurs et classements. Développée à quatre à Ynov.",
    tags: ["Go", "WebSocket", "SQLite", "API Deezer"],
    href: "https://github.com/guiarthur7/ArmoniK",
    live: "https://armonik.dyskolos.fr",
  },
  {
    title: "Olympe",
    description:
      "Site vitrine d'un serveur de jeu roleplay : accueil, règlement, boutique et mentions légales, déployé automatiquement sur GitHub Pages avec un nom de domaine dédié.",
    tags: ["React", "Vite", "Tailwind", "GitHub Actions"],
    href: "https://github.com/guiarthur7/Olympe",
    live: "https://olympe.website",
  },
  {
    title: "Termina",
    description:
      "RPG textuel en ligne de commande : création de personnage, combats au tour par tour, inventaire extensible, sorts, marchand et forge d'équipements.",
    tags: ["Go", "CLI", "POO"],
    href: "https://github.com/guiarthur7/Termina",
  },
]

export const about = {
  // Les fragments `strong` ressortent en blanc, le reste en gris
  statement: [
    { text: "Étudiant à Ynov, j'aime comprendre comment les choses fonctionnent " },
    { text: "pour les construire proprement", strong: true },
    { text: " — et savoir où elles peuvent casser." },
  ],
  details: [
    { label: "Formation", value: "Ynov Campus — Bachelor informatique" },
    { label: "Basé à", value: "France" },
    { label: "Disponible", value: "Stage / alternance" },
  ],
}

export const skills = [
  { group: "Front-end", items: ["React & Next.js", "Vue & Nuxt", "TypeScript", "Tailwind CSS"] },
  { group: "Back-end", items: ["Node.js & Express", "Python & FastAPI", "MySQL & SQLite", "API REST & JWT"] },
  { group: "Bas niveau & outils", items: ["C & C++", "Go & Java", "Git", "Linux"] },
]
