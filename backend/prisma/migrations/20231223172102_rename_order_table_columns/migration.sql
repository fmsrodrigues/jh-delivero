/*
  Warnings:

  - You are about to drop the column `created_at` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `finished_at` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "created_at",
DROP COLUMN "finished_at",
DROP COLUMN "updated_at",
ADD COLUMN     "delivered_at" TIMESTAMP(3),
ADD COLUMN     "ordered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "shipped_at" TIMESTAMP(3);
