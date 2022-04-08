/*
  Warnings:

  - You are about to drop the column `sourceId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Source` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CohortToSource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_sourceId_fkey`;

-- DropForeignKey
ALTER TABLE `_CohortToSource` DROP FOREIGN KEY `_CohortToSource_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_CohortToSource` DROP FOREIGN KEY `_CohortToSource_ibfk_2`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `sourceId`;

-- DropTable
DROP TABLE `Source`;

-- DropTable
DROP TABLE `_CohortToSource`;
