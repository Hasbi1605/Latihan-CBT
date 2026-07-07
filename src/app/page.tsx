import Link from "next/link";
import {
  BookOpen,
  Clock,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

const features = [
  {
    icon: Clock,
    title: "Timer per Subtes",
    desc: "Subtes berurutan dengan waktu server — tahan refresh & manipulasi jam.",
  },
  {
    icon: LayoutDashboard,
    title: "Navigasi Soal",
    desc: "Indikator warna terjawab, ragu-ragu, dan kosong seperti ujian asli.",
  },
  {
    icon: BookOpen,
    title: "Pembahasan Lengkap",
    desc: "Review jawaban + penjelasan setiap soal setelah ujian selesai.",
  },
  {
    icon: ShieldCheck,
    title: "Mode Replika 2026",
    desc: "TPA, Kebahasaan, Keislaman — sesuai pengumuman SPMB Mandiri terbaru.",
  },
];

export default function Home() {
  return (
    <main className="hero-mesh flex flex-1 flex-col">
      <header className="no-print mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold">Simulasi CBT UIN SSC</p>
            <p className="text-xs text-[var(--muted-foreground)]">Latihan Mandiri</p>
          </div>
        </div>
        <Link href="/login">
          <Button variant="secondary" size="sm">
            Masuk
          </Button>
        </Link>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-16 pt-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Badge tone="success" className="mb-4">
              Non-resmi · Edukatif
            </Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]">
              Simulasi CBT SPMB Mandiri
              <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                UIN Siber Syekh Nurjati Cirebon
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-[var(--muted-foreground)]">
              Berlatih dalam suasana ujian yang menyerupai aslinya — tiga subtes berurutan,
              timer ketat, auto-save, dan pembahasan lengkap. Dirancang untuk persiapan
              Akuntansi Syariah (FEBI) dan jurusan lainnya.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login">
                <Button size="lg">Mulai Latihan →</Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-[var(--muted-foreground)]">
              Tidak berafiliasi resmi dengan UIN Siber Syekh Nurjati Cirebon.
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="hero-gradient px-6 py-5 text-white">
              <p className="text-sm font-medium text-emerald-100">Paket Simulasi 2026</p>
              <p className="mt-1 text-2xl font-bold">100 Soal · ~100 Menit</p>
            </div>
            <CardBody className="space-y-3">
              {["Tes Potensi Akademik", "Kebahasaan", "Keislaman"].map((s, i) => (
                <div
                  key={s}
                  className="flex items-center justify-between rounded-xl bg-[var(--muted)] px-4 py-3 text-sm"
                >
                  <span className="font-medium">
                    {i + 1}. {s}
                  </span>
                  <Badge tone="info">{i === 0 ? "30′" : i === 1 ? "40′" : "30′"}</Badge>
                </div>
              ))}
              <p className="pt-1 text-xs text-[var(--muted-foreground)]">
                + Modul BTQ opsional di paket latihan lengkap
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} hover>
              <CardBody>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">{f.desc}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
