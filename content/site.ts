// Tout le contenu du portfolio est ici : remplace les textes entre crochets.

export const site = {
  name: "Arthur Guillaume",
  role: "[Ton titre — ex. Développeur web]",
  tagline: "[Une phrase courte qui dit ce que tu fais et pour qui.]",
  email: "[ton@email.com]",
  links: [
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
}

export const projects = [
  {
    title: "[Projet 1]",
    description: "[Ce que fait le projet, en une ou deux phrases.]",
    tags: ["[Tech]", "[Tech]", "[Tech]"],
    href: "#",
  },
  {
    title: "[Projet 2]",
    description: "[Ce que fait le projet, en une ou deux phrases.]",
    tags: ["[Tech]", "[Tech]"],
    href: "#",
  },
  {
    title: "[Projet 3]",
    description: "[Ce que fait le projet, en une ou deux phrases.]",
    tags: ["[Tech]", "[Tech]", "[Tech]"],
    href: "#",
  },
  {
    title: "[Projet 4]",
    description: "[Ce que fait le projet, en une ou deux phrases.]",
    tags: ["[Tech]", "[Tech]"],
    href: "#",
  },
]

export const about = {
  // Les fragments `strong` ressortent en blanc, le reste en gris
  statement: [
    { text: "[Début de ta présentation,] " },
    { text: "[ce qui te définit]", strong: true },
    { text: " [et la suite de ta présentation.]" },
  ],
  details: [
    { label: "Formation", value: "[École — diplôme]" },
    { label: "Basé à", value: "[Ville]" },
    { label: "Disponible", value: "[Stage / alternance / freelance]" },
  ],
}

export const skills = [
  { group: "[Front-end]", items: ["[Compétence]", "[Compétence]", "[Compétence]"] },
  { group: "[Back-end]", items: ["[Compétence]", "[Compétence]", "[Compétence]"] },
  { group: "[Outils]", items: ["[Compétence]", "[Compétence]", "[Compétence]"] },
]
