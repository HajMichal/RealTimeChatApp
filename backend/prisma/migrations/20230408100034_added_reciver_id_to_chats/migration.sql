/*
  Warnings:

  - Added the required column `reciverId` to the `Chats` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "reciverId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Chats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Chats" ("id", "message", "timestamp", "userId") SELECT "id", "message", "timestamp", "userId" FROM "Chats";
DROP TABLE "Chats";
ALTER TABLE "new_Chats" RENAME TO "Chats";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
