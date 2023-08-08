-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FOUR', 'EIGHT', 'TWELVE', 'SIXTEEN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "Plan";
