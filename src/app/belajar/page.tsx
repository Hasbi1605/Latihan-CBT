import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { listStudyDecks } from "@/lib/study";
import BelajarClient from "./BelajarClient";

export default async function BelajarPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const decks = await listStudyDecks();

  return (
    <>
      <AppHeader nama={user.nama} nomorPeserta={user.nomorPeserta} role={user.role} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <BelajarClient initialDecks={decks} />
      </main>
    </>
  );
}
