/*
  Warnings:

  - You are about to drop the column `sourceId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_sourceId_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `sourceId`;
