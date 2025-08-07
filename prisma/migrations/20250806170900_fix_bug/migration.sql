/*
  Warnings:

  - A unique constraint covering the columns `[latitude]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[longitude]` on the table `School` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `School_latitude_key` ON `School`(`latitude`);

-- CreateIndex
CREATE UNIQUE INDEX `School_longitude_key` ON `School`(`longitude`);
