import { prisma } from "@/lib/prisma";

export type StudyDeckTopic = {
  nama: string;
  jumlah: number;
};

export type StudyDeck = {
  subtestId: string;
  kode: string;
  nama: string;
  deskripsi: string | null;
  jumlahKartu: number;
  subkategori: StudyDeckTopic[];
};

export type StudyCardOption = {
  label: string;
  teks: string;
  benar: boolean;
};

export type StudyCard = {
  id: string;
  subtestKode: string;
  subtestNama: string;
  subkategori: string | null;
  teks: string;
  arahTeks: string;
  gambarUrl: string | null;
  tingkat: string;
  pembahasan: string | null;
  opsi: StudyCardOption[];
};

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Daftar deck belajar per subtes (hanya soal PG, tanpa rekaman BTQ). */
export async function listStudyDecks(): Promise<StudyDeck[]> {
  const subtests = await prisma.subtest.findMany({
    orderBy: { urutan: "asc" },
    include: {
      questions: {
        where: { tipe: "PG" },
        select: { subkategori: true },
      },
    },
  });

  return subtests
    .map((s) => {
      const topicMap = new Map<string, number>();
      for (const q of s.questions) {
        const key = q.subkategori?.trim() || "Umum";
        topicMap.set(key, (topicMap.get(key) ?? 0) + 1);
      }
      const subkategori = [...topicMap.entries()]
        .map(([nama, jumlah]) => ({ nama, jumlah }))
        .sort((a, b) => a.nama.localeCompare(b.nama, "id"));

      return {
        subtestId: s.id,
        kode: s.kode,
        nama: s.nama,
        deskripsi: s.deskripsi,
        jumlahKartu: s.questions.length,
        subkategori,
      };
    })
    .filter((d) => d.jumlahKartu > 0);
}

export async function getStudyCards(params: {
  subtestId: string;
  subkategori?: string | null;
  limit?: number;
  shuffle?: boolean;
}): Promise<{ deck: StudyDeck | null; cards: StudyCard[] }> {
  const limit = Math.min(Math.max(params.limit ?? 20, 1), 60);
  const subkategori = params.subkategori?.trim() || null;

  const subtest = await prisma.subtest.findUnique({
    where: { id: params.subtestId },
  });
  if (!subtest) return { deck: null, cards: [] };

  const where = {
    subtestId: params.subtestId,
    tipe: "PG",
    ...(subkategori
      ? subkategori === "Umum"
        ? { OR: [{ subkategori: null }, { subkategori: "" }] }
        : { subkategori }
      : {}),
  };

  const questions = await prisma.question.findMany({
    where,
    include: {
      options: { orderBy: { label: "asc" } },
      subtest: { select: { kode: true, nama: true } },
    },
  });

  const ordered = params.shuffle === false ? questions : shuffle(questions);
  const selected = ordered.slice(0, limit);

  const topicMap = new Map<string, number>();
  for (const q of questions) {
    const key = q.subkategori?.trim() || "Umum";
    topicMap.set(key, (topicMap.get(key) ?? 0) + 1);
  }

  const deck: StudyDeck = {
    subtestId: subtest.id,
    kode: subtest.kode,
    nama: subtest.nama,
    deskripsi: subtest.deskripsi,
    jumlahKartu: questions.length,
    subkategori: [...topicMap.entries()]
      .map(([nama, jumlah]) => ({ nama, jumlah }))
      .sort((a, b) => a.nama.localeCompare(b.nama, "id")),
  };

  const cards: StudyCard[] = selected.map((q) => ({
    id: q.id,
    subtestKode: q.subtest.kode,
    subtestNama: q.subtest.nama,
    subkategori: q.subkategori,
    teks: q.teks,
    arahTeks: q.arahTeks,
    gambarUrl: q.gambarUrl,
    tingkat: q.tingkat,
    pembahasan: q.pembahasan,
    opsi: q.options.map((o) => ({
      label: o.label,
      teks: o.teks,
      benar: o.isCorrect,
    })),
  }));

  return { deck, cards };
}
