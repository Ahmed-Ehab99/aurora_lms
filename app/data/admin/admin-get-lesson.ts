import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { cache } from "react";
import "server-only";
import { requireAdmin } from "./require-admin";

export const adminGetLesson = cache(async (id: string) => {
  await requireAdmin();

  const data = await prisma.lesson.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      videoKey: true,
      thumbnailKey: true,
      position: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
});

// Dynamic type
export type AdminLessonSingularType = Awaited<
  ReturnType<typeof adminGetLesson>
>;
