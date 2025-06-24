/*
  Warnings:

  - You are about to drop the column `birth_data` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "birth_data",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
