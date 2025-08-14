-- CreateEnum
CREATE TYPE "public"."NotificationStatus" AS ENUM ('pending', 'processed', 'failed');

-- CreateEnum
CREATE TYPE "public"."NotificationMessage" AS ENUM ('email', 'sms', 'push');

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "public"."NotificationMessage" NOT NULL,
    "status" "public"."NotificationStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
