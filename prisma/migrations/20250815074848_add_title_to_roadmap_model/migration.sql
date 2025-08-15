/*
  Warnings:

  - Added the required column `title` to the `Roadmap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Roadmap" ADD COLUMN     "title" TEXT NOT NULL;
