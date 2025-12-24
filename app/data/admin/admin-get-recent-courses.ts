import { prisma } from "@/lib/db";
import { cache } from "react";
import "server-only";
import { requireAdmin } from "./require-admin";

export const adminGetRecentCourses = cache(async () => {
  await requireAdmin();

  const data = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 2,
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      level: true,
      price: true,
      status: true,
      fileKey: true,
      slug: true,
    },
  });

  return data;
});

// Dynamic type
export type AdminRecentCoursesType = Awaited<
  ReturnType<typeof adminGetRecentCourses>
>;
