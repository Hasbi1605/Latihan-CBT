import { redirect } from "next/navigation";
import { requireAdminPage } from "@/lib/admin-auth";
import AppHeader from "@/components/AppHeader";
import AdminNav from "@/components/AdminNav";
import { PageHeader } from "@/components/ui/StatCard";

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
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <PageHeader
          eyebrow="Administrasi"
          title="Panel Admin"
          description="Kelola bank soal, paket ujian, analitik, dan penilaian BTQ."
        />
        <AdminNav />
        <div className="mt-6">{children}</div>
      </main>
    </>
  );
}
