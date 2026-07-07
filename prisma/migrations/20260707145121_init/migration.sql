-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "nomorPeserta" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'PESERTA',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Subtest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subtestId" TEXT NOT NULL,
    "subkategori" TEXT,
    "teks" TEXT NOT NULL,
    "arahTeks" TEXT NOT NULL DEFAULT 'LTR',
    "gambarUrl" TEXT,
    "pembahasan" TEXT,
    "tingkat" TEXT NOT NULL DEFAULT 'SEDANG',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Question_subtestId_fkey" FOREIGN KEY ("subtestId") REFERENCES "Subtest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "teks" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExamPackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "mode" TEXT NOT NULL DEFAULT 'REPLIKA_2026',
    "token" TEXT NOT NULL,
    "deskripsi" TEXT,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ExamPackageSection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packageId" TEXT NOT NULL,
    "subtestId" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL,
    "jumlahSoal" INTEGER NOT NULL,
    "durasiDetik" INTEGER NOT NULL,
    "acakSoal" BOOLEAN NOT NULL DEFAULT true,
    "acakOpsi" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "ExamPackageSection_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "ExamPackage" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ExamPackageSection_subtestId_fkey" FOREIGN KEY ("subtestId") REFERENCES "Subtest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'BERLANGSUNG',
    "mulaiAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "selesaiAt" DATETIME,
    "skorTotal" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Attempt_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "ExamPackage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AttemptSection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "attemptId" TEXT NOT NULL,
    "subtestId" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL,
    "durasiDetik" INTEGER NOT NULL,
    "mulaiAt" DATETIME,
    "selesaiAt" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'BELUM',
    "benar" INTEGER,
    "salah" INTEGER,
    "kosong" INTEGER,
    "skor" REAL,
    CONSTRAINT "AttemptSection_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AttemptSection_subtestId_fkey" FOREIGN KEY ("subtestId") REFERENCES "Subtest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AttemptAnswer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "attemptSectionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL,
    "optionOrderJson" TEXT NOT NULL,
    "pilihanOptionId" TEXT,
    "ragu" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AttemptAnswer_attemptSectionId_fkey" FOREIGN KEY ("attemptSectionId") REFERENCES "AttemptSection" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AttemptAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nomorPeserta_key" ON "User"("nomorPeserta");

-- CreateIndex
CREATE UNIQUE INDEX "Subtest_kode_key" ON "Subtest"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "AttemptAnswer_attemptSectionId_questionId_key" ON "AttemptAnswer"("attemptSectionId", "questionId");
