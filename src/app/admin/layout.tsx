import { redirect } from "next/navigation";
import { requireAdminPage } from "@/lib/admin-auth";
import AppHeader from "@/components/AppHeader";
import AdminNav from "@/components/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireAdminPage();
  if ("redirect" in auth && auth.redirect) redirect(auth.redirect);
  const { user } = auth;

  return (
    <>
      <AppHeader nama={user.nama} nomorPeserta={user.nomorPeserta} role={user.role} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
          Panel Admin
        </h1>
        <AdminNav />
        <div className="mt-6">{children}</div>
      </main>
    </>
  );
}
