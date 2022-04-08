/*
  Warnings:

  - You are about to drop the `TagsOnPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TagsOnPosts` DROP FOREIGN KEY `TagsOnPosts_postId_fkey`;

-- DropForeignKey
ALTER TABLE `TagsOnPosts` DROP FOREIGN KEY `TagsOnPosts_tagId_fkey`;

-- AlterTable
ALTER TABLE `Post` MODIFY `title` VARCHAR(191) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE `TagsOnPosts`;

-- CreateTable
CREATE TABLE `_PostToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PostToTag_AB_unique`(`A`, `B`),
    INDEX `_PostToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PostToTag` ADD FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostToTag` ADD FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
