-- CreateTable
CREATE TABLE "todo" (
    "id" TEXT NOT NULL,
    "text" VARCHAR NOT NULL,
    "completedAt" TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
