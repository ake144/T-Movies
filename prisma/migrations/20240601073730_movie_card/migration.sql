/*
  Warnings:

  - You are about to drop the column `userId` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WatchLater` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `WatchLater` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_userId_fkey";

-- DropForeignKey
ALTER TABLE "WatchLater" DROP CONSTRAINT "WatchLater_userId_fkey";

-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WatchLater" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WatchLater" ADD CONSTRAINT "WatchLater_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
