/*
  Warnings:

  - You are about to drop the column `roadMap` on the `Roadmap` table. All the data in the column will be lost.
  - Added the required column `roadmap` to the `Roadmap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Roadmap" DROP COLUMN "roadMap",
ADD COLUMN     "roadmap" JSONB NOT NULL;
