-- CreateTable
CREATE TABLE "EditAluminiProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastname" TEXT,
    "profession" TEXT,
    "imageUrl" TEXT,
    "bio" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "EditAluminiProfile_pkey" PRIMARY KEY ("id")
);
