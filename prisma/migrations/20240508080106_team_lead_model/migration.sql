/*
  Warnings:

  - The primary key for the `AdminUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `AdminUser` table. All the data in the column will be lost.
  - The primary key for the `TeamLeadUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `TeamLeadUser` table. All the data in the column will be lost.
  - The required column `id` was added to the `AdminUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `TeamLeadUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "AdminUser" DROP CONSTRAINT "AdminUser_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TeamLeadUser" DROP CONSTRAINT "TeamLeadUser_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "TeamLeadUser_pkey" PRIMARY KEY ("id");
