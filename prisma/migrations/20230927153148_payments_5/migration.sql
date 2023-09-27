/*
  Warnings:

  - You are about to drop the column `classesAdded` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "max_students" SET DEFAULT 13;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "classesAdded";
