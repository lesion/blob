-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blob" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ord" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "dailyView" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "pin" BOOLEAN NOT NULL DEFAULT true,
    "sortBy" TEXT DEFAULT 'date',
    "sortAsc" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Blob" ("dailyView", "description", "id", "name", "ord", "pin", "sortBy") SELECT "dailyView", "description", "id", "name", "ord", "pin", "sortBy" FROM "Blob";
DROP TABLE "Blob";
ALTER TABLE "new_Blob" RENAME TO "Blob";
CREATE UNIQUE INDEX "Blob_name_key" ON "Blob"("name");
CREATE INDEX "Blob_name_idx" ON "Blob"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
