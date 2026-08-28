-- CreateTable
CREATE TABLE `Utente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cognome` VARCHAR(191) NOT NULL,
    `ruolo` VARCHAR(191) NOT NULL DEFAULT 'esterno',

    UNIQUE INDEX `Utente_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Intervista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inizio` DATETIME(3) NOT NULL,
    `fine` DATETIME(3) NOT NULL,
    `stato` VARCHAR(191) NOT NULL DEFAULT 'programmata',
    `candidatoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ricerca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descrizione` VARCHAR(191) NOT NULL,
    `stato` VARCHAR(191) NOT NULL DEFAULT 'attiva',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_IntervisteEffettuate` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_IntervisteEffettuate_AB_unique`(`A`, `B`),
    INDEX `_IntervisteEffettuate_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_IntervistaToRicerca` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_IntervistaToRicerca_AB_unique`(`A`, `B`),
    INDEX `_IntervistaToRicerca_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RicercaToUtente` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RicercaToUtente_AB_unique`(`A`, `B`),
    INDEX `_RicercaToUtente_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Intervista` ADD CONSTRAINT `Intervista_candidatoId_fkey` FOREIGN KEY (`candidatoId`) REFERENCES `Utente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IntervisteEffettuate` ADD CONSTRAINT `_IntervisteEffettuate_A_fkey` FOREIGN KEY (`A`) REFERENCES `Intervista`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IntervisteEffettuate` ADD CONSTRAINT `_IntervisteEffettuate_B_fkey` FOREIGN KEY (`B`) REFERENCES `Utente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IntervistaToRicerca` ADD CONSTRAINT `_IntervistaToRicerca_A_fkey` FOREIGN KEY (`A`) REFERENCES `Intervista`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IntervistaToRicerca` ADD CONSTRAINT `_IntervistaToRicerca_B_fkey` FOREIGN KEY (`B`) REFERENCES `Ricerca`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RicercaToUtente` ADD CONSTRAINT `_RicercaToUtente_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ricerca`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RicercaToUtente` ADD CONSTRAINT `_RicercaToUtente_B_fkey` FOREIGN KEY (`B`) REFERENCES `Utente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
