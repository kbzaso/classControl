/*
  Warnings:

  - The values [BASICO,INTERMEDIO,AVANZADO] on the enum `Level` will be removed. If these variants are still used in the database, this will fail.
  - The values [CUATRO,OCHO,DOSE,DIESISEIS] on the enum `Plan` will be removed. If these variants are still used in the database, this will fail.
  - The values [ALUMNO,PROFESOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `plan` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Level_new" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED', 'MASTER');
ALTER TABLE "User" ALTER COLUMN "level" TYPE "Level_new" USING ("level"::text::"Level_new");
ALTER TYPE "Level" RENAME TO "Level_old";
ALTER TYPE "Level_new" RENAME TO "Level";
DROP TYPE "Level_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Plan_new" AS ENUM ('FOUR', 'EIGHT', 'TWELVE', 'SIXTEEN');
ALTER TABLE "User" ALTER COLUMN "plan" TYPE "Plan_new" USING ("plan"::text::"Plan_new");
ALTER TYPE "Plan" RENAME TO "Plan_old";
ALTER TYPE "Plan_new" RENAME TO "Plan";
DROP TYPE "Plan_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER',
ALTER COLUMN "plan" SET NOT NULL,
ALTER COLUMN "plan" SET DEFAULT 'FOUR',
ALTER COLUMN "level" SET DEFAULT 'BASIC';
