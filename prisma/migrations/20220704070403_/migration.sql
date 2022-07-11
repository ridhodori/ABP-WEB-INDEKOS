/*
  Warnings:

  - Made the column `electricity_payed` on table `electricity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rent_payed` on table `rent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `water_payed` on table `water` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `electricity` MODIFY `electricity_payed` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rent` MODIFY `rent_payed` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `water` MODIFY `water_payed` INTEGER NOT NULL;
