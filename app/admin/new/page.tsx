import { AdminHeader } from "@/components/admin/admin-header";
import { WriteupEditor } from "@/components/admin/writeup-editor";
import { requireAdmin } from "@/lib/admin/auth";

const template = `## Résumé

Ce que fait la cible, la faille trouvée, et l'impact.

## Reconnaissance

\`\`\`bash
nmap -sC -sV -p- 10.10.10.10
\`\`\`

## Exploitation

## Élévation de privilèges

## Remédiation

## Ce que j'en retiens

> Réalisé sur une plateforme d'entraînement autorisée. Flag volontairement non publié.
`;

export default async function NewWriteupPage() {
  await requireAdmin();

  return (
    <>
      <AdminHeader />
      <WriteupEditor
        mode="create"
        initial={{
          slug: "",
          title: "",
          date: new Date().toISOString().slice(0, 10),
          platform: "",
          category: "Web",
          difficulty: "Moyen",
          summary: "",
          tags: [],
          content: template,
        }}
      />
    </>
  );
}
