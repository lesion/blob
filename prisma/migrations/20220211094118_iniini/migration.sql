/*
  Warnings:

  - Added the required column `sourceId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `sourceId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Source` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('FEED') NOT NULL DEFAULT 'FEED',
    `URL` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastError` VARCHAR(191) NULL,
    `status` ENUM('OK', 'WARNING', 'ERROR') NOT NULL DEFAULT 'OK',
    `nErrors` INTEGER NOT NULL DEFAULT 0,
    `description` VARCHAR(191) NULL,
    `image` LONGTEXT NULL,
    `link` VARCHAR(191) NULL,

    UNIQUE INDEX `Source_URL_key`(`URL`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Source`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
