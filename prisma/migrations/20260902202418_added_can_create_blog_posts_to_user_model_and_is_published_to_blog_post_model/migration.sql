/*
  Warnings:

  - Added the required column `isPublished` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canCreateBlogPosts` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "isPublished" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "canCreateBlogPosts" BOOLEAN NOT NULL;
