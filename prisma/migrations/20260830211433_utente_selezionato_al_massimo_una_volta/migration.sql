/*
  Warnings:

  - You are about to drop the `_RicercaToUtente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_RicercaToUtente` DROP FOREIGN KEY `_RicercaToUtente_A_fkey`;

-- DropForeignKey
ALTER TABLE `_RicercaToUtente` DROP FOREIGN KEY `_RicercaToUtente_B_fkey`;

-- AlterTable
ALTER TABLE `Utente` ADD COLUMN `selezionatoInId` INTEGER NULL,
    MODIFY `ruolo` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_RicercaToUtente`;

-- AddForeignKey
ALTER TABLE `Utente` ADD CONSTRAINT `Utente_selezionatoInId_fkey` FOREIGN KEY (`selezionatoInId`) REFERENCES `Ricerca`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
