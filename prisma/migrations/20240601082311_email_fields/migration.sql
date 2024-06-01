/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `Favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorites_userEmail_key" ON "Favorites"("userEmail");
