import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { getStudyCards } from "@/lib/study";
import { buttonSizes, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import StudySessionClient from "./StudySessionClient";

export default async function StudySessionPage({
  searchParams,
}: {
  searchParams: Promise<{
    subtestId?: string;
    subkategori?: string;
    limit?: string;
  }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const params = await searchParams;
  if (!params.subtestId) redirect("/belajar");

  const limit = params.limit ? Number(params.limit) : 20;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 20;

  const { deck, cards } = await getStudyCards({
    subtestId: params.subtestId,
    subkategori: params.subkategori ?? null,
    limit: safeLimit,
    shuffle: true,
  });

  if (!deck) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--background)] px-4">
        <p className="text-[var(--danger)]">Deck tidak ditemukan.</p>
        <Link
          href="/belajar"
          className={cn(buttonVariants.secondary, buttonSizes.md, "rounded-xl")}
        >
          Kembali
        </Link>
      </div>
    );
  }

  return (
    <StudySessionClient
      initialDeck={deck}
      initialCards={cards}
      subtestId={params.subtestId}
      subkategori={params.subkategori ?? null}
      limit={safeLimit}
      nama={user.nama}
    />
  );
}
