/*
  Warnings:

  - The primary key for the `Chapter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Chapter` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Lesson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Lesson` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- Drop foreign key constraints that depend on the primary keys being changed
ALTER TABLE "Lesson" DROP CONSTRAINT IF EXISTS "Lesson_chapterId_fkey";
ALTER TABLE "Chapter" DROP CONSTRAINT IF EXISTS "Chapter_courseId_fkey";

-- AlterTable: Course (must be done first since Chapter depends on it)
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");

-- AlterTable: Chapter (depends on Course, but foreign key is already dropped)
-- Note: Since Course.id will get new UUIDs, existing courseId values won't match
-- If you have existing data, you'll need to update courseId values manually after migration
-- For empty tables, this is fine
ALTER TABLE "Chapter" DROP COLUMN "courseId",
ADD COLUMN "courseId" UUID NOT NULL;

-- Then change the primary key
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id");

-- AlterTable: Lesson (depends on Chapter, but foreign key is already dropped)
-- Note: Since Chapter.id will get new UUIDs, existing chapterId values won't match
-- If you have existing data, you'll need to update chapterId values manually after migration
-- For empty tables, this is fine
ALTER TABLE "Lesson" DROP COLUMN "chapterId",
ADD COLUMN "chapterId" UUID NOT NULL;

-- Then change the primary key
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id");

-- Recreate foreign key constraints with UUID types
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
