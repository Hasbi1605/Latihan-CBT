"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Lock, User } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  const [nomorPeserta, setNomorPeserta] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomorPeserta, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal masuk.");
        return;
      }
      const dest =
        data.user?.role === "ADMIN"
          ? next.startsWith("/admin")
            ? next
            : "/admin"
          : next.startsWith("/admin")
            ? "/dashboard"
            : next;
      router.replace(dest);
      router.refresh();
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md shadow-[var(--shadow-card-hover)]">
      <CardBody className="p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold">Masuk Peserta</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Portal simulasi CBT</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nomor">Nomor Peserta / Admin</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <Input
                id="nomor"
                type="text"
                value={nomorPeserta}
                onChange={(e) => setNomorPeserta(e.target.value)}
                autoComplete="username"
                className="pl-10"
                placeholder="1234567890"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="password">Kata Sandi</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="pl-10"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && <Alert tone="error">{error}</Alert>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Memproses…" : "Masuk Sekarang"}
          </Button>
        </form>

        <div className="mt-6 rounded-xl bg-[var(--muted)] p-3.5 text-xs text-[var(--muted-foreground)]">
          <p className="font-semibold text-[var(--foreground)]">Akun demo</p>
          <p className="mt-1">Peserta — 1234567890 / password</p>
          <p>Admin — admin / admin123</p>
        </div>
      </CardBody>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <main className="hero-mesh flex min-h-full flex-1">
      <div className="hidden w-[45%] hero-gradient p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-bold">Simulasi CBT UIN SSC</span>
        </Link>
        <div>
          <h2 className="text-3xl font-bold leading-tight">
            Persiapan ujian
            <br />
            lebih tenang & terarah
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-emerald-50/90">
            Latihan dengan timer server, navigasi soal, tanda ragu-ragu, dan pembahasan —
            menyerupai pengalaman SPMB Mandiri UIN Siber Cirebon.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-emerald-50/90">
            <li>✓ Bank ~300 soal latihan (acak per percobaan)</li>
            <li>✓ Replika 3 subtes resmi 2026</li>
            <li>✓ Auto-save & riwayat latihan</li>
            <li>✓ Modul BTQ opsional (rekaman)</li>
          </ul>
        </div>
        <p className="text-xs text-emerald-100/70">Alat latihan pribadi · Non-resmi</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="mb-6 flex items-center gap-2 lg:hidden">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] text-white">
            <GraduationCap className="h-4 w-4" />
          </span>
          <span className="font-semibold">Simulasi CBT UIN SSC</span>
        </div>
        <Suspense fallback={<p className="text-[var(--muted-foreground)]">Memuat…</p>}>
          <LoginForm />
        </Suspense>
        <Link
          href="/"
          className="mt-6 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)]"
        >
          ← Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
