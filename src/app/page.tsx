import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl text-center">
        <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
          Latihan Mandiri · Non-resmi
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Simulasi CBT SPMB Mandiri
          <span className="block text-emerald-600">
            UIN Siber Syekh Nurjati Cirebon
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">
          Berlatih dalam suasana ujian yang menyerupai aslinya: tiga subtes
          berurutan (Tes Potensi Akademik, Kebahasaan, Keislaman) dengan timer
          per-subtes, navigasi soal, tandai ragu-ragu, dan pembahasan.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            Masuk & Mulai Latihan
          </Link>
        </div>
        <p className="mt-8 text-sm text-slate-400">
          Sistem ini alat latihan pribadi dan tidak berafiliasi dengan UIN Siber
          Syekh Nurjati Cirebon.
        </p>
      </div>
    </main>
  );
}
