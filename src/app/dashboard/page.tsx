import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  return (
    <>
      <AppHeader nama={user.nama} nomorPeserta={user.nomorPeserta} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        <DashboardClient nama={user.nama} />
      </main>
    </>
  );
}
