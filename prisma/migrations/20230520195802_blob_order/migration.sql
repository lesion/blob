/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `context` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `Filter` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `Filter` table. All the data in the column will be lost.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostToBlob" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PostToBlob_A_fkey" FOREIGN KEY ("A") REFERENCES "Blob" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PostToBlob_B_fkey" FOREIGN KEY ("B") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FilterToSource" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FilterToSource_A_fkey" FOREIGN KEY ("A") REFERENCES "Filter" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FilterToSource_B_fkey" FOREIGN KEY ("B") REFERENCES "Source" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FilterToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FilterToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Filter" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FilterToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "username" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_User" ("id", "password") SELECT "id", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sourceId" INTEGER,
    "type" TEXT,
    "message" TEXT,
    "level" TEXT NOT NULL DEFAULT 'INFO',
    CONSTRAINT "Log_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("createdAt", "id", "level", "message", "sourceId") SELECT "createdAt", "id", "level", "message", "sourceId" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT,
    "summary" TEXT,
    "URL" TEXT NOT NULL,
    "image" TEXT,
    "sourceId" INTEGER,
    CONSTRAINT "Post_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("URL", "content", "date", "id", "image", "sourceId", "summary", "title", "updatedAt") SELECT "URL", "content", "date", "id", "image", "sourceId", "summary", "title", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_URL_key" ON "Post"("URL");
CREATE INDEX "Post_sourceId_fkey" ON "Post"("sourceId");
CREATE INDEX "Post_date" ON "Post"("date");
CREATE TABLE "new_Blob" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ord" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "dailyView" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "pin" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Blob" ("dailyView", "description", "id", "name") SELECT "dailyView", "description", "id", "name" FROM "Blob";
DROP TABLE "Blob";
ALTER TABLE "new_Blob" RENAME TO "Blob";
CREATE UNIQUE INDEX "Blob_name_key" ON "Blob"("name");
CREATE INDEX "Blob_name_idx" ON "Blob"("name");
CREATE TABLE "new_Filter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blobId" INTEGER NOT NULL,
    "inclusive" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Filter_blobId_fkey" FOREIGN KEY ("blobId") REFERENCES "Blob" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Filter" ("blobId", "id") SELECT "blobId", "id" FROM "Filter";
DROP TABLE "Filter";
ALTER TABLE "new_Filter" RENAME TO "Filter";
CREATE INDEX "Filter_blobId_fkey" ON "Filter"("blobId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToBlob_AB_unique" ON "_PostToBlob"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToBlob_B_index" ON "_PostToBlob"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FilterToSource_AB_unique" ON "_FilterToSource"("A", "B");

-- CreateIndex
CREATE INDEX "_FilterToSource_B_index" ON "_FilterToSource"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FilterToTag_AB_unique" ON "_FilterToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_FilterToTag_B_index" ON "_FilterToTag"("B");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

UPDATE "Blob" SET ord=id;
