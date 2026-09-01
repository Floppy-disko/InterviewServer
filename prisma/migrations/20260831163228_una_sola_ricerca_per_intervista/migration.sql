/*
  Warnings:

  - You are about to drop the `_IntervistaToRicerca` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ricercaId` to the `Intervista` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_IntervistaToRicerca` DROP FOREIGN KEY `_IntervistaToRicerca_A_fkey`;

-- DropForeignKey
ALTER TABLE `_IntervistaToRicerca` DROP FOREIGN KEY `_IntervistaToRicerca_B_fkey`;

-- AlterTable
ALTER TABLE `Intervista` ADD COLUMN `ricercaId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_IntervistaToRicerca`;

-- AddForeignKey
ALTER TABLE `Intervista` ADD CONSTRAINT `Intervista_ricercaId_fkey` FOREIGN KEY (`ricercaId`) REFERENCES `Ricerca`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
