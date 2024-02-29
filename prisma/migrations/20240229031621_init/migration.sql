-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `balance` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `Transaction_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
