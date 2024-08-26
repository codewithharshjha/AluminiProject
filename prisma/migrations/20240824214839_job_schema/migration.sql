-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "jobtitle" TEXT NOT NULL,
    "jobdescription" TEXT NOT NULL,
    "joblocation" TEXT NOT NULL,
    "package" TEXT NOT NULL,
    "jobrole" TEXT NOT NULL,
    "companyname" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
