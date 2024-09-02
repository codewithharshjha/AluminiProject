/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `CreateAluminiProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CreateAluminiProfile_email_key" ON "CreateAluminiProfile"("email");
