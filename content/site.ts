// Contenu de la version développeur (/dev) et nom affiché partout.
// Projets repris de tes dossiers Ynov ; le reste = exemples à ajuster.

export const site = {
  name: "Arthur Guillaume",
  role: "Développeur en formation · Ynov",
  tagline: "Des cartes interactives aux API sécurisées, je construis des applications web solides de bout en bout.",
  email: "contact@exemple.fr",
  links: [
    { label: "GitHub", href: "https://github.com/guiarthur7" },
    { label: "LinkedIn", href: "#" },
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
