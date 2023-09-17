-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('Zenn');

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
