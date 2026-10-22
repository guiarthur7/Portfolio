import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { isAdmin } from "@/lib/admin/auth";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <LoginForm />
    </main>
  );
}
