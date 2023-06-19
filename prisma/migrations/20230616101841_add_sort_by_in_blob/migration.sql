-- AlterTable
ALTER TABLE "Blob" ADD COLUMN "sortBy" TEXT DEFAULT 'date';

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Source" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'FEED',
    "URL" TEXT NOT NULL,
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "ETag" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastError" TEXT,
    "status" TEXT NOT NULL DEFAULT 'OK',
    "nErrors" INTEGER NOT NULL DEFAULT 0,
    "color" TEXT DEFAULT 'primary',
    "description" TEXT,
    "image" TEXT,
    "link" TEXT
);
INSERT INTO "new_Source" ("ETag", "URL", "color", "createdAt", "description", "id", "image", "lastError", "link", "nErrors", "name", "status", "type", "updatedAt") SELECT "ETag", "URL", "color", "createdAt", "description", "id", "image", "lastError", "link", "nErrors", "name", "status", "type", "updatedAt" FROM "Source";
DROP TABLE "Source";
ALTER TABLE "new_Source" RENAME TO "Source";
CREATE UNIQUE INDEX "Source_URL_key" ON "Source"("URL");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
