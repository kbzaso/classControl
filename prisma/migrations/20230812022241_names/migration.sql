-- AlterTable
ALTER TABLE "User" ALTER COLUMN "plan" DROP NOT NULL,
ALTER COLUMN "plan" DROP DEFAULT,
ALTER COLUMN "level" DROP DEFAULT;
