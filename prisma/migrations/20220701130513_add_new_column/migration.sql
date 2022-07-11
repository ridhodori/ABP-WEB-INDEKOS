/*
  Warnings:

  - Added the required column `electricity_periode` to the `Electricity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `water_periode` to the `Water` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `electricity` ADD COLUMN `electricity_payed` INTEGER NULL,
    ADD COLUMN `electricity_periode` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `rent` ADD COLUMN `rent_payed` INTEGER NULL,
    MODIFY `rent_periode` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `water` ADD COLUMN `water_payed` INTEGER NULL,
    ADD COLUMN `water_periode` VARCHAR(191) NOT NULL;
