/*
  Warnings:

  - You are about to drop the column `region` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Profile` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "region",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DEFAULT 'Player',
ALTER COLUMN "name" SET DATA TYPE VARCHAR(20);
