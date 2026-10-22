import { notFound } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { WriteupEditor } from "@/components/admin/writeup-editor";
import { requireAdmin } from "@/lib/admin/auth";
import { getStoredWriteup } from "@/lib/admin/store";
import { SLUG_PATTERN } from "@/lib/writeup-schema";

export default async function EditWriteupPage({ params }: PageProps<"/admin/edit/[slug]">) {
  await requireAdmin();

  const { slug } = await params;
  if (!SLUG_PATTERN.test(slug)) notFound();
  const stored = await getStoredWriteup(slug);
  if (!stored) notFound();

  const { sha, ...writeup } = stored;
  return (
    <>
      <AdminHeader />
      <WriteupEditor mode="edit" initial={writeup} sha={sha} />
    </>
  );
}
