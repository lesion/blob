-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sourceId" INTEGER NOT NULL,
    "message" TEXT,
    "level" TEXT NOT NULL DEFAULT 'INFO',
    "context" TEXT,
    CONSTRAINT "Log_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT,
    "summary" TEXT,
    "URL" TEXT NOT NULL,
    "image" TEXT,
    "sourceId" INTEGER NOT NULL,
    CONSTRAINT "Post_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("URL", "content", "date", "id", "image", "sourceId", "summary", "title", "updatedAt") SELECT "URL", "content", "date", "id", "image", "sourceId", "summary", "title", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_URL_key" ON "Post"("URL");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
