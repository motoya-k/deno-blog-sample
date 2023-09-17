-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "platform" INTEGER NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id","platform")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_platform_publishedAt_key" ON "Post"("platform", "publishedAt");
