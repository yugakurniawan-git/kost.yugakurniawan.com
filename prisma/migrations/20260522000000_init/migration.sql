-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "Verdict" AS ENUM ('RECOMMENDED', 'NEGOTIATE', 'SKIP');

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'DRAFT',
    "clientName" TEXT NOT NULL,
    "clientWa" TEXT NOT NULL,
    "kosName" TEXT NOT NULL,
    "kosAddress" TEXT NOT NULL,
    "kosOwner" TEXT NOT NULL DEFAULT '',
    "kosOwnerContact" TEXT NOT NULL DEFAULT '',
    "price" TEXT NOT NULL,
    "priceMarketLow" TEXT,
    "priceMarketHigh" TEXT,
    "inspectionDate" TIMESTAMP(3) NOT NULL,
    "inspectorName" TEXT NOT NULL DEFAULT 'Bantukos',
    "overallScore" DOUBLE PRECISION,
    "verdict" "Verdict",
    "summary" TEXT,
    "redFlags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "hiddenGems" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "coverPhotoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_items" (
    "id" SERIAL NOT NULL,
    "reportId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "score" INTEGER,
    "notes" TEXT,
    "photoUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "report_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reports_slug_key" ON "reports"("slug");

-- AddForeignKey
ALTER TABLE "report_items" ADD CONSTRAINT "report_items_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;
