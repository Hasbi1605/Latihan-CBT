-- CreateTable
CREATE TABLE "AttemptRecording" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "attemptSectionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerId" TEXT,
    "audioUrl" TEXT,
    "nilaiManual" REAL,
    "rubrikKelancaran" INTEGER,
    "rubrikTajwid" INTEGER,
    "rubrikMakhraj" INTEGER,
    "catatanPenguji" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AttemptRecording_attemptSectionId_fkey" FOREIGN KEY ("attemptSectionId") REFERENCES "AttemptSection" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AttemptRecording_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'BERLANGSUNG',
    "mulaiAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "selesaiAt" DATETIME,
    "skorTotal" REAL,
    "tabSwitchCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Attempt_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "ExamPackage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Attempt" ("createdAt", "id", "mulaiAt", "packageId", "selesaiAt", "skorTotal", "status", "userId") SELECT "createdAt", "id", "mulaiAt", "packageId", "selesaiAt", "skorTotal", "status", "userId" FROM "Attempt";
DROP TABLE "Attempt";
ALTER TABLE "new_Attempt" RENAME TO "Attempt";
CREATE TABLE "new_Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subtestId" TEXT NOT NULL,
    "subkategori" TEXT,
    "teks" TEXT NOT NULL,
    "tipe" TEXT NOT NULL DEFAULT 'PG',
    "arahTeks" TEXT NOT NULL DEFAULT 'LTR',
    "gambarUrl" TEXT,
    "audioPromptUrl" TEXT,
    "pembahasan" TEXT,
    "tingkat" TEXT NOT NULL DEFAULT 'SEDANG',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Question_subtestId_fkey" FOREIGN KEY ("subtestId") REFERENCES "Subtest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("arahTeks", "createdAt", "gambarUrl", "id", "pembahasan", "subkategori", "subtestId", "teks", "tingkat") SELECT "arahTeks", "createdAt", "gambarUrl", "id", "pembahasan", "subkategori", "subtestId", "teks", "tingkat" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AttemptRecording_answerId_key" ON "AttemptRecording"("answerId");

-- CreateIndex
CREATE UNIQUE INDEX "AttemptRecording_attemptSectionId_questionId_key" ON "AttemptRecording"("attemptSectionId", "questionId");
