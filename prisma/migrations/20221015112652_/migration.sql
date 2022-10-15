/*
  Warnings:

  - Changed the type of `funders` on the `DocumentHeader` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Regular');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Invited', 'Active');

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "body" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "DocumentHeader" DROP COLUMN "funders",
ADD COLUMN     "funders" JSONB NOT NULL,
ALTER COLUMN "idno" DROP NOT NULL,
ALTER COLUMN "altIdentifier" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Regular',
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'Invited';

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "friendlyName" VARCHAR(255) NOT NULL,
    "isChildAllowed" BOOLEAN NOT NULL,
    "attributes" JSONB NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);
