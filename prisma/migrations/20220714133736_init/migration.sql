-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(90) NOT NULL,
    "email" VARCHAR(90) NOT NULL,
    "password" VARCHAR(90) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "body" XML NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentHeader" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "editors" JSONB NOT NULL,
    "funders" VARCHAR(255) NOT NULL,
    "country" VARCHAR(4) NOT NULL,
    "institution" VARCHAR(255) NOT NULL,
    "repository" VARCHAR(255) NOT NULL,
    "idno" VARCHAR(255) NOT NULL,
    "authors" JSONB NOT NULL,
    "altIdentifier" JSONB NOT NULL,
    "settlement" VARCHAR(255) NOT NULL,
    "publisher" VARCHAR(255) NOT NULL,
    "publisherPlace" VARCHAR(255) NOT NULL,
    "publisherDate" TIMESTAMP(3) NOT NULL,
    "license" VARCHAR(255) NOT NULL,
    "originDate" TIMESTAMP(3) NOT NULL,
    "originPlace" VARCHAR(255) NOT NULL,
    "lang" TEXT NOT NULL,
    "filiation" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "encoding" TEXT NOT NULL,
    "documentId" INTEGER NOT NULL,

    CONSTRAINT "DocumentHeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentImages" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "documentId" INTEGER NOT NULL,

    CONSTRAINT "DocumentImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentPermissions" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "documentId" INTEGER NOT NULL,

    CONSTRAINT "DocumentPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentHeader_documentId_key" ON "DocumentHeader"("documentId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentHeader" ADD CONSTRAINT "DocumentHeader_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentImages" ADD CONSTRAINT "DocumentImages_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentPermissions" ADD CONSTRAINT "DocumentPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentPermissions" ADD CONSTRAINT "DocumentPermissions_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;