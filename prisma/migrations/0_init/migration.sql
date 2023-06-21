-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "username" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER'
);

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
CREATE TABLE "Blob" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ord" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "dailyView" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "pin" BOOLEAN NOT NULL DEFAULT true,
    "sortBy" TEXT DEFAULT 'date',
    "sortAsc" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Filter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blobId" INTEGER NOT NULL,
    "inclusive" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Filter_blobId_fkey" FOREIGN KEY ("blobId") REFERENCES "Blob" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
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

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Source" (
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

-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sourceId" INTEGER,
    "type" TEXT,
    "message" TEXT,
    "level" TEXT NOT NULL DEFAULT 'INFO',
    CONSTRAINT "Log_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Blob_name_key" ON "Blob"("name");

-- CreateIndex
CREATE INDEX "Blob_name_idx" ON "Blob"("name");

-- CreateIndex
CREATE INDEX "Filter_blobId_fkey" ON "Filter"("blobId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_URL_key" ON "Post"("URL");

-- CreateIndex
CREATE INDEX "Post_sourceId_fkey" ON "Post"("sourceId");

-- CreateIndex
CREATE INDEX "Post_date" ON "Post"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Source_URL_key" ON "Source"("URL");

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
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

