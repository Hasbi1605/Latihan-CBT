export type SeedOption = { teks: string; benar?: boolean };

export type SeedQuestion = {
  subkategori: string;
  teks: string;
  tipe?: "PG" | "REKAMAN";
  arahTeks?: "LTR" | "RTL";
  tingkat?: "MUDAH" | "SEDANG" | "SULIT";
  pembahasan: string;
  opsi?: SeedOption[];
};
