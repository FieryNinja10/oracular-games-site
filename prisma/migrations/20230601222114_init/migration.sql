-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "gamerTag" VARCHAR(30) DEFAULT 'Player',
    "tag" VARCHAR(6) NOT NULL,
    "region" TEXT,
    "age" DATE,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_tag_key" ON "User"("tag");
