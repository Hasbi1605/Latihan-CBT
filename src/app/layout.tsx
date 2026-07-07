import type { Metadata } from "next";
import { Geist, Amiri } from "next/font/google";
import { PreferencesProvider } from "@/components/PreferencesProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-arabic",
  weight: ["400", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Simulasi CBT — SPMB Mandiri UIN Siber Cirebon",
  description:
    "Latihan simulasi Computer Based Test (CBT) menyerupai SPMB Mandiri UIN Siber Syekh Nurjati Cirebon: Tes Potensi Akademik, Kebahasaan, dan Keislaman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}
