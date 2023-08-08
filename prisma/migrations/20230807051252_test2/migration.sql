/*
  Warnings:

  - Made the column `plan` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "plan" SET NOT NULL,
ALTER COLUMN "plan" SET DEFAULT 'FOUR';
