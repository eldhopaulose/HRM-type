/*
  Warnings:

  - Added the required column `role` to the `TeamLeadUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamLeadUser" ADD COLUMN     "role" TEXT NOT NULL;
