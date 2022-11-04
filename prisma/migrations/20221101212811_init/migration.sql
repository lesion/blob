-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "Blob" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dailyView" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Filter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blobId" INTEGER NOT NULL,
    "sourceId" INTEGER NOT NULL,
    "tagId" INTEGER,
    CONSTRAINT "Filter_blobId_fkey" FOREIGN KEY ("blobId") REFERENCES "Blob" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Filter_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Filter_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE SET NULL ON UPDATE CASCADE
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
    "sourceId" INTEGER NOT NULL,
    CONSTRAINT "Post_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastError" TEXT,
    "status" TEXT NOT NULL DEFAULT 'OK',
    "nErrors" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "image" TEXT,
    "link" TEXT
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Blob_name_key" ON "Blob"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Filter_blobId_sourceId_tagId_key" ON "Filter"("blobId", "sourceId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_URL_key" ON "Post"("URL");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Source_URL_key" ON "Source"("URL");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");
