-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('PREMIUM', 'DEFAULT');

-- CreateTable
CREATE TABLE "UsrData" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "image" TEXT,
    "bith" TEXT,
    "AccountType" "TYPE" NOT NULL DEFAULT 'DEFAULT',
    "userId" TEXT NOT NULL,

    CONSTRAINT "UsrData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsrData_email_key" ON "UsrData"("email");

-- AddForeignKey
ALTER TABLE "UsrData" ADD CONSTRAINT "UsrData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
