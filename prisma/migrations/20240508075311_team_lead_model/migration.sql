/*
  Warnings:

  - The primary key for the `AdminUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AdminUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdminUser" DROP CONSTRAINT "AdminUser_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("_id");

-- CreateTable
CREATE TABLE "TeamLeadUser" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "salary" TEXT NOT NULL,

    CONSTRAINT "TeamLeadUser_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamLeadUser_email_key" ON "TeamLeadUser"("email");
