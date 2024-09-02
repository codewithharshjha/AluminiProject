-- CreateTable
CREATE TABLE "CreateAluminiProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastname" TEXT,
    "profession" TEXT,
    "imageUrl" TEXT,
    "bio" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "CreateAluminiProfile_pkey" PRIMARY KEY ("id")
);
